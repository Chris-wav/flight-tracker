export const filterByAirline = (flights, selectedAirline) => {
  if (!selectedAirline) return flights;

  return flights.filter((flight) => {
    if (!flight.callsign) return false;

    return flight.callsign.trim().toUpperCase().startsWith(selectedAirline);
  });
};
