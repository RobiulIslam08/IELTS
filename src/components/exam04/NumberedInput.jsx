// @ts-nocheck
import { useState } from "react";

// Reusable input field: shows question number centered inside the box when empty.
export default function NumberedInput({ num, answers, setAnswer, qRefs, currentQ, setCurrentQ, width = 140 }) {
  const key = String(num);
  const value = answers[key] || "";
  const [isFocused, setIsFocused] = useState(false);
  
  const isCurrent = currentQ === num;

  return (
    <span
      className="relative inline-block align-middle mx-1 my-0.5"
      style={{ width }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setAnswer(key, e.target.value)}
        onFocus={() => {
          setIsFocused(true);
          if (setCurrentQ) setCurrentQ(num);
        }}
        onBlur={() => setIsFocused(false)}
        className={`w-full h-[20px] border bg-white px-2 text-[17px] focus:outline-none focus:border-[#1a5fb4] focus:border-2 ${(isFocused || value) ? "text-left" : "text-center"} ${isCurrent && !isFocused ? 'border-[#1a5fb4] border-2' : 'border-gray-500'}`}
        ref={(el) => {
          // eslint-disable-next-line react-hooks/immutability
          if (el && qRefs) qRefs.current[num] = el;
        }}
      />
      {!value && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[17px] text-black font-semibold">
          {num}
        </span>
      )}
    </span>
  );
}
