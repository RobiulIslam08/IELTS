// @ts-nocheck
import { useEffect, useRef } from "react";
import NumberedInput from "./NumberedInput";

const PARAGRAPHS = ["A", "B", "C", "D", "E", "F", "G", "H"];

const QUESTIONS_14_17 = [
  { num: 14, text: "reference to the need to ensure that inhabitants of wetland regions continue to benefit from them" },
  { num: 15, text: "the proportion of wetlands which have already been lost" },
  { num: 16, text: "reference to the idea that people are beginning to appreciate the value of wetlands" },
  { num: 17, text: "mention of the cultural significance of wetlands" },
];

const EXPERT_QUESTIONS = [
  { num: 23, text: "Communities living in wetland regions must be included in discussions about the future of these areas." },
  { num: 24, text: "Official policies towards wetlands vary from one nation to the next." },
  { num: 25, text: "People cause harm to wetlands without having any intention to do so." },
  { num: 26, text: "Initiatives to reverse environmental damage need not be complex." },
];

const EXPERTS = [
  { id: "A", name: "Matthew McCartney" },
  { id: "B", name: "Pieter van Eijk" },
  { id: "C", name: "Marcel Silvius" },
  { id: "D", name: "Dave Tickner" },
];

function DraggableParagraph({ letter, used }) {
  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/paragraph", letter)}
      className={`border border-gray-400 rounded-md w-10 h-10 flex items-center justify-center font-bold text-lg cursor-grab bg-white shadow-sm transition hover:bg-gray-50 active:cursor-grabbing ${
        used ? "opacity-30" : ""
      }`}
    >
      {letter}
    </div>
  );
}

