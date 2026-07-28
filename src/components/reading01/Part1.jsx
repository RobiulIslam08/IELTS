// @ts-nocheck
import RadioRow from "./RadioRow";
import NumberedInput from "./NumberedInput";

const TF_QUESTIONS = [
  "Marie Curie's husband was a joint winner of both Marie's Nobel Prizes.",
  "Marie became interested in science when she was a child.",
  "Marie was able to attend the Sorbonne because of her sister's financial contribution.",
  "Marie stopped doing research for several years when her children were born.",
  "Marie took over the teaching position her husband had held.",
  "Marie's sister Bronia studied the medical uses of radioactivity.",
];

const NOTE_QUESTIONS = [
  {
    num: 7,
    before:
      "When uranium was discovered to be radioactive, Marie Curie found that the element called",
    after: "had the same property.",
  },
  {
    num: 8,
    before: "Marie and Pierre Curie's research into the radioactivity of the mineral known as",
    after: "led to the discovery of two new elements.",
  },
  {
    num: 9,
    before: "In 1911, Marie Curie received recognition for her work on the element",
    after: ".",
  },
  {
    num: 10,
    before: "Marie and Irene Curie developed X-radiography which was used as a medical technique for",
    after: ".",
  },
  {
    num: 11,
    before:
      "Marie Curie saw the importance of collecting radioactive material both for research and for cases of",
    after: ".",
  },
  {
    num: 12,
    before:
      "The radioactive material stocked in Paris contributed to the discoveries in the 1930s of the",
    after: "and of what was known as artificial radioactivity.",
  },
  {
    num: 13,
    before:
      "During her research, Marie Curie was exposed to radiation and as a result she suffered from",
    after: ".",
  },
];

export default function Part1({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  return (
    <>
      <h3 className="font-bold text-[17px] mb-1">Questions 1-6</h3>
      <p className="mb-4 leading-[1.5] text-[17px] text-black">
        Choose <strong className="font-bold">TRUE</strong> if the statement agrees with the information given in the
        text, choose <strong className="font-bold">FALSE</strong> if the statement contradicts the information, or choose{" "}
        <strong className="font-bold">NOT GIVEN</strong> if there is no information on this.
      </p>

      <div className="space-y-5">
        {TF_QUESTIONS.map((q, idx) => {
          const num = idx + 1;
          const key = String(num);
          const selected = answers[key];
          return (
            <div
              key={num}
              ref={(el) => {
                qRefs.current[num] = el;
              }}
            >
              <div className="flex gap-2 items-start mb-2">
                <span
                  className={`inline-flex flex-shrink-0 items-center justify-center min-w-[24px] h-[22px] px-1 border text-[13px] font-semibold ${
                    num === currentQ
                      ? "border-[#1a5fb4] bg-white text-[#1a5fb4]"
                      : "border-gray-400 bg-white text-gray-800"
                  }`}
                >
                  {num}
                </span>
                <span className="leading-[1.4] text-[17px] font-medium text-black mt-[1px]">{q}</span>
              </div>
              <div>
                {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
                  <RadioRow
                    key={opt}
                    name={`q${num}`}
                    value={opt}
                    label={opt}
                    selected={selected}
                    onSelect={(v) => {
                      setCurrentQ(num);
                      setAnswer(key, v);
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="font-bold text-[17px] mb-1 mt-8">Questions 7-13</h3>
      <p className="mb-4 text-[17px]">
        Complete the notes. Write <strong>ONE WORD ONLY</strong> from the text for each answer.
      </p>
      <h4 className="font-bold text-[17px] mb-3">Marie Curie's research on radioactivity</h4>

      <ul className="space-y-0.5 text-[17px] leading-[1.5] list-disc pl-5">
        {NOTE_QUESTIONS.map((q) => (
          <li key={q.num}>
            {q.before}{" "}
            <NumberedInput
              num={q.num}
              answers={answers}
              setAnswer={setAnswer}
              qRefs={qRefs}
              currentQ={currentQ} setCurrentQ={setCurrentQ}
            />{" "}
            {q.after}
          </li>
        ))}
      </ul>
    </>
  );
}
