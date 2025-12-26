import { AIRLINE_MAP } from "../config/airlineMap";

export const getAirlineViaCs = (selectedFlight) => {
  if (!selectedFlight) return null;
  return AIRLINE_MAP[selectedFlight.callsign?.trim().slice(0, 3)];
};
