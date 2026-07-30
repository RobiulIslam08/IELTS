import { useState } from "react";
import { Keyboard } from "lucide-react";

const FLOW_OPTIONS = [
  { letter: "A", text: "size" },
  { letter: "B", text: "escape" },
  { letter: "C", text: "age" },
  { letter: "D", text: "water" },
  { letter: "E", text: "cereal" },
  { letter: "F", text: "calculations" },
  { letter: "G", text: "changes" },
  { letter: "H", text: "colour" },
];

const letterToText = Object.fromEntries(FLOW_OPTIONS.map((o) => [o.letter, o.text]));
const textToLetter = Object.fromEntries(FLOW_OPTIONS.map((o) => [o.text, o.letter]));

export default function Part3({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const [draggedOption, setDraggedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const isOptionPlaced = (text) => {
    const letter = textToLetter[text];
    for (let i = 26; i <= 30; i++) {
      if (answers[String(i)] === letter) return true;
    }
    return false;
  };

  const handleDragStart = (e, text) => {
    setDraggedOption(text);
    e.dataTransfer.setData("text/plain", text);
  };

  const placeOption = (questionId, text) => {
    const letterValue = textToLetter[text] || text;
    const prevKey = Object.keys(answers).find((key) => answers[key] === letterValue);
    if (prevKey) setAnswer(prevKey, "");
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

  const handleDropToPool = (e) => {
    e.preventDefault();
    const text = draggedOption || e.dataTransfer.getData("text/plain");
    if (text) {
      const letterValue = textToLetter[text] || text;
      const prevKey = Object.keys(answers).find((key) => answers[key] === letterValue);
      if (prevKey) setAnswer(prevKey, "");
      setDraggedOption(null);
      setSelectedOption(null);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleOptionClick = (text) => {
    setSelectedOption((prev) => (prev === text ? null : text));
  };

  const handleSlotClick = (questionId) => {
    const currentVal = answers[String(questionId)];
    if (selectedOption) {
      placeOption(questionId, selectedOption);
    } else if (currentVal) {
      setAnswer(String(questionId), "");
    }
    if (setCurrentQ) setCurrentQ(questionId);
  };

  const renderSlot = (id) => {
    const assignedLetter = answers[String(id)];
    const displayText = letterToText[assignedLetter] || assignedLetter;
    const isFocused = currentQ === id;

    return (
      <div
        ref={(el) => {
          if (el && qRefs) qRefs.current[id] = el;
        }}
        onClick={() => handleSlotClick(id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, id)}
        draggable={!!assignedLetter}
        onDragStart={(e) => assignedLetter && handleDragStart(e, displayText)}
        className={`inline-flex h-[24px] mx-1 min-w-[70px] px-2 rounded-[3px] align-middle transition-all items-center justify-center cursor-pointer whitespace-nowrap font-sans ${
          assignedLetter
            ? "border border-gray-400 bg-white cursor-grab active:cursor-grabbing text-black text-[17px]"
            : isFocused
            ? "border border-dashed border-[#1a5fb4] text-[#1a5fb4] font-bold text-[17px]"
            : "border border-dashed border-gray-500 text-black font-bold text-[17px]"
        }`}
      >
        {displayText || id}
      </div>
    );
  };

  const mcqQuestions = [
    {
      id: 21,
      question: "How does Clare feel about the students in her Year 12 science class?",
      options: [
        { letter: "A", text: "worried that they are not making progress" },
        { letter: "B", text: "challenged by their poor behaviour in class" },
        { letter: "C", text: "frustrated at their lack of interest in the subject" },
      ],
    },
    {
      id: 22,
      question: "How does Jake react to Clare's suggestion about an experiment based on children's diet?",
      options: [
        { letter: "A", text: "He is concerned that the results might not be meaningful." },
        { letter: "B", text: "He feels some of the data might be difficult to obtain." },
        { letter: "C", text: "He suspects that the conclusions might be upsetting." },
      ],
    },
    {
      id: 23,
      question: "What problem do they agree may be involved in an experiment involving animals?",
      options: [
        { letter: "A", text: "Any results may not apply to humans." },
        { letter: "B", text: "It may be complicated to get permission." },
        { letter: "C", text: "Students may not be happy about animal experiments." },
      ],
    },
    {
      id: 24,
      question: "What question do they decide the experiment should address?",
      options: [
        { letter: "A", text: "Are mice capable of controlling their food intake?" },
        { letter: "B", text: "Does an increase in sugar lead to health problems?" },
        { letter: "C", text: "How much do supplements of different kinds affect health?" },
      ],
    },
    {
      id: 25,
      question: "Clare might also consider doing another experiment involving",
      options: [
        { letter: "A", text: "other types of food supplement." },
        { letter: "B", text: "different genetic strains of mice." },
        { letter: "C", text: "varying amounts of exercise." },
      ],
    },
  ];

  const ThickArrowDown = () => (
    <div className="flex justify-center w-full my-0.5 text-black">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2v12H6l6 8 6-8h-4V2z" />
      </svg>
    </div>
  );

  return (
    <div className="mx-auto w-full px-4 text-[13px] text-black pb-32 font-sans select-none">
      <div className="mb-20">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-bold text-[17px] mb-1">Questions 21–25</h2>
            <p className="text-[17px]">
              Choose the correct letter, <span className="font-bold">A, B or C</span>.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[13px] text-[#1a5fb4] font-semibold mt-6 cursor-pointer hover:underline">
            <Keyboard className="w-4 h-4" />
            <span>Help</span>
          </div>
        </div>

        <h2 className="font-bold text-[17px] mb-3">Science experiment for Year 12 students</h2>

        <div className="flex flex-col gap-8 mt-6">
          {mcqQuestions.map((q) => (
            <div
              key={q.id}
              className="flex flex-col gap-2"
              ref={(el) => {
                if (el && qRefs) qRefs.current[q.id] = el;
              }}
            >
              <div className="text-[17px] font-medium flex items-start gap-2">
                <span className="font-bold min-w-[24px]">{q.id}</span>
                <p>{q.question}</p>
              </div>

              <div className="flex flex-col gap-2 ml-8 mt-1">
                {q.options.map((opt) => {
                  const isSelected = answers[String(q.id)] === opt.letter;
                  return (
                    <label
                      key={opt.letter}
                      className="flex items-start gap-3 cursor-pointer select-none py-1 rounded-md hover:bg-gray-50 max-w-3xl"
                      onClick={() => {
                        setAnswer(String(q.id), opt.letter);
                        if (setCurrentQ) setCurrentQ(q.id);
                      }}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={isSelected}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 text-[#1a5fb4] border-gray-400 focus:ring-[#1a5fb4]"
                      />
                      <span className="text-[17px]">
                        <strong className="mr-2">{opt.letter}</strong>
                        {opt.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-bold text-[17px] mb-1">Questions 26–30</h2>
            <p className="text-[17px]">
              Complete the flowchart below. Choose <span className="font-bold">FIVE</span> answers from the box and
              write the correct letter next to Questions 26–30.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[13px] text-[#1a5fb4] font-semibold mt-1 cursor-pointer hover:underline">
            <Keyboard className="w-4 h-4" />
            <span>Help</span>
          </div>
        </div>

        <div className="flex gap-8 items-start mt-12">
          <div className="w-[520px]">
            <div className="flex flex-col items-center w-[440px]">
              <div className="border border-black p-1 text-[14px] text-black w-full bg-white flex items-center flex-wrap">
                Choose mice which are all the same {renderSlot(26)}
              </div>
              <ThickArrowDown />
              <div className="border border-black p-1 text-[14px] text-black w-full bg-white flex items-center flex-wrap">
                Divide the mice into two groups, each with a different {renderSlot(27)}
              </div>
              <ThickArrowDown />
              <div className="border border-black p-1 text-[14px] text-black w-full bg-white">
                Put each group in a separate cage. Feed group A commercial mouse food. Feed group B the same, but also
                sugar contained in {renderSlot(28)}
              </div>
              <ThickArrowDown />
              <div className="border border-black p-1 text-[14px] text-black w-full bg-white flex items-center flex-wrap">
                Take measurements using an electronic scale. Place them in a weighing chamber to prevent{" "}
                {renderSlot(29)}
              </div>
              <ThickArrowDown />
              <div className="border border-black p-1 text-[14px] text-black w-full bg-white flex items-center flex-wrap">
                Do all necessary {renderSlot(30)}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[6px] items-start mt-6" onDragOver={handleDragOver} onDrop={handleDropToPool}>
            {FLOW_OPTIONS.map((opt) => {
              const placed = isOptionPlaced(opt.text);
              const isSelected = selectedOption === opt.text;
              return (
                <div
                  key={opt.letter}
                  draggable={!placed}
                  onDragStart={(e) => handleDragStart(e, opt.text)}
                  onClick={() => !placed && handleOptionClick(opt.text)}
                  className={`px-2 py-[1px] border text-[17px] rounded-[3px] select-none transition-all w-fit ${
                    placed
                      ? "bg-gray-100 border-gray-200 text-transparent cursor-not-allowed opacity-0"
                      : isSelected
                      ? "bg-[#e3effd] border-[#1a5fb4] cursor-grab"
                      : "bg-white border-gray-400 text-black hover:bg-gray-50 cursor-grab active:cursor-grabbing"
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
  );
}
