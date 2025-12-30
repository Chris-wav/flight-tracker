// movementModeling.js
export const movementModeling = (trueTrack, velocity, lat, lon, deltaTime) => {
  if (
    trueTrack == null ||
    velocity == null ||
    lat == null ||
    lon == null ||
    deltaTime == null ||
    deltaTime <= 0
  ) {
    return { newLat: lat, newLon: lon };
  }

  // degrees → radians
  const angleRad = (trueTrack * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;

  // ms → seconds
  const deltaSeconds = deltaTime / 1000;

  // velocity (m/s) → distance (m)
  const distance = velocity * deltaSeconds;

  // local tangent plane (north/east meters)
  const northMovement = distance * Math.cos(angleRad);
  const eastMovement = distance * Math.sin(angleRad);

  const METERS_PER_DEGREE = 111_320;

  const deltaLat = northMovement / METERS_PER_DEGREE;

  // safe cos to avoid exploding near poles
  const cosLat = Math.max(Math.cos(latRad), 0.01);
  const deltaLon = eastMovement / (METERS_PER_DEGREE * cosLat);

  return {
    newLat: lat + deltaLat,
    newLon: lon + deltaLon,
  };
};
  