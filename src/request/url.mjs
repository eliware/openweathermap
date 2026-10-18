export function requestUrl(path, lat, lon, config) {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    appid: config.apiKey,
    units: config.owmUnits,
  });
  return `https://api.openweathermap.org/data/2.5/${path}?${params}`;
}
