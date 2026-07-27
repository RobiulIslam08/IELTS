// @ts-nocheck
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

export default function ExamFooter({
  parts,
  activePart,
  switchPart,
  answeredStatus,
  goPrev,
  goNext,
}) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-20 h-12 overflow-visible border-t border-gray-300 bg-white">
      <div className="relative flex h-full w-full items-center">
        <div className="absolute right-3 bottom-full mb-2 z-30 flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Previous part"
            onClick={goPrev}
            className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#4a4a4a] text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)] transition-colors hover:bg-[#3f3f3f]"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Next part"
            onClick={goNext}
            className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#111111] text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)] transition-colors hover:bg-black"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="grid h-full w-full grid-cols-2 items-center">
          {parts.map((p, idx) => {
            const isActive = idx === activePart;

            return (
              <div
                key={p.title}
                onClick={() => switchPart(idx)}
                className={`h-full flex items-center justify-center gap-2 px-2 cursor-pointer hover:bg-gray-100 ${isActive ? "hover:bg-white" : ""
                  }`}
              >
                <span
                  className={`text-[17px] whitespace-nowrap ${isActive ? "text-black font-medium" : "text-gray-700"
                    }`}
                >
                  {p.title}
                </span>

                {!isActive && (
                  <span className="text-gray-500 text-[17px] whitespace-nowrap">
                    {answeredStatus(idx)} of 1
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit button */}
        <div className="flex h-full items-center border-l border-gray-300 px-3">
          <button type="button" aria-label="Submit">
            <Check className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </div>
    </footer>
  );
}
