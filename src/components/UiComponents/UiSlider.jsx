import React from "react";
import clsx from "clsx";

const UISlider = ({
  min = 0,
  max = 80000,
  step = 1,
  value,
  onChange,
  label,
  className,
  
}) => {
  return (
    <div className={clsx("flex flex-col gap-2 w-full", className)}>
      {label && (
        <label className="text-gray-800 font-semibold tracking-tight">
          {label}: <span className="font-normal">{value}</span>
        </label>
      )}

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          w-full h-2 rounded-full appearance-none cursor-pointer
          bg-gray-300/50"
      />
    </div>
  );
};

export default UISlider;
