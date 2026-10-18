# AGENTS.md

## Project

Use Node.js 26 or newer. Use native ESM.

## Scope and boundaries

Maintain this OpenWeatherMap client and its package.
Keep OpenWeatherMap API operations in the provider.

## Layout

Keep runtime files in `src/`.
Keep one matching test in `tests/` for each runtime file.

## Development

Keep each runtime file under 100 lines.
Keep each test file under 200 lines.

## Validation

Run `npm test` for aggregate validation.
Run `npm run lint` for lint checks.
Run `npm run audit` for dependency checks.

Run `npm run format` to format files.
Run `npm run format:check` to check formatting.

Run `npm run typecheck` to check TypeScript declarations.
Run `npm run pack` to check package contents.

## Security

Keep API keys out of Git.
Use placeholders in examples.
Do not put API keys in URLs or logs.

## Changes

Keep user docs current.
Record user-visible changes in `RELEASE_NOTES.md`.
Validation does not count as release approval.

## Library

Document public APIs, supported use, and package contents in `README.md`.
Keep API docs and TypeScript declarations aligned with the code.
Add one matching test for each runtime file.
Keep each declaration beside its runtime file.

- Run focused tests first during development.
- Run one test file with `npm test -- tests/path/to/example.test.mjs`.
- Run multiple test files with `npm test -- tests/path/to/first.test.mjs tests/path/to/second.test.mjs`.
- Prevent repeated full-suite runs during development.
- Run the full `npm test` suite for final validation before a commit, milestone, or release.

## npm publication

Include only supported consumer files in the package.
Follow the Eliware Operations approval process before publication.
