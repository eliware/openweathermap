import { getCurrent, get24hForecast, getSun } from './index.mjs';
import { jest, test, expect } from '@jest/globals';

const lat = 40.7128;
const lon = -74.0060;
const apiKey = 'test';
const fakeFetch = async (url) => {
  if (url.includes('weather')) {
    return {
      ok: true,
      json: async () => ({
        coord: { lon: -74.006, lat: 40.7127 },
        weather: [{ id: 701, main: 'Mist', description: 'mist', icon: '50d' }],
        base: 'stations',
        main: { temp: 18.46, feels_like: 18.84, temp_min: 17.28, temp_max: 19.41, pressure: 1017, humidity: 95, sea_level: 1017, grnd_level: 1016 },
        visibility: 2414,
        wind: { speed: 3.58, deg: 118, gust: 4.92 },
        clouds: { all: 100 },
        dt: 1750177068,
        sys: { type: 2, id: 2008776, country: 'US', sunrise: 1750152267, sunset: 1750206576 },
        timezone: -14400,
        id: 5128581,
        name: 'New York',
        cod: 200
      })
    };
  }
  if (url.includes('forecast')) {
    return {
      ok: true,
      json: async () => ({
        list: [
          { dt: Date.now() / 1000 + 1000, main: { temp: 18 }, weather: [{ main: 'Clouds' }] },
          { dt: Date.now() / 1000 + 4000, main: { temp: 19 }, weather: [{ main: 'Rain' }] }
        ]
      })
    };
  }
  return { ok: false, status: 404, statusText: 'Not Found', json: async () => ({}) };
};

test('getCurrent returns weather object with sys', async () => {
  const data = await getCurrent(lat, lon, { apiKey, fetchImpl: fakeFetch });
  expect(data).toBeTruthy();
  expect(data).toHaveProperty('sys');
});

test('get24hForecast returns array', async () => {
  const data = await get24hForecast(lat, lon, { apiKey, fetchImpl: fakeFetch });
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThanOrEqual(0);
});

test('getSun returns correct sunrise/sunset fields', async () => {
  const data = await getSun(lat, lon, { apiKey, fetchImpl: fakeFetch });
  expect(data).toHaveProperty('sunriseUtc');
  expect(data).toHaveProperty('sunsetUtc');
  expect(data).toHaveProperty('sunriseLocal');
  expect(data).toHaveProperty('sunsetLocal');
  expect(data).toHaveProperty('offset');
  // Check values are correct
  expect(data.sunriseUtc).toBe(1750152267);
  expect(data.sunsetUtc).toBe(1750206576);
  expect(data.sunriseLocal).toBe(1750152267 - 14400);
  expect(data.sunsetLocal).toBe(1750206576 - 14400);
  expect(data.offset).toBe(-14400);
});
