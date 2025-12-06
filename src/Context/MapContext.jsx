import { createContext } from "react";

const MapContext = createContext(null);

const MapContextProvider = ({ children }) => {
  const { data, isLoading, error } = useQuery(useFlightsQuery());

  return <MapContext.Provider>{children}</MapContext.Provider>;
};

export { MapContext, MapContextProvider };
