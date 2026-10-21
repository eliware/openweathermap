import { OpenWeatherMapError } from "../errors.mjs";

export function shouldRetry(error) {
  if (!(error instanceof OpenWeatherMapError)) return true;
  return error.status === 408 || error.status === 429 || error.status >= 500;
}
