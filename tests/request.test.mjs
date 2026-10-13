import { request } from "../src/request.mjs";
import { requestOptions } from "../src/config.mjs";

function config(fetchImpl, options = {}) {
  return requestOptions({ apiKey: "test", fetchImpl, ...options });
}

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

test("request returns null when JSON parsing fails", async () => {
  const fetchImpl = async () => ({
    ok: true,
    json: async () => {
      throw new Error("bad json");
    },
  });
  await expect(request("weather", 1, 2, config(fetchImpl))).resolves.toBeNull();
});

test("request aborts timed out requests", async () => {
  const fetchImpl = async (_url, { signal }) =>
    new Promise((resolve, reject) => {
      signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
    });
  await expect(request("weather", 1, 2, config(fetchImpl, { timeout: 10 }))).resolves.toBeNull();
});
