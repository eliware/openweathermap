# Troubleshooting

## Missing API key

Pass `apiKey` in the options object. Or set `OWM_API_KEY` in the process environment before you start Node.js. The package does not load `.env` files.

## Invalid coordinates or units

Pass finite numbers for latitude and longitude. Keep latitude from -90 to 90. Keep longitude from -180 to 180. Set `units` to `C`, `F`, `K`, `metric`, `imperial`, or `standard`.

## Request failure

By default, current weather and sun requests return `null`. Forecast requests return an empty array. Set `throwOnError` to `true` to receive `OpenWeatherMapError`.

Check `status` and `statusText` for an HTTP error. Check `cause` for a transport error. Check `url` to see the request target. Error URLs omit the API key. Error messages and causes redact the key.

## Slow or unstable requests

Set `timeout` in milliseconds to end a slow request. Set `retries` to allow more attempts. The default timeout is 10000 milliseconds. The default retry count is zero.

## No sun data

`getSun` needs the `sys` object from the current weather response. The method returns `null` if that object is absent. It uses a zero time-zone offset when the response omits the offset.
