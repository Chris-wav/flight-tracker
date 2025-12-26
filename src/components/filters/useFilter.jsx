import { useContext } from "react";
import { FlightsContext } from "../../Context/FlightsContext";

export const useFilters = () => {
  const context = useContext(FlightsContext);

  return {
    region: context.selectedRegion,
    airline: context.selectedAirline,
    maxSpeed: context.userSpeed,
    maxAltitude: context.userAltitude,
  };
};
