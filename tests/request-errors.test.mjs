import { OpenWeatherMapError } from "../src/errors.mjs";
import { requestFailure, shouldRetry } from "../src/request-errors.mjs";

const url = "https://example.test/weather";

test("requestFailure returns null when errors are disabled", () => {
  expect(requestFailure(new Error("failure"), false, url)).toBeNull();
});

test("requestFailure preserves provider errors", () => {
  const error = new OpenWeatherMapError("denied", { status: 401 });
  expect(() => requestFailure(error, true, url)).toThrow(error);
});

test("requestFailure wraps transport errors", () => {
  const cause = new Error("offline");
  let wrapped;
  try {
    requestFailure(cause, true, url);
  } catch (error) {
    wrapped = error;
  }
  expect(wrapped).toMatchObject({
    name: "OpenWeatherMapError",
    message: "offline",
    cause,
    url,
  });
});

test("requestFailure uses a fallback for errors without messages", () => {
  expect(() => requestFailure({}, true, url)).toThrow("OpenWeatherMap request failed");
});

test("shouldRetry retries transport errors and temporary HTTP errors", () => {
  expect(shouldRetry(new Error("offline"))).toBe(true);
  expect(shouldRetry(new OpenWeatherMapError("timeout", { status: 408 }))).toBe(true);
  expect(shouldRetry(new OpenWeatherMapError("limited", { status: 429 }))).toBe(true);
  expect(shouldRetry(new OpenWeatherMapError("server", { status: 503 }))).toBe(true);
});

test("shouldRetry skips permanent HTTP errors", () => {
  expect(shouldRetry(new OpenWeatherMapError("denied", { status: 401 }))).toBe(false);
});
