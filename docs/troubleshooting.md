# Troubleshooting

## Missing API key

Set `OWM_API_KEY` before you start Node.js, or pass `apiKey` in the options object.
The package does not load `.env` files.
Check that the environment variable is available to the process that runs your application.

## Invalid coordinates or options

Pass finite numbers for latitude and longitude.
Keep latitude from -90 to 90 and longitude from -180 to 180.
Set `units` to `C`, `F`, `K`, `metric`, `imperial`, or `standard`.
Set `timeout` to a finite, non-negative number.
Set `retries` to a non-negative integer.
Pass a function as `fetchImpl`.

## Request failure

By default, `getCurrent` and `getSun` return `null` after a request failure.
The `get24hForecast` method returns an empty array after a request failure.
Set `throwOnError` to `true` to receive an `OpenWeatherMapError`.

Check `status` and `statusText` for an HTTP error.
Check `cause` for a transport or parsing error.
Check `url` to inspect the request endpoint and parameters.
The error URL omits the `appid` parameter.
The client redacts the API key from error details and log records.

## Slow requests

Set `timeout` in milliseconds to end a slow request try.
The timeout applies to the request and response parsing.
Set `retries` to allow more attempts after transport errors or HTTP 408, 429, and 5xx responses.
The default timeout is 10000 milliseconds and the default retry count is zero.

## Missing weather entries

The method returns weather entries with `dt` after the current time and at or before 24 hours later.
The `dt` values and the `now` option use Unix time in seconds.
Pass a `now` function when your application needs to control the time range.

## Missing sun data

The `getSun` method needs numeric `sunrise` and `sunset` fields in the response `sys` object.
The method returns `null` when the required fields are missing or are not finite numbers.
The method uses a zero offset when the response has no time-zone offset.
