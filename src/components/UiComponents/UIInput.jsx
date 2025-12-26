import clsx from "clsx";

const UIInput = ({
  placeholder = "",
  type = "text",
  value,
  onChange,
  onKeyUp,
  className = "",
}) => {
  const baseClasses = `
    w-full px-4 py-2
    rounded-xl
    bg-white/30 backdrop-blur-md
    border border-white/40
    shadow-sm
    focus:outline-none focus:ring-2 focus:ring-blue-300/40
    text-gray-900 placeholder-gray-600
    transition-all
  `;

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
      className={clsx(baseClasses, className)}
    />
  );
};

export default UIInput;
