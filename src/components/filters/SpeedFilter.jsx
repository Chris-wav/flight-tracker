import { useContext } from "react";
import UISlider from "../UiComponents/UiSlider";
import { FlightsContext } from "../../Context/FlightsContext";

/**
 * Speed range filter.
 * Controls max allowed aircraft speed.
 */
const SpeedFilter = () => {
  const { userSpeed, setUserSpeed } = useContext(FlightsContext);

  return (
    <div className="flex flex-col w-full p-4 gap-2">
      <UISlider
        label="Speed"
        min={0}
        max={600}
        step={10}
        value={userSpeed}
        onChange={(value) => setUserSpeed(value)}
      />
    </div>
  );
};

export default SpeedFilter;
