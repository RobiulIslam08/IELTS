// @ts-nocheck
import { Wifi, Bell, Menu, FileEdit } from "lucide-react";

export default function ExamHeader({ timeLeft = 60 * 60 }) {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const isLowTime = timeLeft <= 60;

  return (
    <header className="flex items-center justify-between px-4 py-3 shrink-0 mb-2 border-b border-gray-300">
      <div className="flex items-center gap-8">
        <div className="flex items-center font-black">
          <img className="object-contain w-[92px]" src="/ielts.svg" alt="IELTS" />
        </div>

        <div className="grid gap-2 content-center justify-items-start text-[17px] -mt-5 text-black font-semibold">
          <span>Test taker ID</span>
        </div>

        <div className="text-[17px] text-black font-bold ml-2">
          Time left:{" "}
          <span className={`font-black ${isLowTime ? "text-rose-600 animate-pulse" : "text-gray-800"}`}>
            {minutes}:{seconds}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <Wifi className="h-7 w-7" />
        <Bell className="h-7 w-7" />
        <Menu className="h-7 w-7" />
        <FileEdit className="h-7 w-7" />
      </div>
    </header>
  );
}
