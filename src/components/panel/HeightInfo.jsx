import { useContext } from "react";
import { FlightsContext } from "../../Context/FlightsContext";
import { getVerticalRate } from "../../utils/getVerticalStatus";
import { getVerticalArrow } from "../../utils/getVerticalStatusArrow";

/**
 * Displays vertical movement status (climb / descent / level),
 * including rate and SPI indicator.
 */
const HeightInfo = () => {
  const { selectedFlight } = useContext(FlightsContext);

  const verticalStatus = selectedFlight
    ? getVerticalRate(selectedFlight.verticalRate)
    : null;

  const verticalArrow = selectedFlight
    ? getVerticalArrow(selectedFlight.verticalRate)
    : null;

  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-lg ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <span className="text-lg">{verticalArrow ?? "—"}</span>
          <span className="uppercase tracking-wide">
            {verticalStatus ?? "—"}
          </span>
        </div>

        <div
          className={`
            px-2 py-1 rounded-full text-xs font-semibold
            ${
              selectedFlight?.spi
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-400"
            }
          `}
        >
          SPI {selectedFlight?.spi ? "ON" : "OFF"}
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        <span className="font-medium text-gray-800">
          {selectedFlight?.verticalRate ?? "—"}
        </span>
        <span className="ml-1 text-gray-400">ft/min</span>
      </div>
    </div>
  );
};

export default HeightInfo;
