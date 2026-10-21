# Usage

## Requirements

Use Node.js 26 or later. Get an OpenWeatherMap API key before you make a request.
The package uses the native `fetch` function in Node.js. It does not load `.env` files.

## Install the package

Run this command in your application directory:

```sh
npm install @eliware/openweathermap
```

## Set the API key

Set `OWM_API_KEY` in the process environment before you start Node.js.
You can also pass the key as the `apiKey` option to each method.
The package uses the `apiKey` option before it uses `OWM_API_KEY`.

PowerShell:

```powershell
$env:OWM_API_KEY = "your_api_key_here"
```

POSIX shell:

```sh
export OWM_API_KEY="your_api_key_here"
```

Keep the key out of source files, command output, and logs.
The package sends the key to OpenWeatherMap through HTTPS in the `appid` query parameter.

## Request weather data

Import one or more methods from the package. Pass latitude, longitude, and optional settings to each method.

```js
import { getCurrent, get24hForecast, getSun } from "@eliware/openweathermap";

const lat = 40.7128;
const lon = -74.006;
const options = { units: "F" };

const current = await getCurrent(lat, lon, options);
const forecast = await get24hForecast(lat, lon, options);
const sun = await getSun(lat, lon, options);

console.log(current);
console.log(forecast);
console.log(sun);
```

This example reads `OWM_API_KEY` from the process environment.
Pass `apiKey` in `options` when you do not set that variable.
The `units` option accepts `C`, `F`, `K`, `metric`, `imperial`, or `standard`.

`getCurrent` returns the current weather response from OpenWeatherMap.
`get24hForecast` returns weather entries during the 24 hours after the current time.
`getSun` returns sunrise and sunset timestamps in UTC and local time.
Read the [API reference](api.md) for result details and failure behavior.

## Add a logger

Install `@eliware/log` if your application needs structured request logs.
Pass its logger with the `logger` option.
The package writes request, response, success, retry, and failure records.
It does not write records when you omit `logger`.

```js
import { createLogger } from "@eliware/log";
import { getCurrent } from "@eliware/openweathermap";

const logger = createLogger({ level: "debug", format: "json" });
const weather = await getCurrent(40.7128, -74.006, { logger });
```

The package removes the API key from its log records.
Read the [API reference](api.md#logging) for log levels and record details.

## Use TypeScript

The package includes TypeScript declarations for its public methods and options.
Import the methods and types from `@eliware/openweathermap`.
Read the [API reference](api.md#typescript) for the declared types.
