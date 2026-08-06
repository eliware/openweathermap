# [![eliware.org](https://eliware.org/logos/brand.png)](https://discord.gg/M6aTR9eTwN)

## @eliware/openweathermap [![npm version](https://img.shields.io/npm/v/@eliware/openweathermap.svg)](https://www.npmjs.com/package/@eliware/openweathermap)[![license](https://img.shields.io/github/license/eliware/openweathermap.svg)](LICENSE)[![build status](https://github.com/eliware/openweathermap/actions/workflows/nodejs.yml/badge.svg)](https://github.com/eliware/openweathermap/actions)

> A simple, modern, Node.js client for the OpenWeatherMap API. Fetch current weather, 24-hour forecast, and sunrise/sunset times with a clean, promise-based API.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [TypeScript](#typescript)
- [License](#license)

## Features

- Fetch current weather for any coordinates
- Fetch 24-hour forecast (3-hour intervals)
- Fetch sunrise and sunset times (adjusted to local timezone)
- Fully typed (TypeScript definitions included)
- Supports dependency injection for fetch, clock, and API key
- Validates coordinates and units before requests
- Configurable timeouts, retries, and structured errors
- Backward-compatible `null`/`[]` failure results by default

## Installation

```bash
npm install @eliware/openweathermap
```

## Usage

```js
import { getCurrent, get24hForecast, getSun } from '@eliware/openweathermap';

const lat = 40.7128;
const lon = -74.0060;
const apiKey = 'your_api_key_here';

(async () => {
  const current = await getCurrent(lat, lon, { apiKey, units: 'F' });
  console.log('Current:', current);

  const forecast = await get24hForecast(lat, lon, { apiKey, units: 'F' });
  console.log('24h Forecast:', forecast);

  const sun = await getSun(lat, lon, { apiKey, units: 'F' });
  console.log('Sunrise/Sunset:', sun);
})();
```

## API

### Options

All methods accept `apiKey`, `units` (`C`, `F`, `K`, or OpenWeatherMap unit names),
`fetchImpl`, `timeout`, `retries`, and `now`. Set `throwOnError: true` to throw an
`OpenWeatherMapError` containing HTTP status and URL metadata; otherwise request
failures retain the compatibility behavior of returning `null` or `[]`.

### getCurrent(lat, lon, options?)

Fetches current weather for the given latitude and longitude.

- `lat` (number): Latitude
- `lon` (number): Longitude
- `options` (object):
  - `apiKey` (string, required): Your OpenWeatherMap API key
  - `units` (string, optional): 'F' for Fahrenheit, 'C' for Celsius (default 'C')
  - `fetchImpl` (function, optional): Custom fetch implementation (for testing/mocks)
- **Returns:** Promise resolving to the current weather object (see OpenWeatherMap docs)

### get24hForecast(lat, lon, options?)

Fetches the next 24 hours of forecast data (3-hour intervals, up to 8 items).

- Same parameters as `getCurrent`
- **Returns:** Promise resolving to an array of forecast objects

### getSun(lat, lon, options?)

Fetches sunrise and sunset times for the given coordinates, returning both UTC and local times.

- Same parameters as `getCurrent`
- **Returns:** Promise resolving to:

  ```js
  {
    sunriseUtc: number,    // Sunrise time (UTC, Unix timestamp)
    sunsetUtc: number,     // Sunset time (UTC, Unix timestamp)
    sunriseLocal: number,  // Sunrise time (local, Unix timestamp)
    sunsetLocal: number,   // Sunset time (local, Unix timestamp)
    offset: number       // Timezone offset in seconds (from UTC)
  }
  ```

## TypeScript

Type definitions are included and will be picked up automatically. Example:

```ts
import { getCurrent, get24hForecast, getSun } from '@eliware/openweathermap';

const weather = await getCurrent(40.7128, -74.0060, { apiKey: 'your_api_key_here' });
// weather: object (see OpenWeatherMap API docs)
```

## Support

For help, questions, or to chat with the author and community, visit:

[![Discord](https://eliware.org/logos/discord_96.png)](https://discord.gg/M6aTR9eTwN)[![eliware.org](https://eliware.org/logos/eliware_96.png)](https://discord.gg/M6aTR9eTwN)

**[eliware.org on Discord](https://discord.gg/M6aTR9eTwN)**

## License

[MIT © 2025 Eli Sterling, eliware.org](LICENSE)

## Links

- [Home Page](https://eliware.org)
- [GitHub](https://github.com/eliware/openweathermap)
- [npm](https://www.npmjs.com/package/@eliware/openweathermap)
- [Discord](https://discord.gg/M6aTR9eTwN)
