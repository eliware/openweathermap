// Example ESM usage. Set OWM_API_KEY before running:
// OWM_API_KEY=... node example.mjs
import { getCurrent, get24hForecast, getSun } from './index.mjs';

const lat = 40.7128;
const lon = -74.0060;
const options = {
  units: 'F',
  timeout: 10_000,
  retries: 2,
  throwOnError: true,
};

try {
  const current = await getCurrent(lat, lon, options);
  console.log('Current:', current);

  const forecast = await get24hForecast(lat, lon, options);
  console.log('24h Forecast:', forecast);

  const sun = await getSun(lat, lon, options);
  console.log('Sunrise/Sunset:', sun);
} catch (error) {
  console.error('OpenWeatherMap request failed:', error);
  process.exitCode = 1;
}
