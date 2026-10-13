import { OpenWeatherMapError } from "../src/errors.mjs";
import { requestFailure } from "../src/request-errors.mjs";

const url = "https://example.test/weather";

test("requestFailure returns null when errors are disabled", () => {
  expect(requestFailure(new Error("failure"), false, url)).toBeNull();
});

test("requestFailure preserves provider errors", () => {
  const error = new OpenWeatherMapError("denied", { status: 401 });
  expect(() => requestFailure(error, true, url)).toThrow(error);
});

test("requestFailure wraps transport errors", () => {
  const cause = new Error("offline");
  let wrapped;
  try {
    requestFailure(cause, true, url);
  } catch (error) {
    wrapped = error;
  }
  expect(wrapped).toMatchObject({
    name: "OpenWeatherMapError",
    message: "offline",
    cause,
    url,
  });
});

test("requestFailure uses a fallback for errors without messages", () => {
  expect(() => requestFailure({}, true, url)).toThrow("OpenWeatherMap request failed");
});
