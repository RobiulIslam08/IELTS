// @ts-nocheck
import RadioRow from "./RadioRow";
import NumberedInput from "./NumberedInput";

const TF_QUESTIONS = [
  "Britain's canal network grew rapidly so that more goods could be transported around the country.",
  "Costs in the iron industry rose when the technique of smelting iron ore with coke was introduced.",
  "Samuel Morse's communication system was more reliable than that developed by William Cooke and Charles Wheatstone.",
  "The economic benefits of industrialisation were limited to certain sectors of society.",
  "Some skilled weavers believed that the introduction of the new textile machines would lead to job losses.",
  "There was some sympathy among local people for the Luddites who were arrested near Huddersfield.",
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
      <h3 className="font-bold text-[17px] mb-1">Questions 1–7</h3>
      <p className="mb-1 text-[17px]">Complete the notes below.</p>
      <p className="mb-1 text-[17px]">
        Choose <strong>ONE WORD ONLY</strong> from the passage for each answer.
      </p>
      <p className="mb-4 text-[17px]">Write your answers in boxes 1–7 on your answer sheet.</p>

      <div className="px-5 py-4">
        <h4 className="font-bold text-[17px] text-center mb-4">Britain&apos;s Industrial Revolution</h4>

        <div className="font-bold mb-2 text-[17px]">Steam power</div>
        <ul className="list-disc pl-5 space-y-3 text-[17px] leading-[1.6] mb-5">
          <li>Newcomen&apos;s steam engine was used in mines to remove water.</li>
          <li>
            In Watt and Boulton&apos;s steam engine, the movement of the{" "}
            <NumberedInput {...iprops(1)} /> was linked to a gear system.
          </li>
          <li>
            A greater supply of <NumberedInput {...iprops(2)} /> was required to power steam engines.
          </li>
        </ul>

        <div className="font-bold mb-2 text-[17px]">Textile industry</div>
        <ul className="list-disc pl-5 space-y-3 text-[17px] leading-[1.6] mb-5">
          <li>
            Before the Industrial Revolution, spinners and weavers worked at home and in{" "}
            <NumberedInput {...iprops(3)} />.
          </li>
          <li>
            Not as much <NumberedInput {...iprops(4)} /> was needed to produce cloth once the spinning jenny
            and power loom were invented.
          </li>
        </ul>

        <div className="font-bold mb-2 text-[17px]">Iron industry</div>
        <ul className="list-disc pl-5 space-y-3 text-[17px] leading-[1.6] mb-5">
          <li>
            Smelting of iron ore with coke resulted in material that was better <NumberedInput {...iprops(5)} />.
          </li>
          <li>
            Demand for iron increased with the growth of the <NumberedInput {...iprops(6)} />.
          </li>
        </ul>

        <div className="font-bold mb-2 text-[17px]">Communications</div>
        <ul className="list-disc pl-5 space-y-3 text-[17px] leading-[1.6] mb-5">
          <li>Cooke and Wheatstone patented the first telegraphy system.</li>
          <li>The telegraphy system was used to prevent locomotives colliding.</li>
        </ul>

        <div className="font-bold mb-2 text-[17px]">Urbanisation</div>
        <ul className="list-disc pl-5 space-y-3 text-[17px] leading-[1.6]">
          <li>Small towns turned into cities very quickly.</li>
          <li>
            The new cities were dirty, crowded and lacked sufficient <NumberedInput {...iprops(7)} />.
          </li>
        </ul>
      </div>

      <h3 className="font-bold text-[17px] mb-1 mt-8">Questions 8–13</h3>
      <p className="mb-1 leading-[1.5] text-[17px] text-black">
        Do the following statements agree with the information given in Reading Passage 1?
      </p>
      <p className="mb-2 leading-[1.5] text-[17px] text-black">
        In boxes 8–13 on your answer sheet, write
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
          const num = idx + 8;
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
    </>
  );
}
