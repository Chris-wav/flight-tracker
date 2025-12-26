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
    <div className="flex w-full h-full overflow-hidden relative flex-1">
      {isFiltersOpen ? (
        <FiltersBar />
      ) : (
        <div className="absolute top-4 left-20 z-[1000]">
          <FiltersCollapsedIndicator />
        </div>
      )}

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 ">
        <Map />
        {isTableOpen ? <FlightsTableUI /> : <FlightTableClosed />}
      </div>

      {/* RIGHT PANEL */}
      {isFlightPanelOpen && (
        <div className="w-[350px] flex-shrink-0">
          <FlightPanel />
        </div>
      )}
    </div>
  );
};
export default HomeLayout;
