import RadioRow from "./RadioRow";

const MCQ_QUESTIONS = [
  {
    id: 11,
    text: "What made David leave London and move to Northsea?",
    options: [
      { value: "A", label: "A He was eager to develop a hobby." },
      { value: "B", label: "B He wanted to work shorter hours." },
      { value: "C", label: "C He found his job in website design unsatisfying." },
    ],
  },
  {
    id: 12,
    text: "The Lifeboat Institution in Northsea was built with money provided by",
    options: [
      { value: "A", label: "A a local organisation." },
      { value: "B", label: "B a local resident." },
      { value: "C", label: "C the local council." },
    ],
  },
  {
    id: 13,
    text: "In his health assessment, the doctor was concerned about the fact that David",
    options: [
      { value: "A", label: "A might be colour blind." },
      { value: "B", label: "B was rather short-sighted." },
      { value: "C", label: "C had undergone eye surgery." },
    ],
  },
  {
    id: 14,
    text: "After arriving at the lifeboat station, they aim to launch the boat within",
    options: [
      { value: "A", label: "A five minutes." },
      { value: "B", label: "B six to eight minutes." },
      { value: "C", label: "C eight and a half minutes." },
    ],
  },
  {
    id: 15,
    text: "As a 'helmsman', David has the responsibility of deciding",
    options: [
      { value: "A", label: "A who will be the members of his crew." },
      { value: "B", label: "B what equipment it will be necessary to take." },
      { value: "C", label: "C if the lifeboat should be launched." },
    ],
  },
  {
    id: 16,
    text: "As well as going out on the lifeboat, David",
    options: [
      { value: "A", label: "A gives talks on safety at sea." },
      { value: "B", label: "B helps with fundraising." },
      { value: "C", label: "C recruits new volunteers." },
    ],
  },
];

const Q17_18_OPTIONS = [
  { letter: "A", text: "The residential course developed his leadership skills." },
  { letter: "B", text: "The training in use of ropes and knots was quite brief." },
  { letter: "C", text: "The training exercises have built up his mental strength." },
  { letter: "D", text: "The casualty care activities were particularly challenging for him." },
  { letter: "E", text: "The wave tank activities provided practice in survival techniques." },
];

const Q19_20_OPTIONS = [
  { letter: "A", text: "working as part of a team" },
  { letter: "B", text: "experiences when working in winter" },
  { letter: "C", text: "being thanked by those he has helped" },
  { letter: "D", text: "the fact that it keeps him fit" },
  { letter: "E", text: "the chance to develop new equipment" },
];

export default function Part2({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const handleRadioChange = (qNum, value) => {
    setAnswer(String(qNum), value);
    if (setCurrentQ) setCurrentQ(qNum);
  };

  const handleCheckboxChange = (groupKey, letter) => {
    const firstId = groupKey === "17-18" ? "17" : "19";
    const secondId = groupKey === "17-18" ? "18" : "20";

    const val1 = answers[firstId] || "";
    const val2 = answers[secondId] || "";
    const isCurrentlyChecked = val1 === letter || val2 === letter;

    if (isCurrentlyChecked) {
      if (val1 === letter) setAnswer(firstId, "");
      else if (val2 === letter) setAnswer(secondId, "");
    } else {
      if (!val1) setAnswer(firstId, letter);
      else if (!val2) setAnswer(secondId, letter);
      else return;
    }

    if (setCurrentQ) setCurrentQ(Number(firstId));
  };

  const renderQNum = (num) => {
    const isFocused = currentQ === num;
    return (
      <span
        ref={(el) => {
          if (el && qRefs) qRefs.current[num] = el;
        }}
        className={`font-bold inline-flex items-center justify-center min-w-[22px] px-1 h-[22px] cursor-pointer text-[13px] mr-2 align-middle ${
          isFocused ? "border-2 border-[#1a5fb4] text-black" : "border border-gray-400 text-black"
        }`}
        onClick={() => setCurrentQ && setCurrentQ(num)}
      >
        {num}
      </span>
    );
  };

  const renderMultiSelect = (groupKey, options, firstId, secondId) => (
    <div className="flex flex-col gap-3 mt-4 ml-2">
      {options.map((item) => {
        const isChecked = answers[firstId] === item.letter || answers[secondId] === item.letter;
        const totalSelected = (answers[firstId] ? 1 : 0) + (answers[secondId] ? 1 : 0);
        const isDisabled = totalSelected >= 2 && !isChecked;

        return (
          <label
            key={item.letter}
            className={`flex items-start gap-3 p-2 rounded-md transition-colors ${
              isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50"
            }`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              disabled={isDisabled}
              onChange={() => handleCheckboxChange(groupKey, item.letter)}
              className="mt-1 w-4 h-4 text-[#1a5fb4] border-gray-300 rounded focus:ring-[#1a5fb4]"
            />
            <span className="text-[17px]">
              <strong className="mr-2">{item.letter}</strong> {item.text}
            </span>
          </label>
        );
      })}
    </div>
  );

  return (
    <div className="mx-auto w-full px-4 text-[15px] text-black pb-32 font-sans select-text">
      <div className="mb-16">
        <div className="mb-4">
          <h2 className="font-bold text-[16px] mb-1">Questions 11–16</h2>
          <p className="text-[17px]">
            Choose the correct letter, <span className="font-bold">A, B or C</span>.
          </p>
        </div>

        <h3 className="font-bold text-[19px] mb-6">Working as a lifeboat volunteer</h3>

        <div className="space-y-8">
          {MCQ_QUESTIONS.map((q) => (
            <div key={q.id}>
              <div className="flex items-start mb-3 text-[17px]">
                <div className="mt-0.5">{renderQNum(q.id)}</div>
                <span>{q.text}</span>
              </div>
              <div className="flex flex-col ml-0 mt-2">
                {q.options.map((opt) => (
                  <RadioRow
                    key={opt.value}
                    name={`q${q.id}`}
                    value={opt.value}
                    label={opt.label}
                    selected={answers[String(q.id)]}
                    onSelect={(val) => handleRadioChange(q.id, val)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mb-12"
        ref={(el) => {
          if (el && qRefs) {
            qRefs.current[17] = el;
            qRefs.current[18] = el;
          }
        }}
      >
        <div className="mb-4">
          <h2 className="font-bold text-[16px] mb-1">Questions 17 and 18</h2>
          <p className="text-[17px]">
            Choose <span className="font-bold">TWO</span> letters, <span className="font-bold">A–E</span>.
          </p>
          <p className="text-[17px] mt-2">
            Which <span className="font-bold">TWO</span> things does David say about the lifeboat volunteer training?
          </p>
        </div>
        {renderMultiSelect("17-18", Q17_18_OPTIONS, "17", "18")}
      </div>

      <div
        className="mb-16"
        ref={(el) => {
          if (el && qRefs) {
            qRefs.current[19] = el;
            qRefs.current[20] = el;
          }
        }}
      >
        <div className="mb-4">
          <h2 className="font-bold text-[16px] mb-1">Questions 19 and 20</h2>
          <p className="text-[17px]">
            Choose <span className="font-bold">TWO</span> letters, <span className="font-bold">A–E</span>.
          </p>
          <p className="text-[17px] mt-2">
            Which <span className="font-bold">TWO</span> things does David find most motivating about the work he does?
          </p>
        </div>
        {renderMultiSelect("19-20", Q19_20_OPTIONS, "19", "20")}
      </div>
    </div>
  );
}
