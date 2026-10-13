import { OpenWeatherMapError } from "./errors.mjs";
import { requestFailure } from "./request-errors.mjs";
import { requestUrl } from "./request-url.mjs";

export async function request(path, lat, lon, config) {
  const url = requestUrl(path, lat, lon, config);
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
  return requestFailure(lastError, config.throwOnError, url);
}
