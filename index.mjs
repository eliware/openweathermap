import fetch from 'node-fetch';

/**
 * Fetch current weather data from OpenWeatherMap API
 * @param {number} lat
 * @param {number} lon
 * @param {object} [options]
 * @param {string} [options.apiKey=process.env.OWM_API_KEY] - OpenWeatherMap API key
 * @param {string} [options.units='C'] - 'F' for Fahrenheit, 'C' for Celsius, or undefined for default
 * @param {function} [options.fetchImpl=fetch] - fetch implementation
 * @returns {Promise<object|null>} Weather data object
 */
export async function getCurrent(lat, lon, {
  apiKey = process.env.OWM_API_KEY,
  units = 'C',
  fetchImpl = fetch,
} = {}) {
  if (!apiKey) {
    throw new Error('apiKey is required');
  }
  let owmUnits = 'metric';
  if (units === 'F') owmUnits = 'imperial';
  if (units === 'C') owmUnits = 'metric';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${owmUnits}`;
  try {
    const res = await fetchImpl(url);
    if (!res.ok) {
      throw new Error(`OpenWeatherMap API error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    return null;
  }
}

/**
 * Fetch 24-hour forecast from OpenWeatherMap API (3-hour intervals, 8 items)
 * @param {number} lat
 * @param {number} lon
 * @param {object} [options]
 * @param {string} [options.apiKey=process.env.OWM_API_KEY]
 * @param {string} [options.units='C']
 * @param {function} [options.fetchImpl=fetch]
 * @returns {Promise<object[]|null>} Array of forecast objects for next 24h
 */
export async function get24hForecast(lat, lon, {
  apiKey = process.env.OWM_API_KEY,
  units = 'C',
  fetchImpl = fetch,
} = {}) {
  if (!apiKey) {
    throw new Error('apiKey is required');
  }
  let owmUnits = 'metric';
  if (units === 'F') owmUnits = 'imperial';
  if (units === 'C') owmUnits = 'metric';
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${owmUnits}`;
  try {
    const res = await fetchImpl(url);
    if (!res.ok) {
      throw new Error(`OpenWeatherMap API error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    if (!data || !Array.isArray(data.list)) return [];
    const now = Date.now() / 1000;
    return data.list.filter(item => item.dt > now && item.dt <= now + 24 * 3600);
  } catch (err) {
    return [];
  }
}

/**
 * Fetch sunrise and sunset times for the given coordinates, returns both UTC and local times
 * @param {number} lat
 * @param {number} lon
 * @param {object} [options]
 * @param {string} [options.apiKey=process.env.OWM_API_KEY]
 * @param {string} [options.units='C']
 * @param {function} [options.fetchImpl=fetch]
 * @returns {Promise<{sunriseUtc: number, sunsetUtc: number, sunriseLocal: number, sunsetLocal: number, offset: number}|null>}
 */
export async function getSun(lat, lon, options = {}) {
  const current = await getCurrent(lat, lon, options);
  if (!current || !current.sys) return null;
  const offset = current.timezone || 0;
  const sunriseUtc = current.sys.sunrise;
  const sunsetUtc = current.sys.sunset;
  return {
    sunriseUtc,
    sunsetUtc,
    sunriseLocal: sunriseUtc + offset,
    sunsetLocal: sunsetUtc + offset,
    offset: offset
  };
}
