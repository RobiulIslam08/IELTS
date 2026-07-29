// @ts-nocheck
// Inspera-style checkbox: magenta fill when checked, light pink row bg.
export default function CheckboxRow({ label, checked, onToggle }) {
  return (
    <label
      className={`relative flex items-center gap-2 px-3 py-[10px] cursor-pointer text-[17px] leading-tight mb-1 transition-colors duration-150 ${
        checked ? "bg-[#BBD8F0] " : "hover:bg-gray-50 border-l-[3px] border-transparent"
      }`}
    >
      <input
        type="checkbox"
        className="w-[13px] h-[13px] cursor-pointer mt-px accent-[BBD8F0]"
        checked={checked}
        onChange={onToggle}
      />
      <span>{label}</span>
    </label>
  );
}
