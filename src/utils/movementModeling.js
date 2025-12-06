export const movementModeling = (trueTrack, velocity, lat, lon, deltaTime) => {
  if (!trueTrack || !velocity) return { newLat: lat, newLon: lon };

  const angle = (trueTrack * Math.PI) / 180;
  const distance = velocity * deltaTime;

  const northMovement = distance * Math.cos(angle);
  const eastMovement = distance * Math.sin(angle);

  const deltaLat = northMovement / 111320;
  const deltaLon =
    eastMovement / (111320 * Math.cos((lat * Math.PI) / 180 || 1));

  return {
    newLat: lat + deltaLat,
    newLon: lon + deltaLon,
  };
};
