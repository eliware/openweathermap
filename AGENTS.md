# AGENTS.md

## Project

Maintain `@eliware/openweathermap`, a Node.js client for the OpenWeatherMap API.
Use Node.js 26 or newer and native ESM.

## Scope and boundaries

Keep OpenWeatherMap API operations in this package.

## Layout

Keep runtime files in `src/` and tests in `tests/`.
Add one matching test for each runtime file.
Keep each declaration beside its runtime file.

## Development

Keep public API documentation and TypeScript declarations aligned with the code.
Use placeholders for credentials in examples.

## Validation

Run `npm test` for aggregate validation.
Run `npm run lint` for lint checks and `npm run audit` for dependency checks.
Run `npm run format` to format files and `npm run format:check` to check formatting.
Run `npm run typecheck` to check declarations and `npm run pack` to check package contents.

## Security

Keep credentials out of Git and logs.
Do not put API keys in source files or printed output.

## Changes

Keep user documentation current.
Record user-visible changes in `RELEASE_NOTES.md`.

## Library

Document public APIs, supported use, and package contents in `README.md`.
Include only supported consumer files in the package.
Run focused tests first during development.

Run one test file with `npm test -- tests/path/to/example.test.mjs`.

Run multiple test files with `npm test -- tests/path/to/first.test.mjs tests/path/to/second.test.mjs`.

Prevent repeated full-suite runs during development.

Run the full `npm test` suite for final validation before a commit, milestone, or release.

## npm publication

Follow Eliware Operations procedures for release approval.
