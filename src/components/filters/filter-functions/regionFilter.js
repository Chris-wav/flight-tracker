import { REGIONS_MAP } from "../../../config/regionMap";

export const filterByRegion = (flights, region) => {
  if (!region || !REGIONS_MAP[region]) return flights;

  const { minLat, maxLat, minLng, maxLng } = REGIONS_MAP[region];

  return flights.filter((flight) => {
    const { latitude, longitude } = flight;

    if (latitude == null || longitude == null) return false;

    return (
      latitude >= minLat &&
      latitude <= maxLat &&
      longitude >= minLng &&
      longitude <= maxLng
    );
  });
};
