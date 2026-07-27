import { singleChoice } from "./listeningFourOptions";

export default function Part2({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  return (
    <div className="mx-auto w-full px-4 pb-24 text-[15px] text-black">
      <div className="mb-6">
        <h2 className="mb-1 text-[17px] font-bold">Questions 11–20</h2>
        <p className="text-[17px]">Choose the correct letter for each answer.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 10 }, (_, idx) => idx + 11).map((q) => (
          <label
            key={q}
            className="block"
            ref={(el) => {
              if (el && qRefs) qRefs.current[q] = el;
            }}
          >
            <span className="mb-1 block text-[17px] font-semibold">{q}</span>
            <select
              className={`w-full rounded-sm border bg-white px-3 py-2 text-[17px] focus:outline-none ${
                currentQ === q ? "border-2 border-[#1a5fb4]" : "border-gray-400"
              }`}
              value={answers[String(q)] || ""}
              onFocus={() => setCurrentQ && setCurrentQ(q)}
              onChange={(e) => {
                setAnswer(String(q), e.target.value);
                if (setCurrentQ) setCurrentQ(q);
              }}
            >
              <option value="">Select</option>
              {singleChoice[q].map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
}
