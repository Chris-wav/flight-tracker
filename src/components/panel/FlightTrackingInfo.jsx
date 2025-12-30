import { useContext } from "react";
import { FlightsContext } from "../../Context/FlightsContext";
import { getPositionSource } from "../../utils/getPositionSource";
import { getLastContact } from "../../utils/getLastContact";

/**
 * Displays tracking metadata for the selected flight,
 * including data source and last contact time.
 */
const FlightTrackingInfo = () => {
  const { selectedFlight } = useContext(FlightsContext);

  const positionSource = selectedFlight
    ? getPositionSource(selectedFlight.positionSource)
    : null;

  const lastContact = selectedFlight
    ? getLastContact(selectedFlight.lastContact)
    : null;

  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-lg ring-1 ring-black/5">
      <div className="mb-3">
        <span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">
          Tracking
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="block text-xs text-gray-400">ICAO24</span>
          <span className="text-sm font-semibold text-gray-800">
            {selectedFlight?.icao24 ?? "—"}
          </span>
        </div>

        <div className="text-right">
          <span className="block text-xs text-gray-400">Callsign</span>
          <span className="text-sm font-semibold text-gray-800">
            {selectedFlight?.callsign ?? "—"}
          </span>
        </div>
      </div>

      <div className="h-px bg-gray-200 my-3" />

      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-gray-500">Position source:</span>
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
          {positionSource ?? "—"}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Last contact:</span>
        <span className="text-gray-700 font-medium">
          {lastContact ?? "—"}
        </span>
      </div>
    </div>
  );
};

export default FlightTrackingInfo;
