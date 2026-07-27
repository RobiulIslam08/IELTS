// @ts-nocheck
import RadioRow from "./RadioRow";
import NumberedInput from "./NumberedInput";

const TF_QUESTIONS = [
  "Archaeological research had taken place on the island of Obi before the arrival of Ceri Shipton and his colleagues.",
  "At the Kelo sites, the researchers found the first clam shell axes ever to be discovered in the region.",
  "The size of Obi today is less than it was 18,000 years ago.",
  "A change in the climate around 11,700 years ago had a greater impact on Obi than on the surrounding islands.",
  "The researchers believe there is a connection between warmer, wetter weather and a change in the material used to make axes.",
  "Shipton's team were surprised to find evidence of the Obi islanders' hunting practices.",
  "It is thought that the Kelo shelters were occupied continuously until about 1,000 years ago.",
];

const NOTE_QUESTIONS = [
  
  {
    num: 8,
    before: "Excavations of rock shelters inside.",
    after: "near the village of Kelo revealed.",
  },
  {
    num: 9,
    before: "axes from around 14,000 years ago, probably used to make canoes. axes made out of",
    after: "dating from around 11,700 years ago.",
  },
  {
    num: 10,
    before: " ",
    after: "of an animal: evidence of what ancient islanders ate.",
  },
  {
    num: 11,
    before:
      "obsidian: a material that is not found naturally on Obi.",
    after: "which resembled ones found on other islands.",
  },
  {
    num: 12,
    before:
      "may have switched from hunting to fishing had.",
    after: "as well as items made out of metal.",
  },
  {
    num: 13,
    before:
      "probably took part in the production and sale of",
    after: ".",
  },
];

export default function Part1({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  return (
    <>
      <h3 className="font-bold text-[17px] mb-1">Questions 1-7</h3>
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

      <h3 className="font-bold text-[17px] mb-1 mt-8">Questions 8-13</h3>
      <p className="mb-4 text-[17px]">
        Complete the notes below. Write <strong>ONE WORD ONLY</strong> from the passage for each answer.
      </p>
      <p className="mb-4 text-[17px]">
        Write your answers in boxes 8-13 on your answer sheet.
      </p>
      <h4 className="font-bold text-[17px] mb-3">Archaeological findings on Obi</h4>

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
