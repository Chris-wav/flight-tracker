import { useContext } from "react";
import { FlightsContext } from "../Context/FlightsContext";
import { getPlaneIcon } from "../utils/getPlaneIcon";
import { Marker } from "react-leaflet";
import {
  getAnimatedState,
  registerMarker,
  animate,
  lastFrameTime,
} from "../animation/animationEngine";

const Markers = () => {
  const markersMap = {};

  const { flights, isLoading, error } = useContext(FlightsContext);

  if (isLoading || error || !flights) return null;
  return (
    <>
      {flights.map((flight) => {
        const position = [flight.latitude, flight.longitude];
        const id = flight.icao24;

        // 🔥 Update existing icon on each render
        if (lastFrameTime[id]) {
          const marker = markersMap[id];
          if (marker) marker.setIcon(getPlaneIcon(flight.trueTrack));
        }

        return (
          <Marker
            key={flight.icao24}
            ref={(marker) => {
              console.log("START ANIMATE FOR:", id);
              console.log(flight);

              if (flight.longitude == null) {
                console.error("FLIGHT HAS NO LONG", flight);
                return;
              }

              if (marker) {
                if (!lastFrameTime[id]) {
                  registerMarker(marker, id);
                  getAnimatedState(
                    id,
                    flight.latitude,
                    flight.longitude,
                    flight.trueTrack,
                    flight.velocity,
                    performance.now()
                  );

                  lastFrameTime[id] = performance.now();
                  animate(id);
                }
              }
            }}
            position={position}
            icon={getPlaneIcon(flight.trueTrack)}
          />
        );
      })}
    </>
  );
};

export default Markers;
