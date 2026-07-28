// @ts-nocheck
import RadioRow from "./RadioRow";
import NumberedInput from "./NumberedInput";

const TF_QUESTIONS = [
  "People had expected Andy Murray to become the world's top tennis player for at least five years before 2016.",
  "The change that Andy Murray made to his rackets attracted a lot of attention.",
  "Most of the world's top players take a professional racket stringer on tour with them.",
  "Mike and Bob Bryan use rackets that are light in comparison to the majority of rackets.",
  "Werner Fischer played with a spaghetti-strung racket that he designed himself.",
  "The weather can affect how professional players adjust the strings on their rackets.",
  "It was believed that the change Pete Sampras made to his rackets contributed to his strong serve.",
];

const NOTE_QUESTIONS = [
  {
    num: 8,
    before: "Mike and Bob Bryan made changes to the types of",
    after: "used on their racket frames.",
  },
  {
    num: 9,
    before: "Players were not allowed to use the spaghetti-strung racket because of the amount of",
    after: "it created.",
  },
  {
    num: 10,
    before: "Changes to rackets can be regarded as being as important as players' diets or the",
    after: "they do.",
  },
  {
    num: 11,
    before: "All rackets used to have natural strings made from the",
    after: "of animals.",
  },
  {
    num: 12,
    before: "Pete Sampras had metal",
    after: "put into the frames of his rackets.",
  },
  {
    num: 13,
    before: "Gonçalo Oliveira changed the",
    after: "on his racket handles.",
  },
];

export default function Part1({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  return (
    <>
      <h3 className="font-bold text-[17px] mb-1">Questions 1–7</h3>
      <p className="mb-1 leading-[1.5] text-[17px] text-black">
        Do the following statements agree with the information given in Reading Passage 1?
      </p>
      <p className="mb-2 leading-[1.5] text-[17px] text-black">
        In boxes 1–7 on your answer sheet, write
      </p>
      <div className="mb-5 space-y-0.5 text-[17px] text-black pl-1">
        <p>
          <strong>TRUE</strong> if the statement agrees with the information
        </p>
        <p>
          <strong>FALSE</strong> if the statement contradicts the information
        </p>
        <p>
          <strong>NOT GIVEN</strong> if there is no information on this
        </p>
      </div>

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

      <h3 className="font-bold text-[17px] mb-1 mt-8">Questions 8–13</h3>
      <p className="mb-1 text-[17px]">Complete the notes below.</p>
      <p className="mb-1 text-[17px]">
        Choose <strong>ONE WORD ONLY</strong> from the passage for each answer.
      </p>
      <p className="mb-4 text-[17px]">Write your answers in boxes 8–13 on your answer sheet.</p>

      <div className="border border-black px-5 py-4">
        <h4 className="font-bold text-[17px] text-center mb-4">
          The tennis racket and how it has changed
        </h4>

        <ul className="space-y-3 text-[17px] leading-[1.6] list-disc pl-5">
          {NOTE_QUESTIONS.map((q) => (
            <li key={q.num}>
              {q.before}{" "}
              <NumberedInput
                num={q.num}
                answers={answers}
                setAnswer={setAnswer}
                qRefs={qRefs}
                currentQ={currentQ}
                setCurrentQ={setCurrentQ}
              />{" "}
              {q.after}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
