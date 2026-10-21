import { OpenWeatherMapError } from "../../src/errors.mjs";
import { shouldRetry } from "../../src/request/retry.mjs";

test("shouldRetry retries transport errors and temporary HTTP errors", () => {
  expect(shouldRetry(new Error("offline"))).toBe(true);
  expect(shouldRetry(new OpenWeatherMapError("timeout", { status: 408 }))).toBe(true);
  expect(shouldRetry(new OpenWeatherMapError("limited", { status: 429 }))).toBe(true);
  expect(shouldRetry(new OpenWeatherMapError("server", { status: 503 }))).toBe(true);
});

test("shouldRetry skips permanent HTTP errors", () => {
  expect(shouldRetry(new OpenWeatherMapError("denied", { status: 401 }))).toBe(false);
});
