export function coordinates(lat, lon) {
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) throw new RangeError("lat must be in range");
  if (!Number.isFinite(lon) || lon < -180 || lon > 180)
    throw new RangeError("lon must be in range");
}
