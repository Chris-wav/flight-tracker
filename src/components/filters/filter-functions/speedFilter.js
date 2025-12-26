export const filterBySpeed = (flights, speed) => {
  if (!speed) return flights;
  return flights.filter((flight) => {
    if (!flight.velocity) return flights;
    return flight.velocity <= speed;
  });
};

