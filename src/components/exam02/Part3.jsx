import { useState } from "react";
import { Keyboard } from "lucide-react";
import RadioRow from "./RadioRow";

const MCQ_21_24 = [
  {
    id: 21,
    text: "At first, Don thought the topic of recycling footwear might be too",
    options: [
      { value: "A", label: "A limited in scope." },
      { value: "B", label: "B hard to research." },
      { value: "C", label: "C boring for listeners." },
    ],
  },
  {
    id: 22,
    text: "When discussing trainers, Bella and Don disagree about",
    options: [
      { value: "A", label: "A how popular they are among young people." },
      { value: "B", label: "B how suitable they are for school." },
      { value: "C", label: "C how quickly they wear out." },
    ],
  },
  {
    id: 23,
    text: "Bella says that she sometimes recycles shoes because",
    options: [
      { value: "A", label: "A they no longer fit." },
      { value: "B", label: "B she no longer likes them." },
      { value: "C", label: "C they are no longer in fashion." },
    ],
  },
  {
    id: 24,
    text: "What did the article say that confused Don?",
    options: [
      { value: "A", label: "A Public consumption of footwear has risen." },
      { value: "B", label: "B Less footwear is recycled now than in the past." },
      { value: "C", label: "C People dispose of more footwear than they used to." },
    ],
  },
];

const REASONS = [
  { letter: "A", text: "one shoe was missing" },
  { letter: "B", text: "the colour of one shoe had faded" },
  { letter: "C", text: "one shoe had a hole in it" },
  { letter: "D", text: "the shoes were brand new" },
  { letter: "E", text: "the shoes were too dirty" },
  { letter: "F", text: "the stitching on the shoes was broken" },
];

const FOOTWEAR_ITEMS = [
  { id: 25, name: "the high-heeled shoes" },
  { id: 26, name: "the ankle boots" },
  { id: 27, name: "the baby shoes" },
  { id: 28, name: "the trainers" },
];

const MCQ_29_30 = [
  {
    id: 29,
    text: "Why did the project to make 'new' shoes out of old shoes fail?",
    options: [
      { value: "A", label: "A People believed the 'new' pairs of shoes were unhygienic." },
      { value: "B", label: "B There were not enough good parts to use in the old shoes." },
      { value: "C", label: "C The shoes in the 'new' pairs were not completely alike." },
    ],
  },
  {
    id: 30,
    text: "Bella and Don agree that they can present their topic",
    options: [
      { value: "A", label: "A from a new angle." },
      { value: "B", label: "B with relevant images." },
      { value: "C", label: "C in a straightforward way." },
    ],
  },
];

const letterToReason = Object.fromEntries(REASONS.map((o) => [o.letter, o.text]));
const reasonToLetter = Object.fromEntries(REASONS.map((o) => [o.text, o.letter]));

