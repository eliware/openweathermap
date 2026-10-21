const unitsMap = {
  C: "metric",
  F: "imperial",
  K: "standard",
  metric: "metric",
  imperial: "imperial",
  standard: "standard",
};

export function openWeatherUnits(units) {
  const owmUnits = unitsMap[units];
  if (!owmUnits) throw new RangeError("units must be C, F, K, metric, imperial, or standard");
  return owmUnits;
}
