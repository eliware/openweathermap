# AGENTS.md

## Project

`@eliware/openweathermap` is an ESM-first OpenWeatherMap client for current weather,
24-hour forecasts, and sunrise/sunset data.

## Development

- Use Node.js 26 and npm.
- Run `npm install` after dependency changes.
- Run `npm test` for Jest coverage.
- Run `npm run test:gaps` to inspect uncovered paths.
- Run `npm run lint`; it must finish with zero warnings and errors.
- Do not commit `.env`, API keys, `node_modules`, coverage output, or `.jest.result`.

## API behavior

- Coordinates are validated before requests are made.
- HTTP failures preserve backward compatibility by returning `null`/`[]` by default.
- Set `throwOnError: true` to receive `OpenWeatherMapError` instances.
- Use `timeout`, `retries`, and `now` for production control and deterministic tests.
- Keep `fetchImpl` injectable for tests.
