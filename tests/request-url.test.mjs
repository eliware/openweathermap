import { requestUrl } from "../src/request-url.mjs";

test("requestUrl encodes query values", () => {
  const url = new URL(
    requestUrl("forecast", 40.5, -73.5, { apiKey: "key &+", owmUnits: "imperial" }),
  );
  expect(url.pathname).toBe("/data/2.5/forecast");
  expect([...url.searchParams.entries()]).toEqual([
    ["lat", "40.5"],
    ["lon", "-73.5"],
    ["appid", "key &+"],
    ["units", "imperial"],
  ]);
});
