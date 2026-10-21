import { openWeatherUnits } from "./config/units.mjs";

export function requestOptions(options) {
  const {
    apiKey = process.env.OWM_API_KEY,
    units = "C",
    fetchImpl = globalThis.fetch,
    timeout = 10_000,
    retries = 0,
    now = () => Date.now() / 1000,
    throwOnError = false,
    logger,
  } = options ?? {};
  if (!apiKey) throw new Error("apiKey is required");
  const owmUnits = openWeatherUnits(units);
  if (typeof fetchImpl !== "function") throw new TypeError("fetchImpl must be a function");
  if (!Number.isFinite(timeout) || timeout < 0)
    throw new RangeError("timeout must be a finite non-negative number");
  if (!Number.isInteger(retries) || retries < 0)
    throw new RangeError("retries must be a non-negative integer");
  return { apiKey, owmUnits, fetchImpl, timeout, retries, now, throwOnError, logger };
}
