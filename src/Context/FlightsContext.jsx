import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import useFlightsQuery from "../Services/useFlightsQuery";

const FlightsContext = createContext(); //creates a context objext

const FlightsContextProvider = ({ children }) => {
  const { data, isLoading, error } = useQuery(useFlightsQuery());

  return (
    <FlightsContext.Provider value={{ flights: data, isLoading, error }}>
      {children}
    </FlightsContext.Provider>
  );
};

export { FlightsContext, FlightsContextProvider };
