# Usage

## Requirements

Use Node.js 26 or later. Get an OpenWeatherMap API key. The package uses Node.js native `fetch`.

## Install the package

Run this command in your project:

```sh
npm install @eliware/openweathermap
```

## Set the API key

Pass `apiKey` in the options object. Or set `OWM_API_KEY` in the process environment before you start Node.js. The package does not load `.env` files.

PowerShell:

```powershell
$env:OWM_API_KEY = "your_api_key_here"
```

POSIX shell:

```sh
export OWM_API_KEY="your_api_key_here"
```

Keep the key out of source files, URLs, and logs.

## Request weather data

Import the methods that you need. Pass latitude, longitude, and options to each method.

```js
import { getCurrent, get24hForecast, getSun } from "@eliware/openweathermap";

const options = { units: "F" };
const lat = 40.7128;
const lon = -74.006;

const current = await getCurrent(lat, lon, options);
const forecast = await get24hForecast(lat, lon, options);
const sun = await getSun(lat, lon, options);

console.log(current);
console.log(forecast);
console.log(sun);
```

The example uses `OWM_API_KEY` from the process environment. Pass `apiKey` in `options` when you do not use that environment setting.

`getCurrent` returns the provider's current weather object. `get24hForecast` returns forecast entries for the next 24 hours. `getSun` returns sun times and the provider's time-zone offset.

Read the [API reference](api.md) for all options and return values.
