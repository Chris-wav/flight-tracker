import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapLogic from "./MapLogic";
import Markers from "./Markers";

const Map = () => {
  return (
    <MapContainer
      className="h-full w-full"
      center={[37.9, 23.7]}
      zoom={5}
      minZoom={2}
      scrollWheelZoom={true}
      updateWhenIdle={true}
    >
      <TileLayer
        url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        keepBuffer={4}
      />
      <MapLogic />
      <Markers />{" "}
    </MapContainer>
  );
};

export default Map;
