// @ts-nocheck
import { Wifi, Bell, Menu, SquarePen } from "lucide-react";
import { FaVolumeHigh } from "react-icons/fa6";

export default function ExamHeader({ timeLeft = 32 * 60 }) {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const isLowTime = timeLeft <= 60;

  return (
    <header className="flex items-center justify-between px-4 py-2 shrink-0 border-b border-gray-300 bg-white h-[60px]">
      <div className="flex items-center gap-4 h-full">
        <div className="flex items-center font-black h-full">
          <img className="w-20 object-contain md:w-[96px] mr-2" src="/ielts.svg" alt="IELTS" />
        </div>

        <div className="flex flex-col justify-center text-black">
          <span className="text-[17px] font-semibold leading-tight">Test taker ID</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <FaVolumeHigh className="h-3 w-3" />
            <span className="text-[14px] font-black font-semibold">Audio is Playing</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 text-gray-700">
        <div className={`whitespace-nowrap text-[20px] font-bold ${isLowTime ? "text-rose-600" : "text-[#333333]"}`}>
          Time Remaining: {minutes}:{seconds}
        </div>
        <Wifi className="h-5 w-5" strokeWidth={2.5} />
        <Bell className="h-5 w-5" strokeWidth={2.5} />
        <Menu className="h-5 w-5" strokeWidth={2.5} />
        <SquarePen className="h-5 w-5" strokeWidth={2.5} />
      </div>
    </header>
  );
}
