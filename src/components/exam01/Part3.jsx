import { useState } from "react";
import { Keyboard } from "lucide-react";

const Q21_22_OPTIONS = [
  { letter: "A", text: "receiving support from local restaurants" },
  { letter: "B", text: "finding a good way to prevent waste" },
  { letter: "C", text: "overcoming problems in a basic process" },
  { letter: "D", text: "experimenting with designs and colours" },
  { letter: "E", text: "learning how to apply 3-D printing" },
];

const Q23_24_OPTIONS = [
  { letter: "A", text: "for use on medical products" },
  { letter: "B", text: "to show that food is no longer fit to eat" },
  { letter: "C", text: "for use with drinks as well as foods" },
  { letter: "D", text: "to provide applications for blind people" },
  { letter: "E", text: "to indicate the weight of certain foods" },
];

const FOOD_TRENDS = [
  { id: 25, name: "Use of local products" },
  { id: 26, name: "Reduction in unnecessary packaging" },
  { id: 27, name: "Gluten-free and lactose-free food" },
  { id: 28, name: "Use of branded products related to celebrity chefs" },
  { id: 29, name: "Development of 'ghost kitchens' for takeaway food" },
  { id: 30, name: "Use of mushrooms for common health concerns" },
];

const OPINION_OPTIONS = [
  { letter: "A", text: "This is only relevant to young people." },
  { letter: "B", text: "This may have disappointing results." },
  { letter: "C", text: "This already seems to be widespread." },
  { letter: "D", text: "Retailers should do more to encourage this." },
  { letter: "E", text: "More financial support is needed for this." },
  { letter: "F", text: "Most people know little about this." },
  { letter: "G", text: "There should be stricter regulations about this." },
  { letter: "H", text: "This could be dangerous." },
];

const letterToOpinion = Object.fromEntries(OPINION_OPTIONS.map((o) => [o.letter, o.text]));
const opinionToLetter = Object.fromEntries(OPINION_OPTIONS.map((o) => [o.text, o.letter]));

export default function Part3({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const [draggedOption, setDraggedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (groupKey, letter) => {
    const firstId = groupKey === "21-22" ? "21" : "23";
    const secondId = groupKey === "21-22" ? "22" : "24";

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

  const isOptionPlaced = (optText) => {
    const letter = opinionToLetter[optText];
    for (let i = 25; i <= 30; i++) {
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
    const letter = opinionToLetter[optText];
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
    const letter = opinionToLetter[optText] || optText;
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
      const letter = opinionToLetter[selectedOption];
      const prevKey = Object.keys(answers).find((key) => answers[key] === letter);
      if (prevKey) setAnswer(prevKey, "");
      setAnswer(String(questionId), letter);
      setSelectedOption(null);
    } else if (currentVal) {
      setAnswer(String(questionId), "");
    }

    if (setCurrentQ) setCurrentQ(questionId);
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
    <div className="mx-auto w-full px-4 text-[15px] text-black pb-32 font-sans select-none">
      {/* ----------------- Q21-22 ----------------- */}
      <div
        className="mb-12"
        ref={(el) => {
          if (el && qRefs) qRefs.current[21] = el;
        }}
      >
        <div className="mb-4">
          <h2 className="font-bold text-[16px] mb-1">Questions 21 and 22</h2>
          <p className="text-[17px]">
            Choose <span className="font-bold">TWO</span> letters, <span className="font-bold">A–E</span>.
          </p>
          <p className="text-[17px] mt-2">
            Which <span className="font-bold">TWO</span> things did Colin find most satisfying about his bread
            reuse project?
          </p>
        </div>
        {renderMultiSelect("21-22", Q21_22_OPTIONS, "21", "22")}
      </div>

      {/* ----------------- Q23-24 ----------------- */}
      <div
        className="mb-16"
        ref={(el) => {
          if (el && qRefs) {
            qRefs.current[22] = el;
            qRefs.current[23] = el;
            qRefs.current[24] = el;
          }
        }}
      >
        <div className="mb-4">
          <h2 className="font-bold text-[16px] mb-1">Questions 23 and 24</h2>
          <p className="text-[17px]">
            Choose <span className="font-bold">TWO</span> letters, <span className="font-bold">A–E</span>.
          </p>
          <p className="text-[17px] mt-2">
            Which <span className="font-bold">TWO</span> ways do the students agree that touch-sensitive sensors
            for food labels could be developed in future?
          </p>
        </div>
        {renderMultiSelect("23-24", Q23_24_OPTIONS, "23", "24")}
      </div>

      {/* ----------------- Q25-30 drag & drop ----------------- */}
      <div className="pt-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-bold text-[16px] mb-1">Questions 25–30</h2>
            <p className="text-[17px]">What is the students&apos; opinion about each of the following food trends?</p>
            <p className="text-[17px]">
              Choose <span className="font-bold">SIX</span> answers from the box and write the correct letter,{" "}
              <span className="font-bold">A–H</span>, next to Questions 25–30.
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
            <div className="font-bold text-[17px] mb-1">Food trends</div>
            {FOOD_TRENDS.map((item) => {
              const assignedLetter = answers[String(item.id)];
              const displayText = letterToOpinion[assignedLetter];
              const isFocused = currentQ === item.id;

              return (
                <div key={item.id} className="flex items-center gap-2 min-h-[32px]">
                  <span className="text-[17px] text-black min-w-[340px]">
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
                        ? "w-auto max-w-[320px] px-3 border-2 border-[#1a5fb4] bg-white cursor-grab active:cursor-grabbing"
                        : `w-[80px] border border-dashed bg-white ${
                            isFocused
                              ? "border-2 border-dashed border-[#1a5fb4]"
                              : "border-gray-500 text-gray-800 font-bold"
                          }`
                    }`}
                  >
                    {assignedLetter || item.id}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-3" onDragOver={handleDragOver} onDrop={handleDropToPool}>
            <div className="font-semibold text-[17px] mb-1">Opinions</div>
            <div className="flex flex-col gap-2">
              {OPINION_OPTIONS.map((opt) => {
                const placed = isOptionPlaced(opt.text);
                const isSelected = selectedOption === opt.text;

                return (
                  <div
                    key={opt.letter}
                    draggable={!placed}
                    onDragStart={(e) => handleDragStart(e, opt.text)}
                    onClick={() => !placed && handleOptionClick(opt.text)}
                    className={`px-2.5 py-0.5 border border-gray-600 text-[14px] rounded-[4px] select-none transition-all w-fit max-w-[380px] ${
                      placed
                        ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-0"
                        : isSelected
                          ? "bg-[#e3effd] border cursor-grab font-semibold"
                          : "bg-white text-black hover:bg-gray-50 cursor-grab active:cursor-grabbing"
                    }`}
                  >
                    <strong className="mr-1">{opt.letter}</strong> {opt.text}
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
