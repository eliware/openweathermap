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

The method rejects with `RangeError` when coordinates are outside these limits or are not finite numbers.

## Options

| Option         | Type     | Default              | Description                                                                                               |
| -------------- | -------- | -------------------- | --------------------------------------------------------------------------------------------------------- |
| `apiKey`       | string   | `OWM_API_KEY`        | OpenWeatherMap API key.                                                                                   |
| `units`        | string   | `C`                  | `C`, `F`, `K`, `metric`, `imperial`, or `standard`.                                                       |
| `fetchImpl`    | function | `fetch`              | Fetch function for the request.                                                                           |
| `timeout`      | number   | `10000`              | Maximum time per request attempt in milliseconds. Zero schedules the timeout on the next event-loop turn. |
| `retries`      | number   | `0`                  | Non-negative integer count of extra attempts.                                                             |
| `now`          | function | Unix time in seconds | Clock for forecast filtering.                                                                             |
| `throwOnError` | boolean  | `false`              | Throw `OpenWeatherMapError` after request failure.                                                        |

`C` maps to `metric`. `F` maps to `imperial`. `K` maps to `standard`. The three provider unit names map to themselves.

Retries apply to transport errors and HTTP 408, 429, and 5xx responses. The client does not retry other HTTP errors.

The package reads `OWM_API_KEY` when `apiKey` is not set. The package does not load `.env` files.

## `getCurrent`

`getCurrent(lat, lon, options)` requests current weather. It returns the provider's JSON object. A request failure returns `null` by default.

## `get24hForecast`

`get24hForecast(lat, lon, options)` requests forecast data. It returns entries with `dt` after `now` and at or before `now + 24 hours`. The clock uses Unix time in seconds. The method returns an empty array when the request fails or the response has no `list` array.

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

`OpenWeatherMapError` has optional `status`, `statusText`, `url`, and `cause` fields. The client uses `@eliware/redact` to redact the API key from error messages, status text, and causes. Error URLs omit the `appid` parameter. The request URL still sends the key to OpenWeatherMap.

## TypeScript

The package includes type declarations for its methods, options, units, and error class.
