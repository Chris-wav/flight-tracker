import { fetchFlights } from "./api";

/**
 * React Query configuration for live flights polling.
 */
export default function useFlightsQuery() {
  return {
    queryKey: ["flights"],
    queryFn: fetchFlights,
    refetchInterval: 30000,
    retry: 3,
  };
}


export default function useFlightsQuery() {
  return {
    queryKey: ["flights"],
    queryFn: fetchFlights,
    refetchInterval: 30000,
    retry: 3,
  };
}
