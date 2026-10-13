import { OpenWeatherMapError } from "./errors.mjs";

export async function request(path, lat, lon, config) {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    appid: config.apiKey,
    units: config.owmUnits,
  });
  const url = `https://api.openweathermap.org/data/2.5/${path}?${params}`;
  let lastError;
  for (let attempt = 0; attempt <= config.retries; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.timeout);
    try {
      const response = await config.fetchImpl(url, { signal: controller.signal });
      if (!response.ok)
        throw new OpenWeatherMapError(
          `OpenWeatherMap API error: ${response.status} ${response.statusText}`,
          { status: response.status, statusText: response.statusText, url },
        );
      return await response.json();
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timer);
    }
  }
  if (config.throwOnError)
    throw lastError instanceof OpenWeatherMapError
      ? lastError
      : new OpenWeatherMapError(lastError?.message ?? "OpenWeatherMap request failed", {
          cause: lastError,
          url,
        });
  return null;
}
