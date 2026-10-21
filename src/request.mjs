import { OpenWeatherMapError } from "./errors.mjs";
import { requestFailure } from "./request/errors.mjs";
import { writeRequestLog } from "./request/log.mjs";
import { shouldRetry } from "./request/retry.mjs";
import { requestUrl } from "./request/url.mjs";

export async function request(path, lat, lon, config) {
  const url = requestUrl(path, lat, lon, config);
  let lastError;
  for (let attempt = 0; attempt <= config.retries; attempt += 1) {
    const context = {
      operation: path,
      attempt: attempt + 1,
      maxAttempts: config.retries + 1,
    };
    writeRequestLog(
      config.logger,
      "debug",
      "OpenWeatherMap request started",
      context,
      config.apiKey,
    );
    const controller = new AbortController();
    let timer;
    try {
      const operation = (async () => {
        const response = await config.fetchImpl(url, { signal: controller.signal });
        writeRequestLog(
          config.logger,
          "http",
          "OpenWeatherMap response received",
          { ...context, status: response.status, statusText: response.statusText },
          config.apiKey,
        );
        if (!response.ok)
          throw new OpenWeatherMapError(
            `OpenWeatherMap API error: ${response.status} ${response.statusText}`,
            { status: response.status, statusText: response.statusText, url },
          );
        try {
          const data = await response.json();
          writeRequestLog(
            config.logger,
            "info",
            "OpenWeatherMap request completed",
            { ...context, status: response.status },
            config.apiKey,
          );
          return data;
        } catch (cause) {
          throw new OpenWeatherMapError("OpenWeatherMap response JSON parsing failed", {
            cause,
            url,
          });
        }
      })();
      operation.catch(() => {});
      const timeout = new Promise((resolve, reject) => {
        timer = setTimeout(() => {
          controller.abort();
          reject(new Error("OpenWeatherMap request timed out"));
        }, config.timeout);
      });
      return await Promise.race([operation, timeout]);
    } catch (error) {
      lastError = error;
      const retry = shouldRetry(error) && attempt < config.retries;
      const errorDetails = {
        ...context,
        errorName: error?.name ?? "Error",
        errorMessage: error?.message ?? "OpenWeatherMap request failed",
        status: error?.status,
      };
      writeRequestLog(
        config.logger,
        retry ? "warn" : "error",
        retry ? "OpenWeatherMap request will retry" : "OpenWeatherMap request failed",
        errorDetails,
        config.apiKey,
      );
      if (!retry) break;
    } finally {
      clearTimeout(timer);
    }
  }
  return requestFailure(lastError, config.throwOnError, url, config.apiKey);
}
