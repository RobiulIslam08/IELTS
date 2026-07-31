// @ts-nocheck
// Inspera-style radio option row
export default function RadioRow({ name, value, label, selected, onSelect }) {
  const isSel = selected === value;
  return (
    <label
      className={`relative flex items-center gap-2 pl-3 pr-3 py-[10px] cursor-pointer text-[17px] leading-tight mb-1 transition-colors duration-150 ${
        isSel ? "bg-[#cfe0f5] " : "hover:bg-gray-50 border-l-[3px] border-transparent"
      }`}
    >
      <input
        type="radio"
        name={name}
        className="w-[10px] h-[10px] cursor-pointer mt-px accent-[#1a5fb4]"
        checked={isSel}
        onChange={() => onSelect(value)}
      />
      <span>{label}</span>
    </label>
  );
}
