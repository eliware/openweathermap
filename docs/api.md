# API reference

Import methods from `@eliware/openweathermap`. Each method returns a promise.

```js
import { getCurrent, get24hForecast, getSun } from "@eliware/openweathermap";
```

## Method inputs

Call each method with `lat`, `lon`, and an optional `options` object.

- `lat`: finite number from -90 to 90.
- `lon`: finite number from -180 to 180.
- `options`: settings for the request.

The method rejects with `RangeError` if latitude or longitude falls outside these limits or is not finite.

## Options

| Option         | Type     | Default              | Description                                                                                                     |
| -------------- | -------- | -------------------- | --------------------------------------------------------------------------------------------------------------- |
| `apiKey`       | string   | `OWM_API_KEY`        | OpenWeatherMap API key.                                                                                         |
| `units`        | string   | `C`                  | `C`, `F`, `K`, `metric`, `imperial`, or `standard`.                                                             |
| `fetchImpl`    | function | `fetch`              | Fetch function for the request.                                                                                 |
| `timeout`      | number   | `10000`              | Maximum time for one request try in milliseconds. Zero schedules the timeout after the current event-loop turn. |
| `retries`      | number   | `0`                  | Number of added request tries. Use a non-negative integer.                                                      |
| `now`          | function | Unix time in seconds | Clock used to select entries in the 24-hour range.                                                              |
| `throwOnError` | boolean  | `false`              | Throw `OpenWeatherMapError` after request failure.                                                              |
| `logger`       | object   | none                 | Optional logger from `@eliware/log`.                                                                            |

`C` maps to `metric`. `F` maps to `imperial`. `K` maps to `standard`. The three provider unit names map to themselves.

Retries apply to transport errors and HTTP 408, 429, and 5xx responses. The client does not retry other HTTP errors.

The package reads `OWM_API_KEY` when `apiKey` is not set. The package does not load `.env` files.

## Logging

Pass a logger from `@eliware/log` in `logger` to receive structured records. The package writes `debug` request starts, `http` responses, `info` successes, `warn` retries, and `error` failures. If `logger` has no value, the package writes no records.

Records include the operation, request number, and response status when available. Records omit coordinates, the API key, and the request URL. The logger uses `safeSerialize` and the redaction tools from `@eliware/log`.

```js
import { createLogger } from "@eliware/log";
import { getCurrent } from "@eliware/openweathermap";

const logger = createLogger({ level: "debug", format: "json" });
await getCurrent(40.7128, -74.006, { logger });
```

`@eliware/log` supports `error`, `warn`, `info`, `http`, `verbose`, `debug`, and `silly` levels. The package uses the levels listed above.

## `getCurrent`

`getCurrent(lat, lon, options)` requests current weather. It returns the provider's JSON object. A request failure returns `null` by default.

## `get24hForecast`

`get24hForecast(lat, lon, options)` requests 24-hour data. It returns entries with `dt` after `now` and at or before `now + 24 hours`. The clock uses Unix time in seconds. The method returns an empty array if the request fails or the response has no `list` array.

## `getSun`

`getSun(lat, lon, options)` requests current weather and reads its sun times and time-zone offset. It returns these fields:

- `sunriseUtc`: sunrise time as a Unix timestamp.
- `sunsetUtc`: sunset time as a Unix timestamp.
- `sunriseLocal`: sunrise timestamp plus the provider's time-zone offset.
- `sunsetLocal`: sunset timestamp plus the provider's time-zone offset.
- `offset`: time-zone offset in seconds from UTC.

The method returns `null` when the request fails or the response has no `sys`, `sunrise`, or `sunset` value. It uses an offset of zero when the response has no offset.

## Errors

Invalid coordinates, units, timeout, or retries cause a rejected promise with `RangeError`. A missing API key causes a rejected promise with `Error`. An invalid `fetchImpl` causes a rejected promise with `TypeError`.

By default, request failures return `null` or an empty array. Set `throwOnError` to `true` to receive `OpenWeatherMapError`.

`OpenWeatherMapError` has optional `status`, `statusText`, `url`, and `cause` fields. The client uses `@eliware/log` redaction tools to redact the API key from error messages, status text, causes, and log records. Error URLs omit the `appid` parameter. The client includes the key in its request to OpenWeatherMap.

## TypeScript

The package includes type declarations for its methods, options, units, and error class.
