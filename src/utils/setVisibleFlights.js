export const setVisibleFlights = (flights, bounds) => {
  const south = bounds._southWest.lat;
  const west = bounds._southWest.lng;
  const north = bounds._northEast.lat;
  const east = bounds._northEast.lng;
  return flights.filter((flight) => {
    if (flight.latitude == null || flight.longitude == null) return false;
    return (
      flight.latitude >= south &&
      flight.latitude <= north &&
      flight.longitude >= west &&
      flight.longitude <= east
    );
  });
};
