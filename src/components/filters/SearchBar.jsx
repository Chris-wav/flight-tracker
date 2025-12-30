import { useContext, useState } from "react";
import UIInput from "../UiComponents/UIInput";
import { searchFlight } from "./filter-functions/searchFLight";
import { FlightsContext } from "../../Context/FlightsContext";

/**
 * Flight search input.
 * Performs client-side lookup and updates selected flight on submit.
 */
const SearchBar = () => {
  const { setSelectedFlight, flights } = useContext(FlightsContext);
  const [localInputValue, setLocalInputValue] = useState("");

  return (
    <div className="flex flex-col w-full p-4 gap-2">
      <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
        Search Flights
      </h1>

      <UIInput
        value={localInputValue}
        placeholder="Search Flights..."
        onChange={(e) => {
          const value = e.target.value;
          setLocalInputValue(value);

          // Clear selection when input is emptied
          if (value === "") {
            setSelectedFlight(null);
          }
        }}
        onKeyUp={(e) => {
          if (e.key !== "Enter") return;

          const query = localInputValue.trim();
          if (query === "") {
            setSelectedFlight(null);
            return;
          }

          const searchedFlight = searchFlight(flights, query);
          setSelectedFlight(searchedFlight ?? null);

          // Reset input after search
          setLocalInputValue("");
        }}
      />
    </div>
  );
};

export default SearchBar;
