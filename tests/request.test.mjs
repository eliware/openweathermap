import { request } from "../src/request.mjs";
import { captureError, config, expectNoApiKey } from "../test-fixtures/request-helpers.mjs";

test("request sends coordinates and returns JSON", async () => {
  let sentUrl;
  const fetchImpl = async (url) => {
    sentUrl = url;
    return { ok: true, json: async () => ({ value: 1 }) };
  };
  await expect(request("weather", 1, 2, config(fetchImpl))).resolves.toEqual({ value: 1 });
  expect(sentUrl).toContain("lat=1&lon=2&appid=test&units=metric");
});

test("request returns null after an HTTP error when errors are disabled", async () => {
  const fetchImpl = async () => ({
    ok: false,
    status: 500,
    statusText: "Server Error",
    json: async () => ({}),
  });
  await expect(request("weather", 1, 2, config(fetchImpl))).resolves.toBeNull();
});

test("request retries and throws structured API errors", async () => {
  let attempts = 0;
  const fetchImpl = async () => {
    attempts += 1;
    if (attempts === 1) throw new Error("temporary failure");
    return { ok: false, status: 401, statusText: "Unauthorized", json: async () => ({}) };
  };
  await expect(
    request("weather", 1, 2, config(fetchImpl, { retries: 1, throwOnError: true })),
  ).rejects.toMatchObject({ name: "OpenWeatherMapError", status: 401 });
  expect(attempts).toBe(2);
});

test("request does not retry permanent HTTP errors", async () => {
  let attempts = 0;
  const fetchImpl = async () => {
    attempts += 1;
    return { ok: false, status: 401, statusText: "Unauthorized", json: async () => ({}) };
  };
  await expect(
    request("weather", 1, 2, config(fetchImpl, { retries: 3, throwOnError: true })),
  ).rejects.toMatchObject({ name: "OpenWeatherMapError", status: 401 });
  expect(attempts).toBe(1);
});

test("HTTP errors omit the API key from public details", async () => {
  const apiKey = "private-key-123";
  const fetchImpl = async () => ({
    ok: false,
    status: 401,
    statusText: `Denied ${apiKey}`,
    json: async () => ({}),
  });
  const error = await captureError(
    request("weather", 1, 2, config(fetchImpl, { apiKey, throwOnError: true })),
  );
  expect(error).toMatchObject({ name: "OpenWeatherMapError", status: 401 });
  expect(error.url).toBe(
    "https://api.openweathermap.org/data/2.5/weather?lat=1&lon=2&units=metric",
  );
  expect(error.statusText).toBe("Denied [REDACTED]");
  expectNoApiKey(error, apiKey);
});

test("request wraps transport errors and uses a fallback message", async () => {
  const offline = async () => {
    throw new Error("offline");
  };
  await expect(
    request("weather", 1, 2, config(offline, { throwOnError: true })),
  ).rejects.toMatchObject({ name: "OpenWeatherMapError", message: "offline" });
  const unknown = async () => {
    throw {};
  };
  await expect(request("weather", 1, 2, config(unknown, { throwOnError: true }))).rejects.toThrow(
    "OpenWeatherMap request failed",
  );
});

test("transport errors redact API keys from messages and causes", async () => {
  const apiKey = "private-key-456";
  const fetchImpl = async (url) => {
    throw new Error(`Failed at ${url} with ${apiKey}`);
  };
  const error = await captureError(
    request("weather", 1, 2, config(fetchImpl, { apiKey, throwOnError: true })),
  );
  expect(error.message).toContain("[REDACTED]");
  expect(error.cause.message).toContain("[REDACTED]");
  expectNoApiKey(error, apiKey);
});

test("request returns null when JSON parsing fails", async () => {
  let attempts = 0;
  const fetchImpl = async () => {
    attempts += 1;
    return {
      ok: true,
      json: async () => {
        throw new Error("bad json");
      },
    };
  };
  await expect(request("weather", 1, 2, config(fetchImpl, { retries: 2 }))).resolves.toBeNull();
  expect(attempts).toBe(1);
});

test("request aborts timed out requests", async () => {
  const fetchImpl = async (_url, { signal }) =>
    new Promise((resolve, reject) => {
      signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
    });
  await expect(request("weather", 1, 2, config(fetchImpl, { timeout: 10 }))).resolves.toBeNull();
});

test("request ends when fetch ignores the abort signal", async () => {
  const fetchImpl = async () => new Promise(() => {});
  await expect(request("weather", 1, 2, config(fetchImpl, { timeout: 10 }))).resolves.toBeNull();
});

test("request timeout covers JSON parsing", async () => {
  const fetchImpl = async () => ({ ok: true, json: async () => new Promise(() => {}) });
  await expect(request("weather", 1, 2, config(fetchImpl, { timeout: 10 }))).resolves.toBeNull();
});
