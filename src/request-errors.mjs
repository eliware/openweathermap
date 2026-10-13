import { OpenWeatherMapError } from "./errors.mjs";

export function requestFailure(error, throwOnError, url) {
  if (!throwOnError) return null;
  if (error instanceof OpenWeatherMapError) throw error;
  throw new OpenWeatherMapError(error?.message ?? "OpenWeatherMap request failed", {
    cause: error,
    url,
  });
}
