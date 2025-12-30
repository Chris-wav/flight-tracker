import { useContext, useState, useMemo } from "react";
import { FlightsContext } from "../../Context/FlightsContext";
import { UIContext } from "../../Context/UIContext";
import { getDirection } from "../../utils/getDirection";

/**
 * Interactive flights table.
 * Supports client-side sorting and responsive density.
 */
const FlightsTableUI = () => {
  const { visibleFlightsArr } = useContext(FlightsContext);
  const { closeTable } = useContext(UIContext);

  const [sortingCol, setSortingCol] = useState("");
  const [sortingDirection, setSortingDirection] = useState("");

  // Cycle sorting state: none → asc → desc → none
  const handleSort = (col) => {
    if (sortingCol !== col) {
      setSortingCol(col);
      setSortingDirection("asc");
      return;
    }

    if (sortingDirection === "") {
      setSortingDirection("asc");
    } else if (sortingDirection === "asc") {
      setSortingDirection("desc");
    } else {
      setSortingCol("");
      setSortingDirection("");
    }
  };

  // Memoized client-side sorting for visible flights only
  const tableFlights = useMemo(() => {
    if (!sortingCol || sortingDirection === "") {
      return visibleFlightsArr;
    }

    return [...visibleFlightsArr].sort((a, b) => {
      const A = a[sortingCol];
      const B = b[sortingCol];

      if (A == null && B == null) return 0;
      if (A == null) return 1;
      if (B == null) return -1;

      if (typeof A === "number" && typeof B === "number") {
        return sortingDirection === "asc" ? A - B : B - A;
      }

      return sortingDirection === "asc"
        ? String(A).localeCompare(String(B))
        : String(B).localeCompare(String(A));
    });
  }, [visibleFlightsArr, sortingCol, sortingDirection]);

  const renderSortArrow = (col) => {
    if (sortingCol !== col || sortingDirection === "") return null;

    return (
      <span
        className={`ml-1 text-xs font-semibold ${
          sortingDirection === "asc" ? "text-green-600" : "text-red-600"
        }`}
      >
        {sortingDirection === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  const getHeaderClass = (col) =>
    `px-6 py-3 cursor-pointer select-none transition-colors ${
      sortingCol === col && sortingDirection !== ""
        ? sortingDirection === "asc"
          ? "bg-green-50 text-green-700"
          : "bg-red-50 text-red-700"
        : ""
    }`;

  return (
    <div
      className="
        bottom-0 left-0 right-0 w-full
        h-[420px] md:h-[360px] lg:h-[480px]
        bg-white border-t border-slate-200
        rounded-xl shadow-2xl
        flex flex-col overflow-hidden
      "
    >
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white">
        <h2 className="text-lg font-semibold text-slate-800">Live Flights</h2>

        <div className="text-sm text-slate-500">
          Showing {tableFlights.length} aircraft
        </div>

        <button
          onClick={closeTable}
          className="
            w-8 h-8
            flex items-center justify-center
            rounded-full
            text-slate-500
            hover:text-slate-800
            hover:bg-slate-200
            transition
            text-lg
          "
          aria-label="Close table"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-white">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="sticky top-0 bg-slate-100 border-b border-slate-200 text-slate-600">
            <tr>
              <th
                className={getHeaderClass("icao24")}
                onClick={() => handleSort("icao24")}
              >
                ICAO24
                {renderSortArrow("icao24")}
              </th>

              <th
                className={getHeaderClass("callsign")}
                onClick={() => handleSort("callsign")}
              >
                Callsign
                {renderSortArrow("callsign")}
              </th>

              <th
                className={getHeaderClass("originCountry")}
                onClick={() => handleSort("originCountry")}
              >
                Country
                {renderSortArrow("originCountry")}
              </th>

              <th
                className={getHeaderClass("baro_altitude")}
                onClick={() => handleSort("baro_altitude")}
              >
                Altitude (m)
                {renderSortArrow("baro_altitude")}
              </th>

              <th
                className={getHeaderClass("velocity")}
                onClick={() => handleSort("velocity")}
              >
                Speed (km/h)
                {renderSortArrow("velocity")}
              </th>

              <th className="px-6 py-3">Heading</th>
              <th className="px-6 py-3">On Ground</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {tableFlights.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-6 text-center text-slate-500"
                >
                  No flights visible in current viewport
                </td>
              </tr>
            )}

            {tableFlights.map((flight) => {
              const direction = getDirection(flight.trueTrack);

              return (
                <tr
                  key={flight.icao24}
                  className="hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-3 font-mono">
                    {flight.icao24 || "—"}
                  </td>
                  <td className="px-6 py-3">{flight.callsign || "—"}</td>
                  <td className="px-6 py-3">{flight.originCountry || "—"}</td>
                  <td className="px-6 py-3">
                    {flight.baro_altitude != null
                      ? Math.round(flight.baro_altitude)
                      : "—"}
                  </td>
                  <td className="px-6 py-3">
                    {flight.velocity != null
                      ? Math.round(flight.velocity)
                      : "—"}
                  </td>
                  <td className="px-6 py-3 text-blue-600">{direction}</td>
                  <td
                    className={`px-6 py-3 font-medium ${
                      flight.on_ground ? "text-slate-500" : "text-green-600"
                    }`}
                  >
                    {flight.on_ground ? "Yes" : "No"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightsTableUI;
