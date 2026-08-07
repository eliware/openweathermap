# Release Notes

## 1.1.6 — August 7, 2026

- Aligned repository structure, package metadata, validation scripts, CI, documentation, and package contents with Eliware library conventions.
- Added TypeScript declaration checking and standardized package dry-run validation.
- Moved tests and examples into convention-compliant directories.
- Removed the unnecessary `node-fetch` runtime dependency in favor of Node.js 26 native `fetch`.
- Verification: tests, 100% coverage, gap checks, lint, typecheck, pack, smoke test, and production audit pass.

## 1.1.5

- Corrected coverage-gap filtering so fully covered files are excluded reliably.
- Verification: tests pass with 100% coverage and lint passes.

## 1.1.4

- Added coordinate validation for latitude and longitude inputs.
- Added Celsius, Fahrenheit, Kelvin, and native OpenWeatherMap unit names.
- Added configurable request timeouts, retries, and injectable clock support.
- Added `OpenWeatherMapError` and structured error handling.
- Removed the unused `dotenv` dependency.
- Updated examples, declarations, documentation, and tests.
- Verification: tests pass with 100% coverage and lint passes.

## 1.1.3

- Added the standardized Oxlint command.
- Updated package metadata and lockfiles for Node.js 26 conventions.

## 1.1.2

- Standardized Node.js 26 CI, coverage scripts, AgentX ignore rules, dependencies, and lockfiles.

## 1.1.1

- Initial documented release, December 9, 2025.
