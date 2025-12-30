import { useContext } from "react";
import { FlightsContext } from "../Context/FlightsContext";
import { getPlaneIcon} from "../utils/getPlaneIcon";
import { Marker } from "react-leaflet";
import {
  getAnimatedState,
  registerMarker,
  animate,
  lastFrameTime,
} from "../animation/animationEngine";
import { useFilters } from "../components/filters/useFilter";
import { filterFinalBoss } from "../components/filters/filter-functions/filterEngine";
import { UIContext } from "../Context/UIContext";

const Markers = () => {
  const { isLoading, error, setSelectedFlight, visibleFlightsArr, flights } =
    useContext(FlightsContext);
  const { openFlightPanel } = useContext(UIContext);

  const filters = useFilters();

  if (isLoading || error) return null;

  const flightsToRender =
    visibleFlightsArr && visibleFlightsArr.length > 0
      ? visibleFlightsArr
      : flights ?? [];

  const filteredFlights = filterFinalBoss(flightsToRender, filters);

  return (
    <>
      {filteredFlights.map((flight) => {
        if (flight.latitude == null || flight.longitude == null) return null;

        const id = flight.icao24;
        const position = [flight.latitude, flight.longitude];

        return (
          <Marker
            key={id}
            position={position}
            icon={getPlaneIcon(flight.trueTrack)}
            eventHandlers={{
              click: () => {
                setSelectedFlight(flight);
                console.log(openFlightPanel);

                openFlightPanel();
              },
            }}
            ref={(marker) => {
              if (!marker) return;

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
            }}
          />
        );
      })}
    </>
  );
};

export default Markers;
