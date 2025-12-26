import React, { useContext } from "react";
import { FlightsContext } from "../../Context/FlightsContext";
import { getHeading } from "../../utils/getHeading";
import { getDirection } from "../../utils/getDirection";

const FlightGeneralInfo = () => {
  const { selectedFlight } = useContext(FlightsContext);
  const heading = selectedFlight ? getHeading(selectedFlight.trueTrack) : null;
  const direction = selectedFlight
    ? getDirection(selectedFlight.trueTrack)
    : null;

  return (
    <div className="flex gap-4 w-full justify-between">
      <div className="flex flex-col items-center justify-center flex-1 bg-white rounded-xl p-4 shadow-lg ring-1 ring-black/5">
        <span className="text-xs font-semibold text-gray-500 tracking-wide ">
          ALT
        </span>
        <span className="text-2xl font-bold text-gray-800">
          {selectedFlight?.geoAltitude ?? "—"}
        </span>
        <span className="text-xs text-gray-400">ft</span>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 bg-white rounded-xl p-4 shadow-lg ring-1 ring-black/5">
        <span className="text-xs font-semibold text-gray-500 tracking-wide ">
          SPD
        </span>
        <span className="text-2xl font-bold text-gray-800">
          {selectedFlight?.velocity ?? "—"}
        </span>
        <span className="text-xs text-gray-400">km/h</span>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 bg-white rounded-xl p-4 shadow-lg ring-1 ring-black/5">
        <span className="text-xs font-semibold text-gray-500 tracking-wide">
          HDG
        </span>
        <span className="text-2xl font-bold text-gray-800">
          {heading ?? "—"}
        </span>
        <span className="text-xs text-gray-400">{direction}</span>
      </div>
    </div>
  );
};

export default FlightGeneralInfo;
