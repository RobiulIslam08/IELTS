import { useState } from "react";
import { Keyboard } from "lucide-react";

export default function Part2({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  // Drag and Drop State
  const [draggedOption, setDraggedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // Q11-15: Matching
  const people = [
    { id: 11, name: "11 Superheroes" },
    { id: 12, name: "12 Just do it" },
    { id: 13, name: "13 Count on me" },
    { id: 14, name: "14 Speak up" },
    { id: 15, name: "15 Jump for joy" },
    { id: 16, name: "16 Sticks and stones" },
  ];

  const poolOptions1 = [
    "involves painting and drawing", // value = A
    "will be led by a prize-winning author", // value = B
    "is aimed at children with a disability", // value = C
    "involves a drama activity", // value = D
    "focuses on new relationships", // value = E
    "is aimed at a specific age group", // value = F
    "explores an unhappy feeling", // value = G
    "raises awareness of a particular culture", // value = H
  ];

  const optionToLetterMap = {
    "involves painting and drawing": "A",
    "will be led by a prize-winning author": "B",
    "is aimed at children with a disability": "C",
    "involves a drama activity": "D",
    "focuses on new relationships": "E",
    "is aimed at a specific age group": "F",
    "explores an unhappy feeling": "G",
    "raises awareness of a particular culture": "H",
  };

  const letterToOptionMap = Object.fromEntries(
    Object.entries(optionToLetterMap).map(([text, letter]) => [letter, text])
  );

  // Check if option is placed in Q11-20
  const isOptionPlaced = (opt) => {
    const letter = optionToLetterMap[opt];
    for (let i = 11; i <= 20; i++) {
      if (answers[String(i)] === letter) return true;
    }
    return false;
  };

  // Drag handlers
  const handleDragStart = (e, opt) => {
    setDraggedOption(opt);
    e.dataTransfer.setData("text/plain", opt);
  };

  const handleDrop = (e, questionId) => {
    e.preventDefault();
    const opt = draggedOption || e.dataTransfer.getData("text/plain");
    if (opt) {
      const letterValue = optionToLetterMap[opt] || opt;
      const prevKey = Object.keys(answers).find((key) => answers[key] === letterValue);
      if (prevKey) {
        setAnswer(prevKey, "");
      }
      setAnswer(String(questionId), letterValue);
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

  // Click-to-select and place handlers
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
      const letterValue = optionToLetterMap[selectedOption];
      const prevKey = Object.keys(answers).find((key) => answers[key] === letterValue);
      if (prevKey) {
        setAnswer(prevKey, "");
      }
      setAnswer(String(questionId), letterValue);
      setSelectedOption(null);
    } else if (currentVal) {
      setAnswer(String(questionId), "");
    }
    if (setCurrentQ) setCurrentQ(questionId);
  };

  // Checkbox Change Logic (17->প্রথম সিলেক্ট, 18->দ্বিতীয় সিলেক্ট)
  const handleCheckboxChange = (groupKey, letter) => {
    const firstId = groupKey === "17-18" ? "17" : "19";
    const secondId = groupKey === "17-18" ? "18" : "20";

    const val1 = answers[firstId] || "";
    const val2 = answers[secondId] || "";

    const isCurrentlyChecked = val1 === letter || val2 === letter;

    if (isCurrentlyChecked) {
      if (val1 === letter) {
        setAnswer(firstId, "");
      } else if (val2 === letter) {
        setAnswer(secondId, "");
      }
    } else {
      if (!val1) {
        setAnswer(firstId, letter);
      } else if (!val2) {
        setAnswer(secondId, letter);
      } else {
        return;
      }
    }

    if (setCurrentQ) setCurrentQ(Number(firstId));
  };

  return (
    <div className="mx-auto w-full px-4 text-[15px] text-black pb-32 font-sans select-none">
      {/* ----------------- Q11-16 ----------------- */}
      <div className="mb-16">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="font-bold text-[16px] mb-1">Questions 11–16</h2>
            <p className="text-[17px]">What information is given about each of the following festival workshops?</p>
            <p className="text-[17px]">Choose SIX answers from the box and write the correct letter, A-H, next to Questions 11-16.</p>
          </div>
          <button className="flex items-center gap-1 text-[13px] text-[#1a5fb4] hover:underline font-semibold mt-1">
            <Keyboard className="w-4 h-4" />
            <span>Help</span>
          </button>
        </div>

        <div className="flex gap-8 items-start">
          {/* People list column */}
          <div className="flex flex-col gap-4">
            <div className="font-bold text-[17px] mb-1">Festival workshops</div>
            {people.map((person) => {
              const assignedLetter = answers[String(person.id)];
              const displayText = letterToOptionMap[assignedLetter];
              const isFocused = currentQ === person.id;

              return (
                <div key={person.id} className="flex items-center gap-2 h-[32px]">
                  <span className="text-[17px] text-black">{person.name}</span>
                  <div
                    ref={(el) => {
                      if (el && qRefs) qRefs.current[person.id] = el;
                    }}
                    onClick={() => handleSlotClick(person.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, person.id)}
                    draggable={!!assignedLetter}
                    onDragStart={(e) => assignedLetter && handleDragStart(e, displayText)}
                    className={`h-[24px] rounded-md transition-all flex items-center justify-center cursor-pointer text-[17px] whitespace-nowrap ${
                      assignedLetter
                        ? "w-auto px-3 border-2 border-[#1a5fb4] bg-white cursor-grab active:cursor-grabbing"
                        : `w-[120px] border border-dashed bg-white ${
                            isFocused
                              ? "border-2 border-dashed border-[#1a5fb4]"
                              : "border-gray-500 text-gray-800 font-bold"
                          }`
                    }`}
                  >
                    {displayText || person.id}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Options pool column */}
          <div className="flex flex-col gap-3" onDragOver={handleDragOver} onDrop={handleDropToPool}>
            <div className="font-semibold text-[17px] mb-1">Information</div>
            <div className="flex flex-col gap-2">
              {poolOptions1.map((opt) => {
                const placed = isOptionPlaced(opt);
                const isSelected = selectedOption === opt;

                return (
                  <div
                    key={opt}
                    draggable={!placed}
                    onDragStart={(e) => handleDragStart(e, opt)}
                    onClick={() => !placed && handleOptionClick(opt)}
                    className={`px-2.5 py-0.2 border border-gray-600 text-[14px] rounded-[4px] select-none transition-all w-fit ${
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

      {/* ----------------- Q17-20 ----------------- */}
      <div className="pt-12">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-bold text-[16px] mb-1">Questions 17 And 18</h2>
            <p className="text-[17px]">Choose TWO letters, A-E.</p>
          </div>
          <button className="flex items-center gap-1 text-[13px] text-[#1a5fb4] hover:underline font-semibold mt-1">
            <Keyboard className="w-4 h-4" />
            <span>Help</span>
          </button>
        </div>

        {/* ----------------- Q17-18 ----------------- */}
        <div
          className="mb-12 border-b border-gray-100 pb-8"
          ref={(el) => {
            if (el && qRefs) qRefs.current[17] = el;
          }}
        >
          <div className="flex flex-col gap-3 mt-4 ml-2">
            {[
              { letter: "A", text: "It will appeal to both boys and girls." },
              { letter: "B", text: "The author is well known." },
              { letter: "C", text: "It has colourful illustrations." },
              { letter: "D", text: "It is funny." },
              { letter: "E", text: "It deals with an important topic." },
            ].map((item) => {
              const isChecked = answers["17"] === item.letter || answers["18"] === item.letter;
              const totalSelected = (answers["17"] ? 1 : 0) + (answers["18"] ? 1 : 0);
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
                    onChange={() => handleCheckboxChange("17-18", item.letter)}
                    className="mt-1 w-4 h-4 text-[#1a5fb4] border-gray-300 rounded focus:ring-[#1a5fb4]"
                  />
                  <span className="text-[17px]">
                    <strong className="mr-2">{item.letter}</strong> {item.text}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* ----------------- Q19-20 ----------------- */}
        <div
          className="mb-16"
          ref={(el) => {
            if (el && qRefs) qRefs.current[19] = el;
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="font-bold text-[16px] mb-1">Questions 19 and 20</h2>
              <p className="text-[17px] text-gray-800">
                Choose <strong>TWO</strong> letters, A–E.
              </p>
              <p className="text-[17px] mt-2 text-gray-800">
                Which <strong>TWO</strong> pieces of advice does the speaker give to parents about reading?
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4 ml-2">
            {[
              { letter: "A", text: "Encourage children to write down new vocabulary." },
              { letter: "B", text: "Allow children to listen to audio books." },
              { letter: "C", text: "Get recommendations from librarians." },
              { letter: "D", text: "Give children a choice about what they read." },
              { letter: "E", text: "Only read aloud to children until they can read independently." },
            ].map((item) => {
              const isChecked = answers["19"] === item.letter || answers["20"] === item.letter;
              const totalSelected = (answers["19"] ? 1 : 0) + (answers["20"] ? 1 : 0);
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
                    onChange={() => handleCheckboxChange("19-20", item.letter)}
                    className="mt-1 w-4 h-4 text-[#1a5fb4] border-gray-300 rounded focus:ring-[#1a5fb4]"
                  />
                  <span className="text-[17px]">
                    <strong className="mr-2">{item.letter}</strong> {item.text}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}