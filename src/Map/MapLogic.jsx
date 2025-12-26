import { useContext, useEffect } from "react";
import { useMap } from "react-leaflet";
import { FlightsContext } from "../Context/FlightsContext";
import { setVisibleFlights } from "../utils/setVisibleFlights";

const MapLogic = () => {
  const { selectedFlight, flights, setVisibleFlightsArr, visibleFlightsArr } =
    useContext(FlightsContext);

  const map = useMap();
  useEffect(() => {
    if (!map) return;

    const handleMoveEnd = () => {
      const bounds = map.getBounds();
      const visibleFlights = setVisibleFlights(flights, bounds);
      setVisibleFlightsArr(visibleFlights);
    };

    map.addEventListener("moveend", handleMoveEnd);
    console.log(flights);
    console.log("visible flights: ", visibleFlightsArr);

    return () => {
      map.removeEventListener("moveend", handleMoveEnd);
    };
  }, [map, flights, setVisibleFlightsArr, visibleFlightsArr]);

  useEffect(() => {
    if (!selectedFlight) return;

    const { latitude, longitude } = selectedFlight;

    if (latitude != null && longitude != null) {
      map.flyTo([latitude, longitude], 10);
    }
  }, [selectedFlight, map]);

  return null;
};

export default MapLogic;
