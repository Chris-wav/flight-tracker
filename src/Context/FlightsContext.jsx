import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { fetchFlights, fetchRouteInfo } from "../Services/api";

const FlightsContext = createContext();

const FlightsContextProvider = ({ children }) => {
  const [selectedFlight, setSelectedFlight] = useState();
  const [selectedAirline, setSelectedAirline] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [userSpeed, setUserSpeed] = useState(100);
  const [userAltitude, setUserAltitude] = useState(2000);
  const [visibleFlightsArr, setVisibleFlightsArr] = useState([]);

  const {
    data: flights,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["flights"],
    queryFn: fetchFlights,
    staleTime: 10000,
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
  });

  const routeQuery = useQuery({
    queryKey: ["routeInfo", selectedFlight?.icao24],
    queryFn: () => fetchRouteInfo(selectedFlight.icao24),
    enabled: !!selectedFlight?.icao24,
    staleTime: Infinity,
  });
  const routeInfo = routeQuery.data;

  return (
    <FlightsContext.Provider
      value={{
        flights,
        isLoading,
        error,
        selectedFlight,
        setSelectedFlight,
        selectedAirline,
        setSelectedAirline,
        selectedRegion,
        setSelectedRegion,
        userSpeed,
        setUserSpeed,
        userAltitude,
        setUserAltitude,
        routeInfo,
        visibleFlightsArr,
        setVisibleFlightsArr,
      }}
    >
      {children}
    </FlightsContext.Provider>
  );
};

export { FlightsContext, FlightsContextProvider };
