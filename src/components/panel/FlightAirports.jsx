import React, { useContext, useEffect } from "react";
import { FlightsContext } from "../../Context/FlightsContext";

const FlightAirports = () => {
  const { routeInfo } = useContext(FlightsContext);
  useEffect(() => {
    console.log(routeInfo);
  }, [routeInfo]);
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-xl flex flex-col gap-4 shadow-lg ring-1 ring-black/5">
      <div className="flex justify-between text-sm font-semibold text-gray-700 ">
        {!routeInfo ? (
          <div className="p-4 text-sm text-gray-500">Loading route…</div>
        ) : (
          <>
            <span>{routeInfo.arrival}</span>
            <span className="mx-3 text-l font-bold text-gray-500">→</span>
            <span>{routeInfo.departure ?? "UNKNOWN"}</span>
          </>
        )}
      </div>

      <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-1/3 bg-blue-400 rounded-full" />

        <div
          className="
            absolute top-1/2 left-1/3
            -translate-x-1/2 -translate-y-1/2
            bg-white rounded-full p-1 shadow
          "
        >
          ✈️
        </div>
      </div>
    </div>
  );
};

export default FlightAirports;
