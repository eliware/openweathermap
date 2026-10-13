export class OpenWeatherMapError extends Error {
  constructor(message, { status, statusText, cause, url } = {}) {
    super(message, { cause });
    this.name = "OpenWeatherMapError";
    this.status = status;
    this.statusText = statusText;
    this.url = url;
  }
}
