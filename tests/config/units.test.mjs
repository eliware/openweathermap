import { openWeatherUnits } from "../../src/config/units.mjs";

test("openWeatherUnits maps supported names", () => {
  for (const [units, expected] of [
    ["C", "metric"],
    ["F", "imperial"],
    ["K", "standard"],
    ["metric", "metric"],
    ["imperial", "imperial"],
    ["standard", "standard"],
  ]) {
    expect(openWeatherUnits(units)).toBe(expected);
  }
});

test("openWeatherUnits rejects unsupported names", () => {
  expect(() => openWeatherUnits("invalid")).toThrow("units");
});
