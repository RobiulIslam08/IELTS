// @ts-nocheck
export default function PartBanner({ title, intro }) {
  return (
    <div className="bg-[#F1F2EC] mx-4 mt-8 mb-4 px-4 py-3 border border-gray-300 rounded-sm">
      <div className="font-semibold text-[17px] text-black">{title}</div>
      <div className="text-[16px] text-black mt-1">{intro}</div>
    </div>
  );
}
