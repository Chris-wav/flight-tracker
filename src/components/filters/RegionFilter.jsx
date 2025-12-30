import { FlightsContext } from "../../Context/FlightsContext";
import { useContext } from "react";
import { REGIONS_MAP } from "../../config/regionMap";

/**
 * Geographic region filter.
 * Updates the active region constraint.
 */
const RegionFilter = () => {
  const { setSelectedRegion } = useContext(FlightsContext);

  return (
    <>
      <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
        Region
      </h1>

      <select
        className="
          w-full px-4 py-2
          rounded-xl
          bg-white/30 backdrop-blur-md
          border border-white/40
          shadow-sm
          cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-blue-300/40
          text-gray-900
        "
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        <option value="">All regions</option>

        {Object.entries(REGIONS_MAP).map(([code, region]) => (
          <option key={code} value={code}>
            {region.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default RegionFilter;
