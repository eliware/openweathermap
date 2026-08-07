import { getCurrent, get24hForecast, getSun } from '../index.mjs';
import { jest, test, expect } from '@jest/globals';

const lat = 40.7128;
const lon = -74.0060;
const apiKey = 'test';
const fakeFetch = async (url) => {
  if (url.includes('/weather?')) {
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
  if (url.includes('/forecast?')) {
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

test('validates API keys and uses environment configuration', async () => {
  await expect(getCurrent(lat, lon, { fetchImpl: fakeFetch })).rejects.toThrow('apiKey is required');
  await expect(getCurrent(lat, lon, null)).rejects.toThrow('apiKey is required');
  await expect(get24hForecast(lat, lon, { fetchImpl: fakeFetch })).rejects.toThrow('apiKey is required');
  await expect(get24hForecast(lat, lon, null)).rejects.toThrow('apiKey is required');
  process.env.OWM_API_KEY = apiKey;
  await expect(getCurrent(lat, lon, { fetchImpl: fakeFetch, units: 'F' })).resolves.toHaveProperty('sys');
  delete process.env.OWM_API_KEY;
});

test('returns null or empty results for API and malformed responses', async () => {
  const failing = async () => ({ ok: false, status: 500, statusText: 'Server Error', json: async () => ({}) });
  await expect(getCurrent(lat, lon, { apiKey, fetchImpl: failing })).resolves.toBeNull();
  await expect(getCurrent(lat, lon, { apiKey, fetchImpl: async () => ({ ok: true, json: async () => { throw new Error('bad json'); } }) })).resolves.toBeNull();
  await expect(get24hForecast(lat, lon, { apiKey, fetchImpl: failing })).resolves.toEqual([]);
  const malformed = async () => ({ ok: true, json: async () => ({}) });
  await expect(get24hForecast(lat, lon, { apiKey, fetchImpl: malformed })).resolves.toEqual([]);
  await expect(getSun(lat, lon, { apiKey, fetchImpl: malformed })).resolves.toBeNull();
});

test('filters forecast to the next 24 hours and supports default units', async () => {
  const data = await get24hForecast(lat, lon, { apiKey, fetchImpl: fakeFetch, units: 'F' });
  expect(data).toHaveLength(2);
});

test('uses zero timezone offset when omitted', async () => { const fetchImpl = async () => ({ ok: true, json: async () => ({ sys: { sunrise: 1, sunset: 2 } }) }); const data = await getSun(lat, lon, { apiKey, fetchImpl }); expect(data.offset).toBe(0); expect(data.sunriseLocal).toBe(1); });

test('validates coordinates and units', async () => {
  await expect(getCurrent(91, 0, { apiKey })).rejects.toThrow('lat');
  await expect(getCurrent(0, 181, { apiKey })).rejects.toThrow('lon');
  await expect(getCurrent(0, 0, { apiKey, units: 'invalid' })).rejects.toThrow('units');
  await expect(get24hForecast(Number.NaN, 0, { apiKey })).rejects.toThrow('lat');
});

test('throws structured errors when requested and supports retries', async () => {
  let attempts = 0;
  const fetchImpl = async () => {
    attempts += 1;
    if (attempts < 2) throw new Error('temporary failure');
    return { ok: false, status: 401, statusText: 'Unauthorized', json: async () => ({}) };
  };
  await expect(getCurrent(0, 0, { apiKey, fetchImpl, retries: 1, throwOnError: true })).rejects.toMatchObject({ name: 'OpenWeatherMapError', status: 401 });
  expect(attempts).toBe(2);
});

test('exposes OpenWeatherMapError metadata', async () => {
  const { OpenWeatherMapError } = await import('../index.mjs');
  const error = new OpenWeatherMapError('failure');
  const detailed = new OpenWeatherMapError('failure', { status: 500, statusText: 'Oops', url: 'https://example.test' });
  expect(error).toMatchObject({ name: 'OpenWeatherMapError' });
  expect(detailed).toMatchObject({ name: 'OpenWeatherMapError', status: 500, statusText: 'Oops', url: 'https://example.test' });
});

test('wraps transport errors when throwOnError is enabled', async () => { await expect(getCurrent(0, 0, { apiKey, fetchImpl: async () => { throw new Error('offline'); }, throwOnError: true })).rejects.toMatchObject({ name: 'OpenWeatherMapError', message: 'offline' }); });

test('uses fallback message for unknown transport errors', async () => {
  await expect(getCurrent(0, 0, { apiKey, fetchImpl: async () => { throw {}; }, throwOnError: true })).rejects.toThrow('OpenWeatherMap request failed');
});

test('aborts timed out requests and returns compatibility fallback', async () => {
  jest.useFakeTimers();
  const fetchImpl = async (_url, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error('aborted')));
  });
  const result = getCurrent(0, 0, { apiKey, fetchImpl, timeout: 100 });
  await jest.advanceTimersByTimeAsync(100);
  await expect(result).resolves.toBeNull();
  jest.useRealTimers();
});
