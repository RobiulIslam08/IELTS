// @ts-nocheck
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

export default function ExamFooter({
  parts,
  groups,
  activePart,
  switchPart,
  currentQ,
  scrollToQ,
  countAnswered,
  goPrev,
  goNext,
}) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-20 h-12 overflow-visible border-t border-gray-300 bg-white">
      <div className="relative flex h-full w-full items-center">
        <div className="absolute right-3 bottom-full mb-2 z-30 flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Previous question"
            onClick={goPrev}
            className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#4a4a4a] text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)] transition-colors hover:bg-[#3f3f3f]"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Next question"
            onClick={goNext}
            className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#111111] text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)] transition-colors hover:bg-black"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="grid h-full w-full grid-cols-3 items-center">
          {parts.map((p, idx) => {
            const isActive = idx === activePart;
            const partGroups = groups[idx];

            return (
              <div
                key={p.title}
                onClick={() => switchPart(idx)}
                className={`h-full flex items-center justify-center gap-2 px-2 cursor-pointer hover:bg-gray-100 ${isActive ? "hover:bg-white" : ""
                  }`}
              >
                <span
                  className={`text-[17px] text-black  whitespace-nowrap ${isActive ? "text-black" : "text-gray-700"
                    }`}
                >
                  {p.title}
                </span>

                {isActive ? (
                  <div className="flex items-center gap-1 overflow-x-auto">
                    {partGroups.map((g) => {
                      const label = g.length > 1 ? `${g[0]}–${g[g.length - 1]}` : String(g[0]);
                      const isCur = g.includes(currentQ);
                      return (
                        <button
                          key={label}
                          onClick={(e) => { e.stopPropagation(); scrollToQ(g[0]); }}
                          className={`text-[17px] cursor-pointer hover:border hover:border-[#1a5fb4]     px-0.5 ${isCur ? "text-[#1a5fb4] border border-[#1a5fb4] rounded-[2px]" : "text-black"
                            }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-gray-500 text-[17px] whitespace-nowrap">
                    {countAnswered(idx)} of {p.end - p.start + 1}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* সাবমিট বাটনের সাইজ ও প্যাডিং কমানো */}
        <div className="flex h-full items-center border-l border-gray-300 px-3">
          <button type="button" aria-label="Submit">
            <Check className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </div>
    </footer>
  );
}