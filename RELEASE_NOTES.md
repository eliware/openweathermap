# Release Notes

## 12.0.0 — 2026-10-13

### Added

This release adds TypeScript declarations and TypeScript checks. It adds `@eliware/test` for test, lint, audit, format, and package checks.

This release adds user documentation for setup, API methods, options, results, errors, and troubleshooting. It adds documentation indexes, repository specifications, and runnable examples.

This release adds shared CI, npm publish, and Knit deployment workflows. The Knit workflow uses `/eliware/openweathermap`.

### Changed

This release moves runtime modules and declarations to `src/`. It moves matching tests to `tests/` and separates configuration, coordinate checks, URL building, request handling, and error handling.

This release sets the package version to 12.0.0. It updates package metadata, exports, files, scripts, and validation for Eliware convention version 12.0. It sets Node.js 26 as the minimum version.

This release removes the direct Jest dependency. It adds `@eliware/test` and TypeScript as development dependencies. It updates the lockfile and Prettier settings.

This release adds npm provenance settings. It updates the README, contributor instructions, license, examples, ignore rules, and repository metadata. It applies Simplified Technical English to user and contributor documentation.

### Fixed

This release validates coordinates, units, timeout values, retry counts, and the fetch function. It names invalid coordinates as `lat` or `lon` and returns an error for invalid options.

This release ends a request when its timeout expires, including during response parsing. It retries transport errors and HTTP 408, 429, and 5xx responses. It skips retries for other HTTP errors and invalid JSON.

This release returns no sun data when the response has no numeric sunrise or sunset values. It keeps the default failure results as `null` or an empty array.

This release adds `@eliware/redact` as a runtime dependency. It removes `appid` from public error URLs and redacts the API key from error messages, HTTP status text, and causes.

## 1.1.6 — 2026-08-07

### Changed

This release aligned the repository structure, package metadata, validation scripts, CI, docs, and package contents with Eliware library rules. It added TypeScript checks and package dry-run validation. It moved tests and examples into standard folders. It replaced `node-fetch` with Node.js native `fetch`.

## 1.1.5 — 2026-08-07

### Fixed

This release fixed coverage-gap filtering. Fully covered files no longer appear as gaps.

## 1.1.4 — 2026-08-06

### Added

This release added coordinate checks, unit options, request timeouts, retries, clock input, and structured errors.

### Changed

This release removed unused `dotenv`. It updated examples, declarations, docs, and tests.

## 1.1.3 — 2026-08-06

### Changed

This release added the Oxlint command. It updated package metadata and lockfiles for Node.js 26.

## 1.1.2 — 2026-08-06

### Changed

This release updated Node.js 26 CI, coverage scripts, AgentX ignore rules, dependencies, and lockfiles.

## 1.1.1 — 2025-12-09

### Added

This release added the first documented package version.
