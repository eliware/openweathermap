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

- Get current weather and 24-hour weather data by latitude and longitude.
- Get sunrise and sunset times in UTC and local time.

## Requirements

Use Node.js 26 or later. Get an OpenWeatherMap API key.

## Setup

Install the package:

```sh
npm install @eliware/openweathermap
```

Set `OWM_API_KEY` before you start Node.js, or pass `apiKey` to a method.
Read the [user guide](docs/README.md) for setup steps.

## Usage

```js
import { getCurrent, get24hForecast, getSun } from "@eliware/openweathermap";

const options = { units: "F" };
const current = await getCurrent(40.7128, -74.006, options);
const weather = await get24hForecast(40.7128, -74.006, options);
const sun = await getSun(40.7128, -74.006, options);
```

Set `OWM_API_KEY` in the process environment before you run this example.
Read the [API reference](docs/api.md) for method details and the [release notes](RELEASE_NOTES.md) for version changes.

## Development

Use native ESM. Read [AGENTS.md](AGENTS.md) before you change this repository.

## Testing

Run `npm test` to validate the repository.

## Troubleshooting

Read the [troubleshooting guide](docs/troubleshooting.md) to resolve common problems.

## Security

Keep API keys out of source files and logs. The client sends each key to OpenWeatherMap through HTTPS.

## API

Import `getCurrent`, `get24hForecast`, or `getSun` with latitude, longitude, and optional settings.
The package exports one ESM entry point and its TypeScript declarations.
Read the [API reference](docs/api.md) and [user documentation index](docs/README.md).

## Packaging

The package includes `package.json`, `src/`, `docs/`, `examples/`, `specs/`, `README.md`, `AGENTS.md`, `RELEASE_NOTES.md`, `LICENSE`, and `.env.example`.
Use numeric `MAJOR.MINOR.PATCH` versions. The npm workflow publishes only a matching `v<version>` tag and adds npm provenance.
Follow Eliware Operations procedures for release approval.
Run `npm run pack` to check package contents.

## Examples

Read the [example index](examples/README.md) and [specification index](specs/README.md).

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
