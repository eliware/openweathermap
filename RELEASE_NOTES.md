# Release Notes

## 13.0.0 — 2026-10-17

### Changed

This release adopts Eliware library convention 13.0. It updates the package version, workflows, Knit deployment, and contributor instructions.

### Security

This release removes `appid` from public error URLs. It uses `@eliware/redact` to redact the API key from error messages, status text, and causes.

## 12.0.0 — 2026-10-13

### Added

This release adds TypeScript declarations and TypeScript checks. It adds `@eliware/test` for test, lint, audit, format, and package checks.

This release adds user documentation for setup, API methods, options, results, errors, and troubleshooting. It adds documentation indexes, repository specifications, and runnable examples.

This release adds shared CI, npm publish, and Knit deployment workflows. The Knit workflow uses `/eliware/openweathermap`.

### Changed

This release moves runtime modules and declarations to `src/`. It moves matching tests to `tests/` and separates configuration, latitude and longitude checks, URL building, request handling, and error handling.

This release sets the package version to 12.0.0. It updates package metadata, exports, files, scripts, and validation for Eliware convention version 12.0. It sets Node.js 26 as the minimum version.

This release removes the direct Jest dependency. It adds `@eliware/test` and TypeScript as development dependencies. It updates the lockfile and Prettier settings.

This release adds npm provenance settings. It updates the README, contributor instructions, license, examples, ignore rules, and repository metadata. It applies Simplified Technical English to user and contributor documentation.

### Fixed

This release validates latitude, longitude, units, timeout values, retry counts, and the fetch function. It names invalid values as `lat` or `lon` and returns an error for invalid options.

This release ends a request when its timeout expires, also during response parsing. It retries transport errors and HTTP 408, 429, and 5xx responses. It skips retries for other HTTP errors and invalid JSON.

This release returns no sun data when the response has no numeric sunrise or sunset values. It keeps the default failure results as `null` or an empty array.

This release adds `@eliware/redact` as a runtime dependency. It removes `appid` from public error URLs and redacts the API key from error messages, HTTP status text, and causes.
