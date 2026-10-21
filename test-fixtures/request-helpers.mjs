import { requestOptions } from "../src/config.mjs";

export function config(fetchImpl, options = {}) {
  return requestOptions({ apiKey: "test", fetchImpl, ...options });
}

export async function captureError(promise) {
  try {
    await promise;
  } catch (error) {
    return error;
  }
  throw new Error("Expected request to fail");
}

export function expectNoApiKey(error, apiKey) {
  const text = [
    error.name,
    error.message,
    error.statusText,
    error.url,
    error.cause?.message,
    error.stack,
  ]
    .filter(Boolean)
    .join(" ");
  expect(text).not.toContain(apiKey);
  expect(error.url).not.toMatch(/[?&]appid=/i);
}

export function createRecordLogger() {
  const records = [];
  const logger = Object.fromEntries(
    ["error", "warn", "info", "http", "verbose", "debug", "silly"].map((level) => [
      level,
      (message, metadata) => records.push({ level, message, metadata }),
    ]),
  );
  return { logger, records };
}
