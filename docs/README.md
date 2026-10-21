# User documentation

Use this documentation to install the package, request weather data, and resolve errors.

## Guides

- [Usage](usage.md): install the package, set an API key, and run requests.
- [API reference](api.md): inspect method inputs, options, results, and errors.
- [Troubleshooting](troubleshooting.md): resolve common setup and request problems.

## Before you start

Use Node.js 26 or later. Get an API key from OpenWeatherMap. The package sends each API key to OpenWeatherMap through HTTPS as the `appid` query parameter.

Do not share API keys in source control, terminal output, or logs. The package removes the key from its own error details and log records.
