import { redactSecretText, safeCause, safeUrl } from "../../src/request/redaction.mjs";

test("redactSecretText removes API keys and supports missing keys", () => {
  expect(redactSecretText("Denied private-key", "private-key")).toBe("Denied [REDACTED]");
  expect(redactSecretText("Denied", undefined)).toBe("Denied");
});

test("safeUrl removes API keys from valid and malformed URLs", () => {
  expect(safeUrl("https://example.test/weather?appid=secret&lat=1", "secret")).toBe(
    "https://example.test/weather?lat=1",
  );
  expect(safeUrl("not a url?appid=secret", "secret")).toBe("not a url?appid=[REDACTED]");
  expect(safeUrl(undefined, "secret")).toBeUndefined();
});

test("safeCause removes secrets and handles missing or unsafe causes", () => {
  expect(safeCause(new Error("Denied secret"), "secret")).toMatchObject({
    message: "Denied [REDACTED]",
  });
  expect(safeCause({}, "secret")).toMatchObject({ message: "[object Object]" });
  expect(safeCause(undefined, "secret")).toBeUndefined();

  const unsafeCause = Object.defineProperty({}, "message", {
    get() {
      throw new Error("unsafe message");
    },
  });
  expect(safeCause(unsafeCause, "secret")).toMatchObject({
    message: "OpenWeatherMap request failed",
  });
});
