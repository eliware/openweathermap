export type Units = "C" | "F" | "K" | "metric" | "imperial" | "standard";
export interface OpenWeatherOptions {
  apiKey?: string;
  units?: Units;
  fetchImpl?: typeof fetch;
  timeout?: number;
  retries?: number;
  now?: () => number;
  throwOnError?: boolean;
}
export class OpenWeatherMapError extends Error {
  status?: number;
  statusText?: string;
  url?: string;
}
export function getCurrent(
  lat: number,
  lon: number,
  options?: OpenWeatherOptions,
): Promise<Record<string, unknown> | null>;
export function get24hForecast(
  lat: number,
  lon: number,
  options?: OpenWeatherOptions,
): Promise<Record<string, unknown>[]>;
export function getSun(
  lat: number,
  lon: number,
  options?: OpenWeatherOptions,
): Promise<{
  sunriseUtc: number;
  sunsetUtc: number;
  sunriseLocal: number;
  sunsetLocal: number;
  offset: number;
} | null>;
