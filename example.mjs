// Example for ESM (module JS) usage
import 'dotenv/config';
import { getCurrent, get24hForecast, getSun } from './index.mjs';

const lat = 40.7128;
const lon = -74.0060;

(async () => {
  const current = await getCurrent(lat, lon, { units: 'F' });
  console.log('Current:', current);

  const forecast = await get24hForecast(lat, lon, { units: 'F' });
  console.log('24h Forecast:', forecast);

  const sun = await getSun(lat, lon, { units: 'F' });
  console.log('Sunrise/Sunset:', sun);
})();
