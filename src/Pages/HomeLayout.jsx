import { useContext } from "react";
import { UIContext } from "../Context/UIContext";
import Map from "../Map/Map";
import FiltersBar from "../components/filters/FiltersBar";
import FlightPanel from "../components/panel/FlightPanel";
import FlightsTableUI from "../components/flights-table/FlightsTableUI";
import FlightTableClosed from "../components/flights-table/FlightTableClosed";
import FiltersCollapsedIndicator from "../components/filters/FiltersCollapsedIndicator";

const HomeLayout = () => {
  const { isFlightPanelOpen, isTableOpen, isFiltersOpen } =
    useContext(UIContext);

  return (
    <div className="flex w-full h-[100dvh] overflow-hidden relative">
      {/* FILTERS */}
      {isFiltersOpen && (
        <div className="absolute inset-0 z-[1000] lg:static lg:inset-auto">
          <FiltersBar />
        </div>
      )}

      {!isFiltersOpen && (
        <div
          className="absolute
        top-4
        left-14
        z-[1000]"
        >
          <FiltersCollapsedIndicator />
        </div>
      )}

      {/* MAIN */}
      <div className="flex flex-col flex-1 relative">
        <Map />

        <div className="hidden lg:block">
          {isTableOpen ? <FlightsTableUI /> : <FlightTableClosed />}
        </div>
      </div>

      {/* RIGHT PANEL */}
      {isFlightPanelOpen && (
        <div className="absolute inset-0 z-[1100] bg-white lg:static lg:w-[350px] lg:bg-transparent">
          <FlightPanel />
        </div>
      )}
    </div>
  );
};

export default HomeLayout;
