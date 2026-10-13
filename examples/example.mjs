// Set OWM_API_KEY before you run this example.
import { getCurrent, get24hForecast, getSun } from "@eliware/openweathermap";

const options = { units: "F", timeout: 10_000, retries: 2, throwOnError: true };
const lat = 40.7128;
const lon = -74.006;

console.log(await getCurrent(lat, lon, options));
console.log(await get24hForecast(lat, lon, options));
console.log(await getSun(lat, lon, options));
