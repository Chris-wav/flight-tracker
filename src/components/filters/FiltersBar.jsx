import SearchBar from "./SearchBar";
import AirLineFilter from "./AirLineFilter";
import LineBreak from "../UiComponents/LineBreak";
import RegionFilter from "./RegionFilter";
import AltitudeFilter from "./AltitudeFilter";
import SpeedFilter from "./SpeedFilter";
import FlightTrackerLogo from "./FlightTrackerLogo";
import { useContext } from "react";
import { UIContext } from "../../Context/UIContext";

const FiltersBar = () => {
  const { toggleFilters } = useContext(UIContext);
  return (
    <div
      className="
        w-[380px]
        p-6
        flex flex-col
        space-y-6
        bg-white/60
        backdrop-blur-xl
        border-r border-gray-300/40
        overflow-y-auto
        relative
        z-[999]
      "
    >
      {/* Collapse button (UI only) */}
      <button
        className="
          absolute top-4 right-4
          w-9 h-9
          rounded-full
          flex items-center justify-center
          bg-white/70
          backdrop-blur
          border border-gray-200
          text-gray-500
          hover:text-gray-800
          hover:bg-white
          shadow
          transition
          select-none
        "
        aria-label="Collapse filters"
        title="Collapse filters"
        onClick={toggleFilters}
      >
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
        </div>
      </button>

      <FlightTrackerLogo />
      <SearchBar className="pb-4" />
      <LineBreak />

      <AirLineFilter />
      <LineBreak />

      <RegionFilter />
      <LineBreak />

      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
          More Filters
        </h1>

        <AltitudeFilter />
        <LineBreak />

        <SpeedFilter />
        <LineBreak />
      </div>
    </div>
  );
};

export default FiltersBar;
