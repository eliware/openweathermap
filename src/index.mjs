import { requestOptions } from "./config.mjs";
import { coordinates } from "./coordinates.mjs";
import { request } from "./request.mjs";
export { OpenWeatherMapError } from "./errors.mjs";

export async function getCurrent(lat, lon, options) {
  coordinates(lat, lon);
  const config = requestOptions(options);
  return request("weather", lat, lon, config);
}

export async function get24hForecast(lat, lon, options) {
  coordinates(lat, lon);
  const config = requestOptions(options);
  const data = await request("forecast", lat, lon, config);
  if (!data || !Array.isArray(data.list)) return [];
  const now = config.now();
  return data.list.filter((item) => item.dt > now && item.dt <= now + 24 * 3600);
}

export async function getSun(lat, lon, options) {
  const current = await getCurrent(lat, lon, options);
  if (!current?.sys) return null;
  const offset = current.timezone || 0;
  const { sunrise, sunset } = current.sys;
  if (!Number.isFinite(sunrise) || !Number.isFinite(sunset)) return null;
  return {
    sunriseUtc: sunrise,
    sunsetUtc: sunset,
    sunriseLocal: sunrise + offset,
    sunsetLocal: sunset + offset,
    offset,
  };
}
