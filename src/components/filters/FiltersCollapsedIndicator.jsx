import { useContext } from "react";
import { UIContext } from "../../Context/UIContext";

const FiltersCollapsedIndicator = () => {
  const { toggleFilters } = useContext(UIContext);
  return (
    <button
      onClick={toggleFilters}
      className="
        w-10 h-10 rounded-xl
        bg-white/80 backdrop-blur-md
        border border-slate-200 shadow
        flex items-center justify-center
        hover:bg-white transition
      "
      aria-label="Open filters"
      title="Open filters"
    >
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
      </div>
    </button>
  );
};
export default FiltersCollapsedIndicator;
