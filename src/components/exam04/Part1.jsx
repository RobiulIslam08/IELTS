import NumberedInput from "../exam03/NumberedInput";

export default function Part1({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const iprops = (num) => ({
    num,
    answers,
    setAnswer,
    qRefs,
    currentQ,
    setCurrentQ,
    width: 260,
  });

  return (
    <div className="mx-auto w-full px-4 pb-24 text-[15px] text-black">
      <div className="mb-6">
        <h2 className="mb-1 text-[17px] font-bold">Questions 1–10</h2>
        <p className="text-[17px]">
          Complete the notes. Write <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each answer.
        </p>
      </div>

      <div className="space-y-5">
        {Array.from({ length: 10 }, (_, idx) => idx + 1).map((q) => (
          <div key={q} className="flex items-center gap-2 text-[17px]">
            <span className="w-8 text-right font-semibold">{q}.</span>
            <NumberedInput {...iprops(q)} />
          </div>
        ))}
      </div>
    </div>
  );
}
