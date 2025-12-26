import React, { useContext } from "react";
import { FlightsContext } from "../../Context/FlightsContext";
import { getAirlineViaCs } from "../../utils/getAirplineFromCallsign";
import { getFlightStatus } from "../../utils/getFlightStatus";

const PanelHeader = () => {
  const { selectedFlight } = useContext(FlightsContext);
  if (!selectedFlight) return null;

  const airline = getAirlineViaCs(selectedFlight);
  const flightStatus = getFlightStatus(selectedFlight);

  return (
    <div className="flex flex-col gap-3 border-b border-gray-200 pb-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          {selectedFlight.callsign}
        </h1>
        <span className="text-sm text-gray-500">
          ICAO: {selectedFlight.icao24}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {airline && (
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
            {airline}
          </span>
        )}

        <span
          className={`px-2 py-1 rounded-md text-xs font-medium
            ${
              flightStatus === "EN ROUTE"
                ? "bg-blue-100 text-blue-800"
                : flightStatus === "LANDED"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-500"
            }`}
        >
          {flightStatus}
        </span>
      </div>
    </div>
  );
};
export default PanelHeader;
