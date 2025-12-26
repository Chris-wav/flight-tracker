export const filterByAltitude = (flights, altitude) => {
  if (!altitude) return flights;

  return flights.filter((flight) => {
    if (flight.baroAltitude == null) return false;

    return flight.baroAltitude <= altitude;
  });
};
