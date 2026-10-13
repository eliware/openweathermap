# AGENTS.md

## Project

Maintain the OpenWeatherMap client with Node.js 26 or later. Use native ESM.

## Scope and boundaries

This repository owns the public npm client and its source. It does not own OpenWeatherMap services.

## Layout

Keep runtime modules in `src/`. Keep matching tests in `tests/`. Keep guides in `docs/`. Keep runnable ESM examples in `examples/`. Keep requirements in `specs/`.

## Development

Keep each source and test module focused. Keep each source module below 100 lines. Keep each test file below 200 lines.

## Validation

Use Node.js 26 or later. Use native ESM. Run `npm test`, `npm run lint`, `npm run audit`, `npm run format:check`, `npm run typecheck`, and `npm run pack`.

## Security

Protect API keys and other secrets. Use placeholders in examples. Do not commit `.env` files or credential URLs.

## Changes

Keep user guides current. Record user-visible changes in `RELEASE_NOTES.md`. Validation does not grant release or deployment authority.

## Library

Keep the public entrypoint thin. Add a matching test for each runtime module. Keep the TypeScript declaration beside its runtime module.

## npm publication

Keep package contents limited to supported consumer files. Follow the Eliware Operations publication process. Do not publish from local validation.
