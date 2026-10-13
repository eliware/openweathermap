const unitsMap = {
  C: "metric",
  F: "imperial",
  K: "standard",
  metric: "metric",
  imperial: "imperial",
  standard: "standard",
};

export function requestOptions(options) {
  const {
    apiKey = process.env.OWM_API_KEY,
    units = "C",
    fetchImpl = globalThis.fetch,
    timeout = 10_000,
    retries = 0,
    now = () => Date.now() / 1000,
    throwOnError = false,
  } = options ?? {};
  if (!apiKey) throw new Error("apiKey is required");
  const owmUnits = unitsMap[units];
  if (!owmUnits) throw new RangeError("units must be C, F, K, metric, imperial, or standard");
  if (!Number.isFinite(timeout) || timeout < 0)
    throw new RangeError("timeout must be a finite non-negative number");
  if (!Number.isInteger(retries) || retries < 0)
    throw new RangeError("retries must be a non-negative integer");
  return { apiKey, owmUnits, fetchImpl, timeout, retries, now, throwOnError };
}
