import { useContext } from "react";
import { UIContext } from "../../Context/UIContext";
import PanelHeader from "./PanelHeader";
import FlightGeneralInfo from "./FlightGeneralInfo";
import HeightInfo from "./HeightInfo";
import FlightTrackingInfo from "./FlightTrackingInfo";

/**
 * Main flight details panel.
 * Displays detailed information for the selected aircraft.
 */
const FlightPanel = () => {
  const { closeFlightPanel } = useContext(UIContext);

  return (
    <div
      className="
        min-w-0
        h-full
        w-full
        p-6
        flex flex-col
        gap-6
        bg-white/60
        backdrop-blur-xl
        border-l border-gray-300/40
        overflow-y-auto
        relative
      "
    >
      <button
        onClick={closeFlightPanel}
        className="
          absolute top-4 right-4
          w-9 h-9
          flex items-center justify-center
          rounded-full
          bg-white/70
          hover:bg-white
          text-gray-600
          hover:text-gray-900
          shadow
          transition
        "
        aria-label="Close panel"
      >
        ✕
      </button>

      <PanelHeader />
      <FlightGeneralInfo />
      <HeightInfo />
      <FlightTrackingInfo />
    </div>
  );
};

export default FlightPanel;
