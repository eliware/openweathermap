import { getCurrent, get24hForecast, getSun } from "../src/index.mjs";

const lat = 40.7128;
const lon = -74.006;
const apiKey = "test";
const fakeFetch = async (url) => {
  if (url.includes("/weather?")) {
    return {
      ok: true,
      json: async () => ({
        coord: { lon: -74.006, lat: 40.7127 },
        weather: [{ id: 701, main: "Mist", description: "mist", icon: "50d" }],
        base: "stations",
        main: {
          temp: 18.46,
          feels_like: 18.84,
          temp_min: 17.28,
          temp_max: 19.41,
          pressure: 1017,
          humidity: 95,
          sea_level: 1017,
          grnd_level: 1016,
        },
        visibility: 2414,
        wind: { speed: 3.58, deg: 118, gust: 4.92 },
        clouds: { all: 100 },
        dt: 1750177068,
        sys: { type: 2, id: 2008776, country: "US", sunrise: 1750152267, sunset: 1750206576 },
        timezone: -14400,
        id: 5128581,
        name: "New York",
        cod: 200,
      }),
    };
  }
  if (url.includes("/forecast?")) {
    return {
      ok: true,
      json: async () => ({
        list: [
          { dt: 1100, main: { temp: 18 }, weather: [{ main: "Clouds" }] },
          { dt: 4000, main: { temp: 19 }, weather: [{ main: "Rain" }] },
          { dt: 90000, main: { temp: 20 }, weather: [{ main: "Sun" }] },
        ],
      }),
    };
  }
  return { ok: false, status: 404, statusText: "Not Found", json: async () => ({}) };
};

test("getCurrent returns the weather object", async () => {
  const data = await getCurrent(lat, lon, { apiKey, fetchImpl: fakeFetch });
  expect(data).toHaveProperty("sys");
});

test("get24hForecast filters to the next 24 hours", async () => {
  const data = await get24hForecast(lat, lon, {
    apiKey,
    fetchImpl: fakeFetch,
    now: () => 1000,
  });
  expect(data.map((item) => item.dt)).toEqual([1100, 4000]);
});

test("getSun returns UTC and local times", async () => {
  const data = await getSun(lat, lon, { apiKey, fetchImpl: fakeFetch });
  expect(data).toEqual({
    sunriseUtc: 1750152267,
    sunsetUtc: 1750206576,
    sunriseLocal: 1750137867,
    sunsetLocal: 1750192176,
    offset: -14400,
  });
});

test("getSun uses zero when the service omits its timezone", async () => {
  const fetchImpl = async () => ({
    ok: true,
    json: async () => ({ sys: { sunrise: 1, sunset: 2 } }),
  });
  const data = await getSun(lat, lon, { apiKey, fetchImpl });
  expect(data.offset).toBe(0);
  expect(data.sunriseLocal).toBe(1);
});

test("public methods return fallback results for incomplete service data", async () => {
  const fetchImpl = async () => ({ ok: true, json: async () => ({}) });
  await expect(get24hForecast(lat, lon, { apiKey, fetchImpl })).resolves.toEqual([]);
  await expect(getSun(lat, lon, { apiKey, fetchImpl })).resolves.toBeNull();
});
