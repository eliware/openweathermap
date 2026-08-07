export class OpenWeatherMapError extends Error {
  constructor(message, { status, statusText, cause, url } = {}) {
    super(message, { cause });
    this.name = 'OpenWeatherMapError';
    this.status = status;
    this.statusText = statusText;
    this.url = url;
  }
}

const unitsMap = { C: 'metric', F: 'imperial', K: 'standard', metric: 'metric', imperial: 'imperial', standard: 'standard' };
function coordinates(lat, lon) {
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) throw new RangeError('lat must be between -90 and 90');
  if (!Number.isFinite(lon) || lon < -180 || lon > 180) throw new RangeError('lon must be between -180 and 180');
}
function requestOptions(options) {
  const { apiKey = process.env.OWM_API_KEY, units = 'C', fetchImpl = globalThis.fetch, timeout = 10_000, retries = 0, now = () => Date.now() / 1000, throwOnError = false } = options ?? {};
  if (!apiKey) throw new Error('apiKey is required');
  const owmUnits = unitsMap[units];
  if (!owmUnits) throw new RangeError('units must be C, F, K, metric, imperial, or standard');
  return { apiKey, owmUnits, fetchImpl, timeout, retries, now, throwOnError };
}
async function request(path, lat, lon, config) {
  const params = new URLSearchParams({ lat: String(lat), lon: String(lon), appid: config.apiKey, units: config.owmUnits });
  const url = `https://api.openweathermap.org/data/2.5/${path}?${params}`;
  let lastError;
  for (let attempt = 0; attempt <= config.retries; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.timeout);
    try {
      const response = await config.fetchImpl(url, { signal: controller.signal });
      if (!response.ok) throw new OpenWeatherMapError(`OpenWeatherMap API error: ${response.status} ${response.statusText}`, { status: response.status, statusText: response.statusText, url });
      return await response.json();
    } catch (error) { lastError = error; } finally { clearTimeout(timer); }
  }
  if (config.throwOnError) throw (lastError instanceof OpenWeatherMapError ? lastError : new OpenWeatherMapError(lastError?.message ?? 'OpenWeatherMap request failed', { cause: lastError, url }));
  return null;
}

export async function getCurrent(lat, lon, options) {
  coordinates(lat, lon); const config = requestOptions(options); return request('weather', lat, lon, config);
}
export async function get24hForecast(lat, lon, options) {
  coordinates(lat, lon); const config = requestOptions(options); const data = await request('forecast', lat, lon, config);
  if (!data || !Array.isArray(data.list)) return [];
  const now = config.now(); return data.list.filter(item => item.dt > now && item.dt <= now + 24 * 3600);
}
export async function getSun(lat, lon, options) {
  const current = await getCurrent(lat, lon, options); if (!current?.sys) return null;
  const offset = current.timezone || 0; const { sunrise, sunset } = current.sys;
  return { sunriseUtc: sunrise, sunsetUtc: sunset, sunriseLocal: sunrise + offset, sunsetLocal: sunset + offset, offset };
}
