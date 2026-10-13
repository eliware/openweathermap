# AGENTS.md

## Project

Use Node.js 26 or later. Use native ESM.

## Scope and boundaries

Maintain this OpenWeatherMap client and its package. Leave OpenWeatherMap service operations to the provider.

## Layout

Keep runtime files in `src/`. Keep one matching test in `tests/` for each runtime file.

## Development

Keep each runtime file below 100 lines. Keep each test file below 200 lines.

## Validation

Run `npm test`. Run `npm run lint`. Run `npm run audit`. Run `npm run format`. Run `npm run format:check`. Run `npm run typecheck`. Run `npm run pack`.

## Security

Keep API keys out of source control. Use placeholders in examples. Do not put API keys in URLs or logs.

## Changes

Keep user docs current. Record user-visible changes in `RELEASE_NOTES.md`. Do not treat validation as release approval.

## Library

Keep API docs and TypeScript declarations aligned with the code. Add one matching test for each runtime file. Keep each declaration beside its runtime file.

## npm publication

Include only supported consumer files in the package. Follow the Eliware Operations approval process before publication.
