import { OpenWeatherMapError } from "./errors.mjs";
import { requestFailure, shouldRetry } from "./request-errors.mjs";
import { requestUrl } from "./request-url.mjs";

export async function request(path, lat, lon, config) {
  const url = requestUrl(path, lat, lon, config);
  let lastError;
  for (let attempt = 0; attempt <= config.retries; attempt += 1) {
    const controller = new AbortController();
    let timer;
    const timeout = new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        controller.abort();
        reject(new Error("OpenWeatherMap request timed out"));
      }, config.timeout);
    });
    try {
      const response = await Promise.race([
        config.fetchImpl(url, { signal: controller.signal }),
        timeout,
      ]);
      if (!response.ok)
        throw new OpenWeatherMapError(
          `OpenWeatherMap API error: ${response.status} ${response.statusText}`,
          { status: response.status, statusText: response.statusText, url },
        );
      return await response.json();
    } catch (error) {
      lastError = error;
      if (!shouldRetry(error)) break;
    } finally {
      clearTimeout(timer);
    }
  }
  return requestFailure(lastError, config.throwOnError, url);
}
