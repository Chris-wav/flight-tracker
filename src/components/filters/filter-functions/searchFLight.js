export function searchFlight(flights, userCallsign) {
  return flights.find((f) => f.callsign === userCallsign.toUpperCase().trim());
}
