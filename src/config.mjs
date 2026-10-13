const unitsMap = {
  C: "metric",
  F: "imperial",
  K: "standard",
  metric: "metric",
  imperial: "imperial",
  standard: "standard",
};

export function coordinates(lat, lon) {
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) throw new RangeError("lat must be in range");
  if (!Number.isFinite(lon) || lon < -180 || lon > 180)
    throw new RangeError("lon must be in range");
}

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
  return { apiKey, owmUnits, fetchImpl, timeout, retries, now, throwOnError };
}
