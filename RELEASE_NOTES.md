# Release Notes

## 1.1.2 — Current changes

- Standardized Node.js 26 CI workflow.
- Normalized Jest coverage and gap-testing scripts.
- Added AgentX artifact ignore rules.
- Updated dependencies and lockfiles.

## Version history

- `1.1.1` — Version 1.1.1 - 12-09-2025.


## 1.1.3

- Added the standardized Oxlint command.
- Updated package metadata and lockfiles for the latest maintenance pass.
- Synchronized the package with the current Eliware Node.js 26 workflow conventions.
## 1.1.4

- Added coordinate validation for latitude and longitude inputs.
- Added Celsius, Fahrenheit, Kelvin, and native OpenWeatherMap unit names.
- Added configurable request timeouts and retry attempts.
- Added injectable clock support for deterministic forecast filtering.
- Added `OpenWeatherMapError` with optional structured error throwing via `throwOnError`.
- Improved request URL construction and fetch handling.
- Expanded TypeScript declarations and API documentation.
- Removed the unused `dotenv` dependency.
- Updated the example for environment-based API keys, retries, timeouts, and error handling.
- Added `AGENTS.md` project guidance and included the example in the npm package.
- Expanded tests to 100% statements, branches, functions, and lines.

