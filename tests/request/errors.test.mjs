import { OpenWeatherMapError } from "../../src/errors.mjs";
import { requestFailure } from "../../src/request/errors.mjs";

const url = "https://example.test/weather";

test("requestFailure returns null when errors are disabled", () => {
  expect(requestFailure(new Error("failure"), false, url)).toBeNull();
});

test("requestFailure preserves provider errors", () => {
  const error = new OpenWeatherMapError("denied", { status: 401 });
  expect(() => requestFailure(error, true, url)).toThrow("denied");
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
    url,
  });
  expect(wrapped.cause).toMatchObject({ message: "offline" });
});

test("requestFailure uses a fallback for errors without messages", () => {
  expect(() => requestFailure({}, true, url)).toThrow("OpenWeatherMap request failed");
});

test("requestFailure accepts no URL", () => {
  let missing;
  try {
    requestFailure(new OpenWeatherMapError("failure"), true);
  } catch (error) {
    missing = error;
  }
  expect(missing.url).toBeUndefined();

  let missingTransportUrl;
  try {
    requestFailure(new Error("failure"), true);
  } catch (error) {
    missingTransportUrl = error;
  }
  expect(missingTransportUrl.url).toBeUndefined();
});

test("requestFailure handles error values with throwing message getters", () => {
  const error = Object.defineProperty({}, "message", {
    get() {
      throw new Error("unsafe message");
    },
  });
  let wrapped;
  try {
    requestFailure(error, true, url);
  } catch (failure) {
    wrapped = failure;
  }
  expect(wrapped).toMatchObject({
    message: "OpenWeatherMap request failed",
    cause: { message: "OpenWeatherMap request failed" },
  });
});
