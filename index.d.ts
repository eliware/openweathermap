export function getCurrent(lat: number, lon: number, options?: { apiKey?: string, units?: string, fetchImpl?: Function }): Promise<object|null>;
export function get24hForecast(lat: number, lon: number, options?: { apiKey?: string, units?: string, fetchImpl?: Function }): Promise<object[]|null>;
export function getSun(lat: number, lon: number, options?: { apiKey?: string, units?: string, fetchImpl?: Function }): Promise<{
  sunriseUtc: number,
  sunsetUtc: number,
  sunriseLocal: number,
  sunsetLocal: number,
  offset: number
}|null>;
