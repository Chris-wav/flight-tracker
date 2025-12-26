import { filterByAirline } from "./airlineFilter";
import { filterByAltitude } from "./altitudeFilter";
import { filterByRegion } from "./regionFilter";
import { filterBySpeed } from "./speedFilter";

export const filterFinalBoss = (flights, filters) => {
  let result = flights;

  result = filterByRegion(result, filters.region);
  result = filterByAltitude(result, filters.maxAltitude);
  result = filterBySpeed(result, filters.maxSpeed);
  result = filterByAirline(result, filters.airline);

  return result;
};
