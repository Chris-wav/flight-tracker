import { useContext } from "react";
import { UIContext } from "../../Context/UIContext";

const FlightTableClosed = () => {
  const { openTable } = useContext(UIContext);
  return (
    <div
      className="
        absolute bottom-0 left-0 right-0
        h-[60px]
        z-[1000]
        pointer-events-auto
        flex items-center justify-center
        cursor-pointer
        group
        bg-white
      "
    >
      <div
        className="
          bg-white/80
          backdrop-white
          border border-slate-200
          shadow-lg
          rounded-xl
          px-2 py-2
          flex items-center gap-3
          transition-all duration-200
          hover:bg-white
          hover:shadow-xl
        "
        onClick={openTable}
      >
        <span className="text-sm font-medium text-slate-500 group-hover:text-slate-900">
          Open flights table
        </span>

        <span
          className="
            text-lg text-slate-400
            transition-transform duration-200
            group-hover:-translate-y-1
            group-hover:text-slate-600
          "
        >
          ▲
        </span>
      </div>
    </div>
  );
};

export default FlightTableClosed;
