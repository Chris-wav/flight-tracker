import { useContext } from "react";
import { FlightsContext } from "../../Context/FlightsContext";

/**
 * Convenience hook that exposes the active filter values
 * in a normalized shape.
 */
export const useFilters = () => {
  const context = useContext(FlightsContext);

  return {
    region: context.selectedRegion,
    airline: context.selectedAirline,
    maxSpeed: context.userSpeed,
    maxAltitude: context.userAltitude,
  };
};
