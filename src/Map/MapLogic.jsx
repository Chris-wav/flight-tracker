import React from "react";
import { useMap } from "react-leaflet";

const MapLogic = () => {
  const map = useMap();
  console.log("map center", map.getCenter());
  return null
};

export default MapLogic;
