import { useState } from "react";

const LOCATIONS = [
  { letter: "A", text: "near the entrance" },
  { letter: "B", text: "in the attic" },
  { letter: "C", text: "at the back of the shop" },
  { letter: "D", text: "on a high shelf" },
  { letter: "E", text: "near the stairs" },
  { letter: "F", text: "in a specially designed space" },
  { letter: "G", text: "within the café" },
];

const BOOK_TYPES = [
  { id: 26, name: "rare books" },
  { id: 27, name: "children's books" },
  { id: 28, name: "unwanted books" },
  { id: 29, name: "requested books" },
  { id: 30, name: "coursebooks" },
];

const letterToText = Object.fromEntries(LOCATIONS.map((o) => [o.letter, o.text]));
const textToLetter = Object.fromEntries(LOCATIONS.map((o) => [o.text, o.letter]));

export default function Part3({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const [draggedOption, setDraggedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const mcqQuestions = [
    {
      id: 21,
      question: "Kieran thinks the packing advice given by Jane's grandfather is",
      options: [
        { letter: "A", text: "common sense." },
        { letter: "B", text: "hard to follow." },
        { letter: "C", text: "over-protective." },
      ],
    },
    {
      id: 22,
      question: "How does Jane feel about the books her grandfather has given her?",
      options: [
        { letter: "A", text: "They are not worth keeping." },
        { letter: "B", text: "They should go to a collector." },
        { letter: "C", text: "They have sentimental value for her." },
      ],
    },
    {
      id: 23,
      question: "Jane and Kieran agree that hardback books should be",
      options: [
        { letter: "A", text: "put out on display." },
        { letter: "B", text: "given as gifts to visitors." },
        { letter: "C", text: "more attractively designed." },
      ],
    },
    {
      id: 24,
      question: "While talking about taking a book from a shelf, Jane",
      options: [
        { letter: "A", text: "describes the mistakes other people make doing it." },
        { letter: "B", text: "reflects on a significant childhood experience." },
        { letter: "C", text: "explains why some books are easier to remove than others." },
      ],
    },
    {
      id: 25,
      question: "What do Jane and Kieran suggest about new books?",
      options: [
        { letter: "A", text: "Their parents liked buying them as presents." },
        { letter: "B", text: "They would like to buy more of them." },
        { letter: "C", text: "Not everyone can afford them." },
      ],
    },
  ];

  const isOptionPlaced = (text) => {
    const letter = textToLetter[text];
    for (let i = 26; i <= 30; i++) {
      if (answers[String(i)] === letter) return true;
    }
    return false;
  };

  const placeOption = (questionId, text) => {
    const letterValue = textToLetter[text] || text;
    const prevKey = Object.keys(answers).find((key) => answers[key] === letterValue);
    if (prevKey && Number(prevKey) >= 26 && Number(prevKey) <= 30) {
      setAnswer(prevKey, "");
    }
    setAnswer(String(questionId), letterValue);
    setDraggedOption(null);
    setSelectedOption(null);
    if (setCurrentQ) setCurrentQ(questionId);
  };

  return (
    <div className="mx-auto w-full px-4 text-[15px] text-black pb-32 font-sans select-none">
      <div className="mb-16">
        <h2 className="font-bold text-[17px] mb-1">Questions 21–25</h2>
        <p className="text-[17px] mb-6">
          Choose the correct letter, <span className="font-bold">A, B or C</span>.
        </p>

        <div className="flex flex-col gap-8">
          {mcqQuestions.map((q) => (
            <div
              key={q.id}
              ref={(el) => {
                if (el && qRefs) qRefs.current[q.id] = el;
              }}
            >
              <div className="text-[17px] font-medium flex items-start gap-2 mb-2">
                <span className="font-bold min-w-[24px]">{q.id}</span>
                <p>{q.question}</p>
              </div>
              <div className="flex flex-col gap-2 ml-8">
                {q.options.map((opt) => {
                  const isSelected = answers[String(q.id)] === opt.letter;
                  return (
                    <label
                      key={opt.letter}
                      className="flex items-start gap-3 cursor-pointer py-1 hover:bg-gray-50"
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
                        className="mt-1 w-4 h-4 text-[#1a5fb4]"
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

      <div>
        <h2 className="font-bold text-[17px] mb-1">Questions 26–30</h2>
        <p className="text-[17px] mb-2">
          Where does Jane&apos;s grandfather keep each of the following types of books in his shop?
        </p>
        <p className="text-[17px] mb-6">
          Choose <span className="font-bold">FIVE</span> answers from the box and write the correct letter next to
          Questions 26–30.
        </p>

        <div className="flex gap-8 items-start">
          <div className="flex flex-col gap-4">
            <div className="font-bold text-[17px]">Types of books</div>
            {BOOK_TYPES.map((item) => {
              const assignedLetter = answers[String(item.id)];
              const displayText = letterToText[assignedLetter];
              const isFocused = currentQ === item.id;
              return (
                <div key={item.id} className="flex items-center gap-2">
                  <span className="text-[17px] font-bold min-w-[24px]">{item.id}</span>
                  <span className="text-[17px] min-w-[140px]">{item.name}</span>
                  <div
                    ref={(el) => {
                      if (el && qRefs) qRefs.current[item.id] = el;
                    }}
                    onClick={() => {
                      if (selectedOption) placeOption(item.id, selectedOption);
                      else if (assignedLetter) setAnswer(String(item.id), "");
                      if (setCurrentQ) setCurrentQ(item.id);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const text = draggedOption || e.dataTransfer.getData("text/plain");
                      if (text) placeOption(item.id, text);
                    }}
                    className={`h-[24px] rounded-md flex items-center justify-center cursor-pointer text-[17px] whitespace-nowrap ${
                      assignedLetter
                        ? "w-auto px-3 border-2 border-[#1a5fb4] bg-white"
                        : `w-[140px] border border-dashed bg-white ${
                            isFocused ? "border-2 border-[#1a5fb4]" : "border-gray-500"
                          }`
                    }`}
                  >
                    {displayText || item.id}
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
              for (let i = 26; i <= 30; i++) {
                if (answers[String(i)] === letter) setAnswer(String(i), "");
              }
              setDraggedOption(null);
              setSelectedOption(null);
            }}
          >
            <div className="font-semibold text-[17px] mb-1">Location of books</div>
            {LOCATIONS.map((opt) => {
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
                  className={`px-2.5 py-0.5 border border-gray-600 text-[14px] rounded-[4px] w-fit select-none ${
                    placed
                      ? "opacity-0 pointer-events-none"
                      : isSelected
                      ? "bg-[#e3effd] cursor-grab font-semibold"
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
    </div>
  );
}
