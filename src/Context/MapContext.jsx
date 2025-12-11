import { createContext, useState } from "react";

const MapContext = createContext(null);

const MapContextProvider = ({ children }) => {
  const [map, setMap] = useState(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
};

export { MapContext, MapContextProvider };
