import { AIRLINE_MAP } from "../../config/airlineMap";
import { useContext } from "react";
import { FlightsContext } from "../../Context/FlightsContext";

/**
 * Airline selection filter.
 * Updates global filter state via context.
 */
const AirLineFilter = () => {
  const { setSelectedAirline } = useContext(FlightsContext);

  return (
    <div className="flex flex-col w-full p-4 gap-2">
      <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
        Airlines
      </h1>

      <select
        onChange={(e) => setSelectedAirline(e.target.value)}
        className="
          w-full rounded-md border border-gray-300
          px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      >
        <option value="">All Airlines</option>

        {Object.entries(AIRLINE_MAP).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AirLineFilter;
