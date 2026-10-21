# Release Notes

## 15.0.0 — 2026-10-21

### Changed

This release adopts Eliware convention 15.0. It updates the package and repository specification versions to 15.0.0 and 15.0.

This release updates `@eliware/log` and `@eliware/test` to 15.0.0. It updates transitive dependencies and refreshes the lockfile.

This release updates the README with the package entry point, numeric version rules, npm publication limits, and approval process.

This release updates the usage guide with the `OWM_API_KEY` default and requirement. It explains that each request needs an API key.

## 14.0.0 — 2026-10-21

### Changed

This release adopts Eliware library convention 14.0. It updates package metadata, dependencies, repository specifications, and contributor guidance.

This release updates CI and npm publication workflows. CI and release validation use checkout action v7 and fetch the full Git history.

This release updates the Knit deployment workflow to use the shared deployment commands.

This release expands the user guides with complete setup, API, result, request, error, logging, and troubleshooting details. It corrects the `.env.example` instructions to match runtime behavior.

This release separates unit mapping, retry policy, and request redaction into focused modules with matching tests.

### Added

This release adds optional structured logging through `@eliware/log`. Pass a logger with the `logger` option to receive request, response, success, retry, and failure records.

This release adds the `logger` option to the TypeScript declarations.

### Security

This release replaces the direct `@eliware/redact` dependency with `@eliware/log` safe serialization and redaction tools. Error URLs omit `appid`. Error messages, status text, causes, and log records redact API keys.

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
