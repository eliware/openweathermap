# [![eliware.org](https://eliware.org/logos/brand.png)](https://discord.gg/M6aTR9eTwN)

## @eliware/openweathermap [![npm](https://img.shields.io/npm/v/@eliware/openweathermap)](https://www.npmjs.com/package/@eliware/openweathermap) [![License](https://img.shields.io/github/license/eliware/openweathermap)](https://github.com/eliware/openweathermap/blob/main/LICENSE) [![CI](https://github.com/eliware/openweathermap/actions/workflows/ci.yaml/badge.svg)](https://github.com/eliware/openweathermap/actions/workflows/ci.yaml)

A Node.js client for the OpenWeatherMap API. Fetch current weather, 24-hour weather data, and sunrise/sunset times with a promise-based API.

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

- Retrieve current weather for valid latitude and longitude.
- Retrieve 24-hour weather data.
- Retrieve sunrise and sunset times in UTC and local time.

## Requirements

- Use Node.js 26 or later.
- Request an OpenWeatherMap API key.

## Setup

Install the package:

```sh
npm install @eliware/openweathermap
```

Set `OWM_API_KEY`, or pass `apiKey` to a method.

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

Use Node.js 26 or later. Use native ESM. Read [AGENTS.md](AGENTS.md) before you change this repository.

## Testing

Run `npm test` to validate the repository.

## Troubleshooting

Check the API key, coordinates, and units. Set `throwOnError` to `true` to receive an `OpenWeatherMapError`.

## Security

Keep API keys out of source control. Do not put API keys in URLs or logs.

## API

Call `getCurrent`, `get24hForecast`, or `getSun` with latitude, longitude, and an options object. Read the [API reference](docs/api.md) for inputs, options, results, and errors.

## Packaging

The package contains `src/`, `docs/`, `examples/`, and `specs/`. Run `npm run pack` to check package contents. Follow the Eliware Operations approval process before publication.

## Examples

Read the [example index](examples/README.md), [user docs](docs/README.md), and [specification index](specs/README.md).

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