export default function Part2({ answers, setAnswer, currentQ, setCurrentQ, qRefs, registerQRef }) {
  // Clear any existing dropped letter if dropped elsewhere
  const handleDrop = (e, qNum) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData("text/paragraph");
    if (!letter) return;

    // Remove this paragraph selection from any other question in 14-17 (enforce 1-to-1 matching if preferred)
    [14, 15, 16, 17].forEach((num) => {
      if (answers[String(num)] === letter) {
        setAnswer(String(num), null);
      }
    });

    setAnswer(String(qNum), letter);
    setCurrentQ(qNum);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeDropped = (qNum) => {
    setAnswer(String(qNum), null);
  };

  const usedParagraphs = [14, 15, 16, 17].map((n) => answers[String(n)]).filter(Boolean);

  return (
    <>
      {/* SECTION 1: Questions 14-17 (Paragraph Matching with Drag and Drop) */}
      <div
        ref={(el) => {
          if (!el || !registerQRef) return;
          [14, 15, 16, 17].forEach((n) => registerQRef(n, el));
        }}
        className="mb-8"
      >
        <h3 className="font-bold text-[17px] mb-1">Questions 14–17</h3>
        <p className="text-[17px] mb-4 italic text-gray-600">
          Reading Passage 2 has eight paragraphs, <span className="font-bold">A–H</span>. Which paragraph contains the following information?
        </p>

        {/* Draggable options list */}
        <div className="flex flex-wrap gap-2 mb-6 p-3 bg-gray-100 rounded-lg border border-dashed border-gray-300">
          <span className="w-full text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Drag a paragraph letter to its corresponding question:
          </span>
          {PARAGRAPHS.map((letter) => (
            <DraggableParagraph key={letter} letter={letter} used={usedParagraphs.includes(letter)} />
          ))}
        </div>

        {/* Drop zones */}
        <div className="space-y-4">
          {QUESTIONS_14_17.map((q) => {
            const currentVal = answers[String(q.num)];
            return (
              <div
                key={q.num}
                className={`flex gap-4 items-center p-3 rounded-lg border transition ${
                  currentQ === q.num ? "border-blue-500 bg-blue-50/30" : "border-gray-200"
                }`}
                onClick={() => setCurrentQ(q.num)}
              >
                <span className="font-bold text-[17px] min-w-[24px] text-gray-700">{q.num}</span>
                <span className="flex-1 text-[16px] leading-relaxed text-gray-800">{q.text}</span>
                
                {/* Droppable target box */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, q.num)}
                  className={`w-12 h-12 rounded-md border-2 border-dashed flex items-center justify-center font-bold text-lg relative transition ${
                    currentVal
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                      : "border-gray-300 bg-gray-50 text-gray-400 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  {currentVal ? (
                    <>
                      {currentVal}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeDropped(q.num);
                        }}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] hover:bg-red-600 shadow"
                        title="Clear selection"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    "?"
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <hr className="my-8 border-gray-200" />

      {/* SECTION 2: Questions 18-22 (Sentence Completion) */}
      <div
        ref={(el) => {
          if (!el || !registerQRef) return;
          [18, 19, 20, 21, 22].forEach((n) => registerQRef(n, el));
        }}
        className="mb-8"
      >
        <h3 className="font-bold text-[17px] mb-1">Questions 18–22</h3>
        <p className="text-[17px] mb-2">Complete the sentences below.</p>
        <h4 className="font-bold text-[16px] text-emerald-700 mb-4 uppercase tracking-wider">
          Choose ONE WORD ONLY from the passage for each answer.
        </h4>

        <div className="space-y-6 text-[17px] leading-loose text-gray-800 bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
          <div>
            <span className="font-bold text-gray-500 mr-2">18</span>
            Peatlands which have been drained begin to release
            <NumberedInput num={18} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
            instead of storing it.
          </div>

          <div>
            <span className="font-bold text-gray-500 mr-2">19</span>
            Once peatland areas have been cleared,
            <NumberedInput num={19} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
            are more likely to occur.
          </div>

          <div>
            <span className="font-bold text-gray-500 mr-2">20</span>
            Clearing peatland forests to make way for oil palm plantations destroys the
            <NumberedInput num={20} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
            of the local environment.
          </div>

          <div>
            <span className="font-bold text-gray-500 mr-2">21</span>
            Water is drained out of peatlands through the
            <NumberedInput num={21} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
            which are created by logging companies.
          </div>

          <div>
            <span className="font-bold text-gray-500 mr-2">22</span>
            Draining peatlands leads to
            <NumberedInput num={22} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
            : a serious problem which can eventually result in coastal flooding and land loss.
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-200" />

      {/* SECTION 3: Questions 23-26 (Expert Matching) */}
      <div
        ref={(el) => {
          if (!el || !registerQRef) return;
          [23, 24, 25, 26].forEach((n) => registerQRef(n, el));
        }}
        className="mb-8"
      >
        <h3 className="font-bold text-[17px] mb-1">Questions 23–26</h3>
        <p className="text-[17px] mb-3 italic text-gray-600">
          Match each statement with the correct expert, <span className="font-bold">A–D</span>.
        </p>

        {/* Reference Table of Experts */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h5 className="font-bold text-[14px] text-gray-700 uppercase tracking-wider mb-2">List of Experts</h5>
          <div className="grid grid-cols-2 gap-2">
            {EXPERTS.map((exp) => (
              <div key={exp.id} className="text-sm text-gray-800">
                <span className="font-bold text-blue-600 mr-2">{exp.id}</span>
                {exp.name}
              </div>
            ))}
          </div>
        </div>

        {/* List of statement questions */}
        <div className="space-y-4">
          {EXPERT_QUESTIONS.map((eq) => {
            const currentSelected = answers[String(eq.num)] || "";
            return (
              <div
                key={eq.num}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border transition ${
                  currentQ === eq.num ? "border-blue-500 bg-blue-50/30" : "border-gray-200 bg-white"
                }`}
                onClick={() => setCurrentQ(eq.num)}
              >
                <div className="flex gap-3 items-start flex-1">
                  <span className="font-bold text-[17px] text-gray-700">{eq.num}</span>
                  <span className="text-[16px] text-gray-800 leading-normal">{eq.text}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-500 uppercase">Expert:</span>
                  <select
                    value={currentSelected}
                    onChange={(e) => {
                      setAnswer(String(eq.num), e.target.value || null);
                      setCurrentQ(eq.num);
                    }}
                    className="border border-gray-300 rounded px-3 py-1.5 font-bold text-blue-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    {EXPERTS.map((exp) => (
                      <option key={exp.id} value={exp.id}>
                        {exp.id} ({exp.name.split(" ").pop()})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}