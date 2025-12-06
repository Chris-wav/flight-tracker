import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useFlightsQuery from "../Services/useFlightsQuery";
import PreviousMap_ from "postcss/lib/previous-map";

const FlightsContext = createContext(); //creates a context objext

const FlightsContextProvider = ({ children }) => {
  const { data, isLoading, error } = useQuery(useFlightsQuery());
  const [flights] = useState([]);

  return (
    <FlightsContext.Provider value={data}>{children}</FlightsContext.Provider>
  );
};

export { FlightsContext, FlightsContextProvider };
