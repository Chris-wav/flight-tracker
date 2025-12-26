import React, { useContext, useState } from "react";
import UIInput from "../UiComponents/UIInput";
import { searchFlight } from "./filter-functions/searchFLight";
import { FlightsContext } from "../../Context/FlightsContext";

const SearchBar = () => {
  const { setSelectedFlight, flights } = useContext(FlightsContext);
  const [localInputValue, setLocalInputValue] = useState("");
  return (
    <div className="flex flex-col w-[100%]  p-4 gap-2 ">
      <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
        Search Flights
      </h1>

      <UIInput
        value={localInputValue}
        placeholder="Search Flights..."
        onChange={(e) => {
          setLocalInputValue(e.target.value);

          if (e.target.value === "") {
            setSelectedFlight(null);
            return;
          }
        }}
        onKeyUp={(e) => {
          if (e.key !== "Enter") {
            return;
          }
          if (localInputValue.trim() === "") {
            setSelectedFlight(null);
            return;
          }
          if (e.key === "Enter") {
            if (localInputValue) {
              const searchedFlight = searchFlight(flights, localInputValue);
              searchedFlight
                ? setSelectedFlight(searchedFlight)
                : setSelectedFlight(null);
            }
            setLocalInputValue("");
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
