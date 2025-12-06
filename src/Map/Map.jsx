import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import MapLogic from "./MapLogic";
const planeIconURL = "/airplane.svg";


const Map = ({ flights }) => {
  const markersRef = useRef([]);

  const positionsRef = useRef([]);

  const previousTimestampRef = useRef(null);

  useEffect(() => {
    console.log(map);
    if (!map || !flights) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    positionsRef.current = [];

    // create new markers for each flight


    previousTimestampRef.current = null;
  }, [flights]);

  // ----------- ANIMATION LOOP -----------
  useEffect(() => {
    if (!flights || flights.length === 0) return;
    console.log("Flights:", flights);
    console.log("Flights length:", flights?.length);

    let frameId;

    const animate = (timestamp) => {
      if (previousTimestampRef.current == null) {
        previousTimestampRef.current = timestamp;
        frameId = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = (timestamp - previousTimestampRef.current) / 1000;
      previousTimestampRef.current = timestamp;

      flights.forEach((flight, index) => {
        const marker = markersRef.current[index];
        if (!marker) return;

        const pos = positionsRef.current[index];

        const { newLat, newLon } = movementModeling(
          flight.trueTrack,
          flight.velocity,
          pos.lat,
          pos.lon,
          deltaTime
        );

        positionsRef.current[index] = { lat: newLat, lon: newLon };

        marker.setLatLng([newLat, newLon]);
        marker.setIcon(getPlaneIcon(flight.trueTrack));
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [flights]);

  return (
    <MapContainer
      className="h-full w-full"
      center={[37.9, 23.7]}
      zoom={5}
      minZoom={2}
      scrollWheelZoom={true}
    >
      <MapLogic />
      <TileLayer url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

export default Map;
