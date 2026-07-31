// @ts-nocheck
import RadioRow from "./RadioRow";
import NumberedInput from "./NumberedInput";

const TF_QUESTIONS = [
  "Forty years ago, there were fewer butterflies in Britain than at present.",
  "Caterpillars are eaten by a number of different predators.",
  "'Phenology' is a term used to describe a creature's ability to alter the location of a lifecycle event.",
  "Some species of butterfly have a reduced lifespan due to spring temperature increases.",
  "There is a clear reason for the adaptations that butterflies are making to climate change.",
  "The data used in the study was taken from the work of amateur butterfly watchers.",
];

export default function Part1({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const iprops = (num) => ({
    num,
    answers,
    setAnswer,
    qRefs,
    currentQ,
    setCurrentQ,
  });

  return (
    <>
      <h3 className="font-bold text-[17px] mb-1">Questions 1–6</h3>
      <p className="mb-1 leading-[1.5] text-[17px] text-black">
        Do the following statements agree with the information given in Reading Passage 1?
      </p>
      <p className="mb-2 leading-[1.5] text-[17px] text-black">
        In boxes 1–6 on your answer sheet, write
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

      <h3 className="font-bold text-[17px] mb-1 mt-8">Questions 7–13</h3>
      <p className="mb-1 text-[17px]">Complete the notes below.</p>
      <p className="mb-1 text-[17px]">
        Choose <strong>ONE WORD ONLY</strong> from the passage for each answer.
      </p>
      <p className="mb-4 text-[17px]">Write your answers in boxes 7–13 on your answer sheet.</p>

      <div className="px-5 py-4">
        <div className="font-bold mb-2 text-[17px]">The Small Blue</div>
        <ul className="list-disc pl-5 space-y-3 text-[17px] leading-[1.6] mb-5">
          <li>
            lives in large <NumberedInput {...iprops(7)} />
          </li>
          <li>
            first appears at the start of <NumberedInput {...iprops(8)} />
          </li>
          <li>completes more than one reproductive cycle per year</li>
        </ul>

        <div className="font-bold mb-2 text-[17px]">The High Brown Fritillary</div>
        <ul className="list-disc pl-5 space-y-3 text-[17px] leading-[1.6] mb-5">
          <li>has one reproductive cycle</li>
          <li>
            is considered to be more <NumberedInput {...iprops(9)} /> than other species
          </li>
          <li>
            its caterpillars occupy a limited range of <NumberedInput {...iprops(10)} />
          </li>
        </ul>

        <div className="font-bold mb-2 text-[17px]">The Silver-studded Blue</div>
        <ul className="list-disc pl-5 space-y-3 text-[17px] leading-[1.6] mb-5">
          <li>
            is already able to reproduce twice a year in warm areas of{" "}
            <NumberedInput {...iprops(11)} />
          </li>
        </ul>

        <div className="font-bold mb-2 text-[17px]">The White Admiral</div>
        <ul className="list-disc pl-5 space-y-3 text-[17px] leading-[1.6]">
          <li>
            is found in <NumberedInput {...iprops(12)} /> areas of England
          </li>
          <li>
            both climate change and the <NumberedInput {...iprops(13)} /> of the caterpillar are
            possible reasons for decline
          </li>
        </ul>
      </div>
    </>
  );
}
