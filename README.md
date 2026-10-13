# [![eliware.org](https://eliware.org/logos/brand.png)](https://discord.gg/M6aTR9eTwN)

## @eliware/openweathermap [![npm](https://img.shields.io/npm/v/@eliware/openweathermap)](https://www.npmjs.com/package/@eliware/openweathermap) [![License](https://img.shields.io/github/license/eliware/openweathermap)](https://github.com/eliware/openweathermap/blob/main/LICENSE) [![CI](https://github.com/eliware/openweathermap/actions/workflows/ci.yaml/badge.svg)](https://github.com/eliware/openweathermap/actions/workflows/ci.yaml)

A simple, modern, Node.js client for the OpenWeatherMap API. Fetch current weather, 24-hour forecast, and sunrise/sunset times with a clean, promise-based API.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Security](#security)
- [API](#api)
- [Packaging](#packaging)
- [Examples](#examples)
- [Support](#support)
- [Links](#links)
- [License](#license)

## Features

- Get current weather for latitude and longitude.
- Get forecast data for the next 24 hours.
- Get sunrise and sunset times in UTC and local time.
- Set units, timeouts, retries, and error handling.

## Requirements

- Node.js 26 or newer.
- An OpenWeatherMap API key.

## Setup

Install the package:

```sh
npm install @eliware/openweathermap
```

Set `OWM_API_KEY`, or pass `apiKey` in the options object.

## Usage

Read the [release notes](RELEASE_NOTES.md) for version changes.

```js
import { getCurrent, get24hForecast, getSun } from "@eliware/openweathermap";

const options = { apiKey: process.env.OWM_API_KEY, units: "F" };
const current = await getCurrent(40.7128, -74.006, options);
const forecast = await get24hForecast(40.7128, -74.006, options);
const sun = await getSun(40.7128, -74.006, options);
```

## Development

Use Node.js 26 or newer. Use native ESM. Read [AGENTS.md](AGENTS.md) before you change this repository.

## Testing

Run `npm test` to run repository validation. Run `npm run typecheck` to check TypeScript declarations.

## Troubleshooting

Check the API key, coordinates, and unit value. Set `throwOnError: true` to get an `OpenWeatherMapError` with status and URL data.

## Security

Keep API keys out of source control. Use environment settings or a secret manager. Do not put API keys in URLs or logs.

## API

`getCurrent(lat, lon, options)` returns current weather or `null` after a request failure. `get24hForecast(lat, lon, options)` returns matching forecast entries or an empty array.

`getSun(lat, lon, options)` returns sunrise and sunset timestamps in UTC and local time, or `null` if weather data lacks sun fields.

Options support `apiKey`, `units` (`C`, `F`, `K`, `metric`, `imperial`, or `standard`), `fetchImpl`, `timeout`, `retries`, `now`, and `throwOnError`. Coordinates and units are checked before requests.

## Packaging

The package exports `src/index.mjs` and its TypeScript declarations. The npm package includes `src/`, `docs/`, `examples/`, and `specs/`. It excludes tests and workflow files.

Run `npm run pack` to check package contents. Validation does not approve a release. Follow the Eliware Operations process before publication.

## Examples

Read the [example index](examples/README.md) for runnable ESM examples. Read the [documentation index](docs/README.md) for user guides. Read the [specifications index](specs/README.md) for repository requirements.

## Support

For help, questions, or to chat with the author and community, visit:

[![Discord](https://eliware.org/logos/discord_96.png)](https://discord.gg/M6aTR9eTwN)[![eliware.org](https://eliware.org/logos/eliware_96.png)](https://discord.gg/M6aTR9eTwN)

**[eliware.org on Discord](https://discord.gg/M6aTR9eTwN)**

## Links

- [Home Page](https://eliware.org)
- [GitHub Org](https://github.com/eliware)
- [GitHub Repo](https://github.com/eliware/openweathermap)
- [Bug Reports](https://github.com/eliware/openweathermap/issues)
- [npm](https://www.npmjs.com/package/@eliware/openweathermap)
- [Discord](https://discord.gg/M6aTR9eTwN)

## License

[MIT © Eliware](LICENSE)
