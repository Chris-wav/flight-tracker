export const movementModeling = (trueTrack, velocity, lat, lon, deltaTime) => {
  if (trueTrack == null || velocity == null)
    return { newLat: lat, newLong: lon };

  const angle = (trueTrack * Math.PI) / 180;
  const deltaSeconds = deltaTime / 1000;

  const distance = velocity * deltaSeconds;

  const northMovement = distance * Math.cos(angle);
  const eastMovement = distance * Math.sin(angle);

  const deltaLat = northMovement / 111320;
  const deltaLon =
    eastMovement / (111320 * Math.cos((lat * Math.PI) / 180 || 1));

  return {
    newLat: lat + deltaLat,
    newLong: lon + deltaLon,
  };
};