export default function Part3({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const [draggedOption, setDraggedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleRadioChange = (qNum, value) => {
    setAnswer(String(qNum), value);
    if (setCurrentQ) setCurrentQ(qNum);
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

  const isOptionPlaced = (optText) => {
    const letter = reasonToLetter[optText];
    for (let i = 25; i <= 28; i++) {
      if (answers[String(i)] === letter) return true;
    }
    return false;
  };

  const handleDragStart = (e, optText) => {
    setDraggedOption(optText);
    e.dataTransfer.setData("text/plain", optText);
  };

  const handleDrop = (e, questionId) => {
    e.preventDefault();
    const optText = draggedOption || e.dataTransfer.getData("text/plain");
    const letter = reasonToLetter[optText];
    if (letter) {
      const prevKey = Object.keys(answers).find((key) => answers[key] === letter);
      if (prevKey) setAnswer(prevKey, "");
      setAnswer(String(questionId), letter);
      setDraggedOption(null);
      setSelectedOption(null);
      if (setCurrentQ) setCurrentQ(questionId);
    }
  };

  const handleDropToPool = (e) => {
    e.preventDefault();
    const optText = draggedOption || e.dataTransfer.getData("text/plain");
    const letter = reasonToLetter[optText];
    if (letter) {
      const prevKey = Object.keys(answers).find((key) => answers[key] === letter);
      if (prevKey) setAnswer(prevKey, "");
      setDraggedOption(null);
      setSelectedOption(null);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleOptionClick = (optText) => {
    setSelectedOption((prev) => (prev === optText ? null : optText));
  };

  const handleSlotClick = (questionId) => {
    const currentVal = answers[String(questionId)];

    if (selectedOption) {
      const letter = reasonToLetter[selectedOption];
      const prevKey = Object.keys(answers).find((key) => answers[key] === letter);
      if (prevKey) setAnswer(prevKey, "");
      setAnswer(String(questionId), letter);
      setSelectedOption(null);
    } else if (currentVal) {
      setAnswer(String(questionId), "");
    }

    if (setCurrentQ) setCurrentQ(questionId);
  };

  const renderMcqBlock = (questions) => (
    <div className="space-y-8">
      {questions.map((q) => (
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
  );

  return (
    <div className="mx-auto w-full px-4 text-[15px] text-black pb-32 font-sans select-text">
      <div className="mb-16">
        <div className="mb-4">
          <h2 className="font-bold text-[16px] mb-1">Questions 21–24</h2>
          <p className="text-[17px]">
            Choose the correct letter, <span className="font-bold">A, B or C</span>.
          </p>
        </div>
        <h3 className="font-bold text-[19px] mb-6">Recycling footwear</h3>
        {renderMcqBlock(MCQ_21_24)}
      </div>

      <div className="mb-16">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-bold text-[16px] mb-1">Questions 25–28</h2>
            <p className="text-[17px]">
              What reasons did the recycling manager give for rejecting footwear, according to the students?
            </p>
            <p className="text-[17px]">
              Choose <span className="font-bold">FOUR</span> answers from the box and write the correct letter,{" "}
              <span className="font-bold">A–F</span>, next to Questions 25–28.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-[13px] text-[#1a5fb4] hover:underline font-semibold mt-1"
          >
            <Keyboard className="w-4 h-4" />
            <span>Help</span>
          </button>
        </div>

        <div className="flex gap-8 items-start">
          <div className="flex flex-col gap-4">
            <div className="font-bold text-[17px] mb-1">Footwear</div>
            {FOOTWEAR_ITEMS.map((item) => {
              const assignedLetter = answers[String(item.id)];
              const displayText = letterToReason[assignedLetter];
              const isFocused = currentQ === item.id;

              return (
                <div key={item.id} className="flex items-center gap-2 min-h-[32px]">
                  <span className="text-[17px] text-black min-w-[220px]">
                    {item.id} {item.name}
                  </span>
                  <div
                    ref={(el) => {
                      if (el && qRefs) qRefs.current[item.id] = el;
                    }}
                    onClick={() => handleSlotClick(item.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, item.id)}
                    draggable={!!assignedLetter}
                    onDragStart={(e) => assignedLetter && handleDragStart(e, displayText)}
                    className={`h-[24px] rounded-md transition-all flex items-center justify-center cursor-pointer text-[15px] whitespace-nowrap ${
                      assignedLetter
                        ? "w-fit px-3 border-2 border-[#1a5fb4] bg-white cursor-grab active:cursor-grabbing"
                        : `w-[80px] border border-dashed bg-white ${
                            isFocused
                              ? "border-2 border-dashed border-[#1a5fb4]"
                              : "border-gray-500 text-gray-800 font-bold"
                          }`
                    }`}
                  >
                    {displayText || item.id}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-3" onDragOver={handleDragOver} onDrop={handleDropToPool}>
            <div className="font-semibold text-[17px] mb-1">Reasons</div>
            <div className="flex flex-col gap-2">
              {REASONS.map((opt) => {
                const placed = isOptionPlaced(opt.text);
                const isSelected = selectedOption === opt.text;

                return (
                  <div
                    key={opt.letter}
                    draggable={!placed}
                    onDragStart={(e) => handleDragStart(e, opt.text)}
                    onClick={() => !placed && handleOptionClick(opt.text)}
                    className={`px-2.5 py-0.5 border border-gray-600 text-[14px] rounded-[4px] select-none transition-all w-fit ${
                      placed
                        ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-0"
                        : isSelected
                          ? "bg-[#e3effd] border cursor-grab font-semibold"
                          : "bg-white text-black hover:bg-gray-50 cursor-grab active:cursor-grabbing"
                    }`}
                  >
                    {opt.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <div className="mb-4">
          <h2 className="font-bold text-[16px] mb-1">Questions 29–30</h2>
          <p className="text-[17px]">
            Choose the correct letter, <span className="font-bold">A, B or C</span>.
          </p>
        </div>
        {renderMcqBlock(MCQ_29_30)}
      </div>
    </div>
  );
}
