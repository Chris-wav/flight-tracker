const FlightTrackerLogo = ({ compact = false }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Logo mark */}
      <div
        className="
          h-10 w-10
          rounded-2xl
          bg-gradient-to-br
          from-sky-100 via-blue-100 to-indigo-100
          flex items-center justify-center
          shadow-sm
          ring-1 ring-black/5
        "
      >
        <span className="text-sky-600 text-lg">✈︎</span>
      </div>

      {/* Wordmark */}
      {!compact && (
        <div className="leading-tight">
          <div className="text-slate-800 font-semibold tracking-tight">
            Flight Tracker
          </div>
          <div className="text-xs text-slate-500">Live aircraft view</div>
        </div>
      )}
    </div>
  );
};

export default FlightTrackerLogo;
