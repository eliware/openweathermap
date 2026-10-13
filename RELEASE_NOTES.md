# Release Notes

## 12.0.0 — 2026-10-13

### Changed

This release moves the runtime module and TypeScript declaration to `src/`. It moves the matching test to `tests/`.

This release sets package version 12.0.0. It updates package metadata, files, scripts, and validation for Eliware convention version 12.0.

This release removes the direct Jest dependency. It adds `@eliware/test` and TypeScript as development dependencies. It updates the lockfile.

This release replaces the old workflow with shared CI and npm publish workflows. It updates the Knit checkout path and adds package provenance settings.

This release changes coordinate errors to `lat must be in range` and `lon must be in range`.

This release validates timeouts as finite non-negative numbers. It validates retry counts as non-negative integers.

This release ends a request when its timeout expires. It skips retries for permanent HTTP errors. It returns no sun data when sunrise or sunset data is missing.

This release applies timeouts to response parsing. It skips retries when a successful response has invalid JSON. It rejects an unavailable fetch function.

This release updates the MIT copyright and adds shared ignore rules.

This release adds user docs for setup, API inputs, options, results, errors, and troubleshooting. It updates the README, contributor rules, examples, indexes, and specifications.

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
