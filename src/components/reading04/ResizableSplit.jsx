// @ts-nocheck
import { useState, useRef, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";

export default function ResizableSplit({ left, right, rightColRef, className = "" }) {
  const [leftPct, setLeftPct] = useState(50);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragging = useRef(false);
  const mainRef = useRef(null);

  const onMouseDown = (e) => {
    e.preventDefault();
    dragging.current = true;
    setIsDragging(true);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current || !mainRef.current) return;
      const rect = mainRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setLeftPct(Math.max(20, Math.min(80, pct)));
    };
    const onUp = () => {
      if (dragging.current) {
        dragging.current = false;
        setIsDragging(false);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const onTouchStart = () => {
    dragging.current = true;
    setIsDragging(true);
    document.body.style.userSelect = "none";
    const move = (ev) => {
      if (!dragging.current || !mainRef.current) return;
      const rect = mainRef.current.getBoundingClientRect();
      const pct = ((ev.touches[0].clientX - rect.left) / rect.width) * 100;
      setLeftPct(Math.max(20, Math.min(80, pct)));
    };
    const end = () => {
      dragging.current = false;
      setIsDragging(false);
      document.body.style.userSelect = "";
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", end);
  };

  return (
    <main
      ref={mainRef}
      className={`flex-1 flex flex-row relative overflow-hidden min-h-0 inspera-split ${className}`}
    >
      <section
        className={`overflow-y-auto border-r min-h-0 inspera-scroll bg-[#fdfdfd] transition-colors duration-150 ${isHovering || isDragging ? "border-r-[#1a5fb4]" : "border-r-gray-300"
          }`}
        style={{ width: `${leftPct}%` }}
      >
        <div className="px-4  py-9">{left}</div>
      </section>

      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="absolute top-0 bottom-0 z-10 flex items-center justify-start cursor-col-resize touch-none inspera-resize"
        style={{ left: `${leftPct}%`, width: 24 }}
      >
        <div
          className={`flex items-center justify-center w-[20px] h-[30px] border border-1 bg-white shadow-sm transition-colors mb-10  duration-150 rounded-[2px] ${isHovering || isDragging
            ? "border-[#1a5fb4] bg-blue-50/10"
            : "border-gray-500"
            }`}
        >
          <ArrowLeftRight
            className={`h-[12px] w-[12px] transition-colors duration-150 ${isHovering || isDragging ? "text-[#1a5fb4] stroke-[2.5]" : "text-gray-800 stroke-[2]"
              }`}
          />
        </div>
      </div>

      <section
        ref={rightColRef}
        className="overflow-y-auto min-h-0 inspera-scroll"
        style={{ width: `${100 - leftPct}%` }}
      >
        <div className="px-4  py-9 ">{right}</div>
      </section>
    </main>
  );
}

