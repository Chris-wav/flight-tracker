import { fetchFlights } from "./api";

export default function useFlightsQuery() {
  return {
    queryKey: ["flights"],
    queryFn: fetchFlights,
    refetchInterval: 30000,
    retry: 3,
  };
}
