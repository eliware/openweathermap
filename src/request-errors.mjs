import { OpenWeatherMapError } from "./errors.mjs";

export function requestFailure(error, throwOnError, url) {
  if (!throwOnError) return null;
  if (error instanceof OpenWeatherMapError) throw error;
  throw new OpenWeatherMapError(error?.message ?? "OpenWeatherMap request failed", {
    cause: error,
    url,
  });
}

export function shouldRetry(error) {
  if (!(error instanceof OpenWeatherMapError)) return true;
  return error.status === 408 || error.status === 429 || error.status >= 500;
}
