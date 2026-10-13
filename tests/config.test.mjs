import { coordinates, requestOptions } from "../src/config.mjs";

test("coordinates accepts range boundaries", () => {
  expect(() => coordinates(-90, 180)).not.toThrow();
  expect(() => coordinates(90, -180)).not.toThrow();
});

test("coordinates rejects invalid latitude and longitude", () => {
  expect(() => coordinates(Number.NaN, 0)).toThrow("lat");
  expect(() => coordinates(91, 0)).toThrow("lat");
  expect(() => coordinates(0, Number.POSITIVE_INFINITY)).toThrow("lon");
  expect(() => coordinates(0, 181)).toThrow("lon");
});

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
