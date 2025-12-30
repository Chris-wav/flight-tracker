import UISlider from "../UiComponents/UiSlider";
import { FlightsContext } from "../../Context/FlightsContext";
import { useContext } from "react";

/**
 * Altitude range filter.
 * Controls max allowed aircraft altitude.
 */
const AltitudeFilter = () => {
  const { userAltitude, setUserAltitude } = useContext(FlightsContext);

  return (
    <div className="flex flex-col w-full p-4 gap-2">
      <UISlider
        label="Altitude"
        min={0}
        max={70000}
        step={500}
        value={userAltitude}
        onChange={(value) => setUserAltitude(value)}
      />
    </div>
  );
};

export default AltitudeFilter;
