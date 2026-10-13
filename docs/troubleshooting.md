# Troubleshooting

Check that the API key is set. Check that latitude is between -90 and 90. Check that longitude is between -180 and 180.

Request failures return `null` or an empty array by default. Set `throwOnError: true` to receive an `OpenWeatherMapError`. Set `timeout` and `retries` for network requests.
