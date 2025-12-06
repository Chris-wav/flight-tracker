import { useContext } from "react";
import { FlightsContext } from "../Context/FlightsContext";
import { getPlaneIcon } from "../utils/getPlaneIcon";
import { Marker } from "react-leaflet";

const Markers = () => {
  const flights = useContext(FlightsContext);
  return (
    <>
      {!isLoading &&
        !error &&
        flights.map((flight, index) => {
          const position = [flight.latitude, flight.longitude];
          return (
            <Marker
              id={flight.callSign}
              key={index}
              position={position}
              icon={getPlaneIcon(flight.trueTrack)}
            />
          );
        })}
    </>
  );
};

export default Markers;
