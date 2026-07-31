import { useState } from "react";
import RadioRow from "./RadioRow";

const REASONS = [
  { letter: "A", text: "a lack of confidence" },
  { letter: "B", text: "a dislike of running" },
  { letter: "C", text: "a lack of time" },
];

const MEMBERS = [
  { id: 15, name: "Ceri" },
  { id: 16, name: "James" },
  { id: 17, name: "Leo" },
  { id: 18, name: "Mark" },
];

const letterToText = Object.fromEntries(REASONS.map((r) => [r.letter, r.text]));
const textToLetter = Object.fromEntries(REASONS.map((r) => [r.text, r.letter]));

export default function Part2({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const [draggedOption, setDraggedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (groupKey, letter) => {
    const firstId = groupKey === "11-12" ? "11" : "13";
    const secondId = groupKey === "11-12" ? "12" : "14";
    const val1 = answers[firstId] || "";
    const val2 = answers[secondId] || "";
    const isCurrentlyChecked = val1 === letter || val2 === letter;

    if (isCurrentlyChecked) {
      if (val1 === letter) setAnswer(firstId, "");
      else if (val2 === letter) setAnswer(secondId, "");
    } else if (!val1) {
      setAnswer(firstId, letter);
    } else if (!val2) {
      setAnswer(secondId, letter);
    } else {
      return;
    }

    if (setCurrentQ) setCurrentQ(Number(firstId));
  };

  const isOptionPlaced = (text) => {
    const letter = textToLetter[text];
    for (let i = 15; i <= 18; i++) {
      if (answers[String(i)] === letter) return true;
    }
    return false;
  };

  const placeOption = (questionId, text) => {
    const letterValue = textToLetter[text] || text;
    const prevKey = Object.keys(answers).find((key) => answers[key] === letterValue);
    if (prevKey && Number(prevKey) >= 15 && Number(prevKey) <= 18) {
      setAnswer(prevKey, "");
    }
    setAnswer(String(questionId), letterValue);
    setDraggedOption(null);
    setSelectedOption(null);
    if (setCurrentQ) setCurrentQ(questionId);
  };

  const handleDrop = (e, questionId) => {
    e.preventDefault();
    const text = draggedOption || e.dataTransfer.getData("text/plain");
    if (text) placeOption(questionId, text);
  };

  const renderMultiSelect = (groupKey, options, q1, q2) => (
    <div
      className="mb-12"
      ref={(el) => {
        if (el && qRefs) {
          qRefs.current[Number(q1)] = el;
          qRefs.current[Number(q2)] = el;
        }
      }}
    >
      <div className="flex flex-col gap-3 mt-4 ml-2">
        {options.map((item) => {
          const isChecked = answers[q1] === item.letter || answers[q2] === item.letter;
          const totalSelected = (answers[q1] ? 1 : 0) + (answers[q2] ? 1 : 0);
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
    </div>
  );

  return (
    <div className="mx-auto w-full px-4 text-[15px] text-black pb-32 font-sans select-none">
      <div className="mb-10">
        <h2 className="font-bold text-[16px] mb-1">Questions 11 and 12</h2>
        <p className="text-[17px]">
          Choose <span className="font-bold">TWO</span> letters, <span className="font-bold">A–E</span>.
        </p>
        <p className="text-[17px] mt-2">
          Which <span className="font-bold">TWO</span> problems with some training programmes for new runners does Liz
          mention?
        </p>
        {renderMultiSelect(
          "11-12",
          [
            { letter: "A", text: "There is a risk of serious injury." },
            { letter: "B", text: "They are unsuitable for certain age groups." },
            { letter: "C", text: "They are unsuitable for people with health issues." },
            { letter: "D", text: "It is difficult to stay motivated." },
            { letter: "E", text: "There is a lack of individual support." },
          ],
          "11",
          "12"
        )}
      </div>

      <div className="mb-10">
        <h2 className="font-bold text-[16px] mb-1">Questions 13 and 14</h2>
        <p className="text-[17px]">
          Choose <span className="font-bold">TWO</span> letters, <span className="font-bold">A–E</span>.
        </p>
        <p className="text-[17px] mt-2">
          Which <span className="font-bold">TWO</span> tips does Liz recommend for new runners?
        </p>
        {renderMultiSelect(
          "13-14",
          [
            { letter: "A", text: "doing two runs a week" },
            { letter: "B", text: "running in the evening" },
            { letter: "C", text: "going on runs with a friend" },
            { letter: "D", text: "listening to music during runs" },
            { letter: "E", text: "running very slowly" },
          ],
          "13",
          "14"
        )}
      </div>

      <div className="mb-12">
        <h2 className="font-bold text-[16px] mb-1">Questions 15–18</h2>
        <p className="text-[17px] mb-4">
          What reason prevented each of the following members of the Compton Park Runners Club from joining until
          recently? Choose the correct reason and move it into the gap.
        </p>

        <div className="flex gap-8 items-start">
          <div className="flex flex-col gap-4">
            <div className="font-bold text-[17px] mb-1">Club members</div>
            {MEMBERS.map((person) => {
              const assignedLetter = answers[String(person.id)];
              const displayText = letterToText[assignedLetter];
              const isFocused = currentQ === person.id;
              return (
                <div key={person.id} className="flex items-center gap-2 h-[32px]">
                  <span className="text-[17px] font-bold min-w-[24px]">{person.id}</span>
                  <span className="text-[17px] min-w-[80px]">{person.name}</span>
                  <div
                    ref={(el) => {
                      if (el && qRefs) qRefs.current[person.id] = el;
                    }}
                    onClick={() => {
                      if (selectedOption) placeOption(person.id, selectedOption);
                      else if (assignedLetter) setAnswer(String(person.id), "");
                      if (setCurrentQ) setCurrentQ(person.id);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, person.id)}
                    className={`h-[24px] rounded-md transition-all flex items-center justify-center cursor-pointer text-[17px] whitespace-nowrap ${
                      assignedLetter
                        ? "w-auto px-3 border-2 border-[#1a5fb4] bg-white"
                        : `w-[120px] border border-dashed bg-white ${
                            isFocused ? "border-2 border-[#1a5fb4]" : "border-gray-500"
                          }`
                    }`}
                  >
                    {displayText || person.id}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="flex flex-col gap-2"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const text = draggedOption || e.dataTransfer.getData("text/plain");
              if (!text) return;
              const letter = textToLetter[text];
              for (let i = 15; i <= 18; i++) {
                if (answers[String(i)] === letter) setAnswer(String(i), "");
              }
              setDraggedOption(null);
              setSelectedOption(null);
            }}
          >
            <div className="font-semibold text-[17px] mb-1">Reasons</div>
            {REASONS.map((opt) => {
              const placed = isOptionPlaced(opt.text);
              const isSelected = selectedOption === opt.text;
              return (
                <div
                  key={opt.letter}
                  draggable={!placed}
                  onDragStart={(e) => {
                    setDraggedOption(opt.text);
                    e.dataTransfer.setData("text/plain", opt.text);
                  }}
                  onClick={() => !placed && setSelectedOption((p) => (p === opt.text ? null : opt.text))}
                  className={`px-2.5 py-0.5 border border-gray-600 text-[14px] rounded-[4px] select-none w-fit ${
                    placed
                      ? "opacity-0 pointer-events-none"
                      : isSelected
                      ? "bg-[#e3effd] border cursor-grab font-semibold"
                      : "bg-white hover:bg-gray-50 cursor-grab"
                  }`}
                >
                  {opt.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-[16px] mb-1">Questions 19 and 20</h2>
        <p className="text-[17px] mb-4">
          Choose the correct letter, <span className="font-bold">A, B or C</span>.
        </p>

        {[
          {
            id: 19,
            text: "What does Liz say about running her first marathon?",
            options: [
              { value: "A", label: "A It had always been her ambition." },
              { value: "B", label: "B Her husband persuaded her to do it." },
              { value: "C", label: "C She nearly gave up before the end." },
            ],
          },
          {
            id: 20,
            text: "Liz says new runners should sign up for a race",
            options: [
              { value: "A", label: "A every six months." },
              { value: "B", label: "B within a few weeks of taking up running." },
              { value: "C", label: "C after completing several practice runs." },
            ],
          },
        ].map((q) => (
          <div
            key={q.id}
            className="mb-8"
            ref={(el) => {
              if (el && qRefs) qRefs.current[q.id] = el;
            }}
          >
            <div className="text-[17px] font-medium flex items-start gap-2 mb-2">
              <span className="font-bold min-w-[24px]">{q.id}</span>
              <p>{q.text}</p>
            </div>
            {q.options.map((opt) => (
              <RadioRow
                key={opt.value}
                name={`q${q.id}`}
                value={opt.value}
                label={opt.label}
                selected={answers[String(q.id)]}
                onSelect={(v) => {
                  setAnswer(String(q.id), v);
                  if (setCurrentQ) setCurrentQ(q.id);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
