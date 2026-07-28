import { useState } from "react";
import { Keyboard } from "lucide-react";
import RadioRow from "./RadioRow";
import FarleyHouse from "../../assets/test/FarlyHouse.png";

const MCQ_QUESTIONS = [
  {
    id: 11,
    text: "During the visit to Malatte, in France, members especially enjoyed",
    options: [
      { value: "A", label: "A going to a theme park." },
      { value: "B", label: "B experiencing a river trip." },
      { value: "C", label: "C visiting a cheese factory." },
    ],
  },
  {
    id: 12,
    text: "What will happen in Stanthorpe to mark the 25th anniversary of the Twinning Association?",
    options: [
      { value: "A", label: "A A tree will be planted." },
      { value: "B", label: "B A garden seat will be bought." },
      { value: "C", label: "C A footbridge will be built." },
    ],
  },
  {
    id: 13,
    text: "Which event raised most funds this year?",
    options: [
      { value: "A", label: "A the film show" },
      { value: "B", label: "B the pancake evening" },
      { value: "C", label: "C the cookery demonstration" },
    ],
  },
  {
    id: 14,
    text: "For the first evening with the French visitors host families are advised to",
    options: [
      { value: "A", label: "A take them for a walk round the town." },
      { value: "B", label: "B go to a local restaurant." },
      { value: "C", label: "C have a meal at home." },
    ],
  },
  {
    id: 15,
    text: "On Saturday evening there will be the chance to",
    options: [
      { value: "A", label: "A listen to a concert." },
      { value: "B", label: "B watch a match." },
      { value: "C", label: "C take part in a competition." },
    ],
  },
];

const MAP_ITEMS = [
  { id: 16, name: "Farm shop" },
  { id: 17, name: "Disabled entry" },
  { id: 18, name: "Adventure playground" },
  { id: 19, name: "Kitchen gardens" },
  { id: 20, name: "The Temple of the Four Winds" },
];

const LETTER_POOL = ["A", "B", "C", "D", "E", "F", "G", "H"];

export default function Part2({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
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

  const isOptionPlaced = (opt) => {
    for (let i = 16; i <= 20; i++) {
      if (answers[String(i)] === opt) return true;
    }
    return false;
  };

  const handleDragStart = (e, opt) => {
    setDraggedOption(opt);
    e.dataTransfer.setData("text/plain", opt);
  };

  const handleDrop = (e, questionId) => {
    e.preventDefault();
    const opt = draggedOption || e.dataTransfer.getData("text/plain");
    if (opt) {
      const prevKey = Object.keys(answers).find((key) => answers[key] === opt);
      if (prevKey) {
        setAnswer(prevKey, "");
      }
      setAnswer(String(questionId), opt);
      setDraggedOption(null);
      setSelectedOption(null);
      if (setCurrentQ) setCurrentQ(questionId);
    }
  };

  const handleDropToPool = (e) => {
    e.preventDefault();
    const opt = draggedOption || e.dataTransfer.getData("text/plain");
    if (opt) {
      const prevKey = Object.keys(answers).find((key) => answers[key] === opt);
      if (prevKey) {
        setAnswer(prevKey, "");
      }
      setDraggedOption(null);
      setSelectedOption(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleOptionClick = (opt) => {
    if (selectedOption === opt) {
      setSelectedOption(null);
    } else {
      setSelectedOption(opt);
    }
  };

  const handleSlotClick = (questionId) => {
    const currentVal = answers[String(questionId)];

    if (selectedOption) {
      const prevKey = Object.keys(answers).find((key) => answers[key] === selectedOption);
      if (prevKey) {
        setAnswer(prevKey, "");
      }
      setAnswer(String(questionId), selectedOption);
      setSelectedOption(null);
    } else if (currentVal) {
      setAnswer(String(questionId), "");
    }

    if (setCurrentQ) setCurrentQ(questionId);
  };

  return (
    <div className="mx-auto w-full px-4 text-[15px] text-black pb-32 font-sans select-text">
      {/* ----------------- Q11-15 MCQ ----------------- */}
      <div className="mb-16">
        <div className="mb-4">
          <h2 className="font-bold text-[16px] mb-1">Questions 11–15</h2>
          <p className="text-[17px]">
            Choose the correct letter, <span className="font-bold">A, B or C</span>.
          </p>
        </div>

        <h3 className="font-bold text-[19px] mb-6">Stanthorpe Twinning Association</h3>

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

      {/* ----------------- Q16-20 Map drag & drop ----------------- */}
      <div className="pt-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-bold text-[16px] mb-1">Questions 16–20</h2>
            <p className="text-[17px]">Label the map below.</p>
            <p className="text-[17px]">
              Write the correct letter, <span className="font-bold">A–H</span>, next to Questions 16–20.
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

        <h3 className="font-bold text-[19px] mb-4">Farley House</h3>

        <div className="mb-8 w-full max-w-[700px]">
          <img src={FarleyHouse} alt="Farley House map" className="w-full h-auto object-contain" />
        </div>

        <div className="flex gap-8 items-start">
          <div className="flex flex-col gap-4">
            {MAP_ITEMS.map((item) => {
              const assignedVal = answers[String(item.id)];
              const isFocused = currentQ === item.id;

              return (
                <div key={item.id} className="flex items-center gap-2 h-[32px]">
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
                    draggable={!!assignedVal}
                    onDragStart={(e) => assignedVal && handleDragStart(e, assignedVal)}
                    className={`h-[24px] w-[80px] rounded-md transition-all flex items-center justify-center cursor-pointer text-[17px] whitespace-nowrap ${
                      assignedVal
                        ? "border-2 border-[#1a5fb4] bg-white px-2 cursor-grab active:cursor-grabbing font-bold"
                        : `border border-dashed bg-white ${
                            isFocused
                              ? "border-2 border-dashed border-[#1a5fb4]"
                              : "border-gray-500 text-gray-800 font-bold"
                          }`
                    }`}
                  >
                    {assignedVal || item.id}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="flex flex-col gap-3"
            onDragOver={handleDragOver}
            onDrop={handleDropToPool}
          >
            <div className="font-semibold text-[17px] mb-1">Letters</div>
            <div className="flex flex-col gap-2 w-[80px]">
              {LETTER_POOL.map((opt) => {
                const placed = isOptionPlaced(opt);
                const isSelected = selectedOption === opt;

                return (
                  <div
                    key={opt}
                    draggable={!placed}
                    onDragStart={(e) => handleDragStart(e, opt)}
                    onClick={() => !placed && handleOptionClick(opt)}
                    className={`px-2.5 py-0.5 border border-gray-600 text-[14px] rounded-[4px] select-none transition-all w-fit min-w-[36px] text-center ${
                      placed
                        ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-0"
                        : isSelected
                          ? "bg-[#e3effd] border cursor-grab font-semibold"
                          : "bg-white text-black hover:bg-gray-50 cursor-grab active:cursor-grabbing"
                    }`}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
