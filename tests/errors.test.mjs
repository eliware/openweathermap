import { OpenWeatherMapError } from "../src/errors.mjs";

test("OpenWeatherMapError stores error details", () => {
  const cause = new Error("cause");
  const error = new OpenWeatherMapError("failure", {
    status: 500,
    statusText: "Oops",
    cause,
    url: "https://example.test",
  });
  expect(error).toBeInstanceOf(Error);
  expect(error).toMatchObject({
    name: "OpenWeatherMapError",
    message: "failure",
    status: 500,
    statusText: "Oops",
    cause,
    url: "https://example.test",
  });
});

test("OpenWeatherMapError accepts no optional details", () => {
  expect(new OpenWeatherMapError("failure")).toMatchObject({
    name: "OpenWeatherMapError",
    message: "failure",
  });
});
