import { requestOptions } from "../src/config.mjs";

test("requestOptions requires an API key and reads the environment", () => {
  expect(() => requestOptions({})).toThrow("apiKey is required");
  expect(() => requestOptions(null)).toThrow("apiKey is required");
  const oldKey = process.env.OWM_API_KEY;
  process.env.OWM_API_KEY = "environment-key";
  expect(requestOptions({}).apiKey).toBe("environment-key");
  if (oldKey === undefined) delete process.env.OWM_API_KEY;
  else process.env.OWM_API_KEY = oldKey;
});

test("requestOptions applies defaults and maps unit names", () => {
  const defaults = requestOptions({ apiKey: "test" });
  expect(defaults).toMatchObject({
    apiKey: "test",
    owmUnits: "metric",
    fetchImpl: globalThis.fetch,
    timeout: 10_000,
    retries: 0,
    throwOnError: false,
  });
  expect(defaults.now()).toEqual(expect.any(Number));
  for (const [units, owmUnits] of [
    ["C", "metric"],
    ["F", "imperial"],
    ["K", "standard"],
    ["metric", "metric"],
    ["imperial", "imperial"],
    ["standard", "standard"],
  ]) {
    expect(requestOptions({ apiKey: "test", units }).owmUnits).toBe(owmUnits);
  }
});

test("requestOptions rejects unsupported units", () => {
  expect(() => requestOptions({ apiKey: "test", units: "invalid" })).toThrow("units");
});

test("requestOptions accepts zero timeout and retry values", () => {
  expect(requestOptions({ apiKey: "test", timeout: 0, retries: 0 })).toMatchObject({
    timeout: 0,
    retries: 0,
  });
});

test("requestOptions rejects invalid timeout values", () => {
  for (const timeout of [Number.NaN, Number.POSITIVE_INFINITY, -1, "100"]) {
    expect(() => requestOptions({ apiKey: "test", timeout })).toThrow("timeout");
  }
});

test("requestOptions rejects invalid retry values", () => {
  for (const retries of [Number.NaN, -1, 1.5, "1"]) {
    expect(() => requestOptions({ apiKey: "test", retries })).toThrow("retries");
  }
});
