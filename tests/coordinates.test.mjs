import { coordinates } from "../src/coordinates.mjs";

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
