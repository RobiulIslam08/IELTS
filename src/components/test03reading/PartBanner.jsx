// @ts-nocheck
export default function PartBanner({ title, intro }) {
  return (
    <div className="bg-[#F1F2EC] mx-4 my-2 px-4 py-2 border  rounded-xs border-gray-300 shrink-0 ">
      <div className="font-bold text-[17px]">{title}</div>
      <div className="text-[16px] mt-0.5">{intro}</div>
    </div>
  );
}
