# API reference

Import the methods from `@eliware/openweathermap`. Each method returns a promise.

```js
import { getCurrent, get24hForecast, getSun } from "@eliware/openweathermap";
```

## Methods

### `getCurrent(lat, lon, options)`

Request current weather for a location. The method returns the JSON object from the OpenWeatherMap current weather endpoint.
The method returns `null` after a request failure unless `throwOnError` is `true`.

### `get24hForecast(lat, lon, options)`

Request future weather data and return entries with `dt` after the current time and at or before 24 hours later.
The `dt` field uses Unix time in seconds.
The method returns an empty array when a request fails or the response has no `list` array.
The method does not validate the type or contents of entries in `list`.

### `getSun(lat, lon, options)`

Request current weather and return sunrise and sunset data.
The method returns `null` when the request fails or the response has no `sys` object with numeric `sunrise` and `sunset` values.
The method treats a missing or zero time-zone offset as zero.

The result has these fields:

| Field          | Type   | Description                                           |
| -------------- | ------ | ----------------------------------------------------- |
| `sunriseUtc`   | number | Sunrise time as a Unix timestamp in seconds.          |
| `sunsetUtc`    | number | Sunset time as a Unix timestamp in seconds.           |
| `sunriseLocal` | number | Sunrise timestamp plus the provider time-zone offset. |
| `sunsetLocal`  | number | Sunset timestamp plus the provider time-zone offset.  |
| `offset`       | number | Provider time-zone offset from UTC, in seconds.       |

The `sunriseLocal` and `sunsetLocal` fields are shifted timestamps.
Convert them to a date or time with your preferred date library or JavaScript date functions.

## Inputs

Call each method with latitude, longitude, and an optional settings object.

| Input     | Type   | Valid values                                    |
| --------- | ------ | ----------------------------------------------- |
| `lat`     | number | A finite number from -90 to 90.                 |
| `lon`     | number | A finite number from -180 to 180.               |
| `options` | object | Optional request settings in the Options table. |

The method rejects with `RangeError` when latitude or longitude is not finite or falls outside its range.

## Options

| Option         | Type          | Default           | Description                                                            |
| -------------- | ------------- | ----------------- | ---------------------------------------------------------------------- |
| `apiKey`       | string        | `OWM_API_KEY`     | OpenWeatherMap API key.                                                |
| `units`        | `Units`       | `C`               | Temperature and measurement units.                                     |
| `fetchImpl`    | function      | `fetch`           | Function that makes the HTTP request.                                  |
| `timeout`      | number        | `10000`           | Maximum time for one request try, in milliseconds.                     |
| `retries`      | number        | `0`               | Number of more tries after retryable failures.                         |
| `now`          | function      | Current Unix time | Function that returns Unix time in seconds for weather data filtering. |
| `throwOnError` | boolean       | `false`           | Throw `OpenWeatherMapError` after a request failure.                   |
| `logger`       | logger object | none              | Optional logger from `@eliware/log`.                                   |

The package uses the `apiKey` option before it uses `OWM_API_KEY`.
The package does not load `.env` files.
The package sends the API key to OpenWeatherMap through HTTPS as the `appid` query parameter.

The `Units` type accepts `C`, `F`, `K`, `metric`, `imperial`, or `standard`.
The package maps `C` to `metric`, `F` to `imperial`, and `K` to `standard`.
The package passes the other three values to OpenWeatherMap without changes.

The `fetchImpl` option must be a function. The `timeout` option must be a finite, non-negative number.
The `retries` option must be a non-negative integer. Use a `now` function that returns Unix time in seconds.

Invalid units, timeout, or retry values cause a rejected promise with `RangeError`.
An invalid `fetchImpl` causes a rejected promise with `TypeError`.
A missing API key causes a rejected promise with `Error`.

## Request behavior

The client calls the OpenWeatherMap current weather endpoint for `getCurrent` and `getSun`.
The client calls the OpenWeatherMap weather data endpoint for `get24hForecast`.
The client sends coordinates, units, and the API key with each request.

The timeout applies to one request try and response parsing.
The client retries transport errors and HTTP status 408, 429, and 500 or higher.
The client does not retry other HTTP errors or invalid JSON responses.
The `retries` value counts more tries, so `retries: 2` allows a maximum of three tries.

## Failure behavior

By default, failed requests return `null` from `getCurrent` and `getSun`.
By default, `get24hForecast` returns an empty array after a request failure.
Set `throwOnError` to `true` to receive an `OpenWeatherMapError` as an alternative.

`OpenWeatherMapError` extends `Error` and has a `name` value of `OpenWeatherMapError`.
It can include `status`, `statusText`, `url`, and `cause` fields.
Some fields may be undefined when the error comes from a transport failure or a timeout.
The error URL omits the `appid` parameter.
The client redacts the API key from error messages, status text, causes, and log records.

## Logging

Pass a logger from `@eliware/log` in the `logger` option to receive structured records.
The client calls the `debug`, `http`, `info`, `warn`, and `error` logger methods when those methods exist.
The client records request starts, HTTP responses, successes, retries, and failures.
The client omits coordinates, the API key, and the request URL from its log metadata.
The client uses `safeSerialize` and the redaction tools from `@eliware/log`.

```js
import { createLogger } from "@eliware/log";
import { getCurrent } from "@eliware/openweathermap";

const logger = createLogger({ level: "debug", format: "json" });
await getCurrent(40.7128, -74.006, { logger });
```

`@eliware/log` supports `error`, `warn`, `info`, `http`, `verbose`, `debug`, and `silly` levels.
This client uses `debug`, `http`, `info`, `warn`, and `error`.

## TypeScript

The package includes declarations in `src/index.d.ts`.
Import `Units`, `OpenWeatherOptions`, and `OpenWeatherMapError` from the package.
The methods return promises with the result types described above.
