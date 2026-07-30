// @ts-nocheck
import RadioRow from "./RadioRow";

const MCQ_QUESTIONS = [
  {
    num: 27,
    question: "What does the reader learn about the conversation in the first paragraph?",
    options: [
      { id: "A", label: "A The speakers are communicating in different languages." },
      { id: "B", label: "B Neither of the speakers is familiar with their environment." },
      { id: "C", label: "C The topic of the conversation is difficult for both speakers." },
      { id: "D", label: "D Aspects of the conversation are challenging for both speakers." },
    ],
  },
  {
    num: 28,
    question: "What assists the electronic translator during lectures at Karlsruhe Institute of Technology?",
    options: [
      { id: "A", label: "A the repeated content of lectures" },
      { id: "B", label: "B the students' reading skills" },
      { id: "C", label: "C the languages used" },
      { id: "D", label: "D the lecturers' technical ability" },
    ],
  },
  {
    num: 29,
    question: "When referring to The Hitchhiker's Guide to the Galaxy, the writer suggests that",
    options: [
      { id: "A", label: "A the Babel fish was considered undesirable at the time." },
      { id: "B", label: "B this book was not seriously intending to predict the future." },
      { id: "C", label: "C artificial speech translation was not a surprising development." },
      { id: "D", label: "D some speech translation techniques are better than others." },
    ],
  },
  {
    num: 30,
    question: "What does the writer say about sharing earpieces?",
    options: [
      { id: "A", label: "A It is something people will get used to doing." },
      { id: "B", label: "B The reluctance to do this is understandable." },
      { id: "C", label: "C The equipment will be unnecessary in the future." },
      { id: "D", label: "D It is something few people need to worry about." },
    ],
  },
];

const ENDINGS = [
  { id: "A", text: "but there are concerns about this." },
  { id: "B", text: "as systems do not need to conform to standard practices." },
  { id: "C", text: "but they are far from perfect." },
  { id: "D", text: "despite the noise issues." },
  { id: "E", text: "because translation is immediate." },
  { id: "F", text: "and have an awareness of good manners." },
];

const MATCHING_QUESTIONS = [
  { num: 31, text: "Speech translation methods are developing fast in Japan" },
  { num: 32, text: "TV interviews that use translation voiceover methods are successful" },
  { num: 33, text: "Future translation systems should address people appropriately" },
  { num: 34, text: "Users may be able to maintain their local customs" },
];

const YNNG_QUESTIONS = [
  "Language translation systems will be seen as very useful throughout the academic and professional worlds.",
  "The overall value of automated translation to family life is yet to be shown.",
  "Automated translation could make life more difficult for immigrant families.",
  "Visual aspects of language translation are being considered by scientists.",
  "International scientists have found English easier to translate into other languages than Latin.",
  "As far as language is concerned, there is a difference between people's social and practical needs.",
];

function findEnding(id) {
  return ENDINGS.find((e) => e.id === id);
}

function findSlotWithEnding(answers, endingId, excludeSlot) {
  return MATCHING_QUESTIONS.map((q) => q.num).find(
    (slot) => slot !== excludeSlot && answers[String(slot)] === endingId
  );
}

function getDragEndingId(e) {
  return e.dataTransfer.getData("text/ending") || e.dataTransfer.getData("text/plain");
}

function EndingDrop({ num, answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const placedId = answers[String(num)];
  const placed = placedId ? findEnding(placedId) : null;

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const endingId = getDragEndingId(e);
    if (!endingId || !findEnding(endingId)) return;

    const previousSlot = findSlotWithEnding(answers, endingId, num);
    if (previousSlot) setAnswer(String(previousSlot), null);

    setAnswer(String(num), endingId);
    setCurrentQ(num);
  };

  return (
    <div
      className="mt-2"
      ref={(el) => {
        if (el && qRefs) qRefs.current[num] = el;
      }}
    >
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={onDrop}
        onClick={() => {
          if (placed) setAnswer(String(num), null);
          setCurrentQ(num);
        }}
        className={`inline-flex items-center justify-center min-w-[180px] min-h-[28px] px-2 py-1 text-[14px] cursor-pointer bg-white ${
          num === currentQ || placed
            ? "border-2 border-[#1a5fb4]"
            : "border border-dashed border-gray-500"
        }`}
      >
        {placed ? placed.text : num}
      </div>
    </div>
  );
}

function DraggableEnding({ id, text, used }) {
  return (
    <div
      draggable={!used}
      onDragStart={(e) => {
        if (used) {
          e.preventDefault();
          return;
        }
        e.dataTransfer.setData("text/ending", id);
        e.dataTransfer.setData("text/plain", id);
      }}
      className={`px-2 py-1 border border-gray-500 rounded-[3px] text-[14px] mb-2 w-fit select-none ${
        used
          ? "opacity-0 pointer-events-none"
          : "bg-white cursor-grab active:cursor-grabbing hover:bg-gray-50"
      }`}
    >
      {text}
    </div>
  );
}

export default function Part3({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const usedEndings = MATCHING_QUESTIONS.map((q) => answers[String(q.num)]).filter(Boolean);

  const returnEndingToList = (e) => {
    e.preventDefault();
    const endingId = getDragEndingId(e);
    if (!endingId) return;
    const slot = findSlotWithEnding(answers, endingId, null);
    if (slot) setAnswer(String(slot), null);
  };

  return (
    <>
      <h3 className="font-bold text-[17px] mb-1">Questions 27–30</h3>
      <p className="text-[17px] mb-4 leading-[1.5]">
        Choose the correct letter, <strong>A</strong>, <strong>B</strong>, <strong>C</strong> or{" "}
        <strong>D</strong>.
      </p>

      <div className="space-y-5">
        {MCQ_QUESTIONS.map((q) => {
          const key = String(q.num);
          const selected = answers[key];
          return (
            <div
              key={q.num}
              ref={(el) => {
                if (qRefs?.current) qRefs.current[q.num] = el;
              }}
            >
              <div className="flex gap-2 items-start mb-2">
                <span
                  className={`inline-flex items-center justify-center min-w-[22px] h-[20px] px-1 border text-[12px] font-semibold ${
                    q.num === currentQ
                      ? "border-[#1a5fb4] border-2 text-[#1a5fb4]"
                      : "border-gray-500"
                  }`}
                >
                  {q.num}
                </span>
                <span className="leading-[1.5]">{q.question}</span>
              </div>
              <div>
                {q.options.map((opt) => (
                  <RadioRow
                    key={opt.id}
                    name={`q${q.num}`}
                    value={opt.id}
                    label={opt.label}
                    selected={selected}
                    onSelect={(v) => {
                      setCurrentQ(q.num);
                      setAnswer(key, v);
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="font-bold text-[17px] mb-1 mt-8">Questions 31–34</h3>
      <p className="text-[17px] mb-4 leading-[1.5]">
        Complete each sentence with the correct ending below.
      </p>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 space-y-5">
          {MATCHING_QUESTIONS.map((q) => (
            <div key={q.num}>
              <div className="flex gap-2 items-start">
                <span
                  className={`inline-flex items-center justify-center min-w-[22px] h-[20px] px-1 border text-[12px] font-semibold ${
                    q.num === currentQ
                      ? "border-[#1a5fb4] border-2 text-[#1a5fb4]"
                      : "border-gray-500"
                  }`}
                >
                  {q.num}
                </span>
                <span className="leading-[1.5]">{q.text}</span>
              </div>
              <EndingDrop
                num={q.num}
                answers={answers}
                setAnswer={setAnswer}
                currentQ={currentQ}
                setCurrentQ={setCurrentQ}
                qRefs={qRefs}
              />
            </div>
          ))}
        </div>

        <div
          className="px-3 py-3 w-full lg:w-[280px] shrink-0 lg:sticky lg:top-2"
          onDragOver={(e) => e.preventDefault()}
          onDrop={returnEndingToList}
        >
          <p className="font-semibold text-[16px] mb-2">Endings</p>
          <div className="flex flex-col">
            {ENDINGS.map((e) => (
              <DraggableEnding key={e.id} id={e.id} text={e.text} used={usedEndings.includes(e.id)} />
            ))}
          </div>
          <p className="text-[13px] text-gray-600 mt-3 leading-[1.4]">
            Drag an ending into a gap. Click a placed ending to remove it.
          </p>
        </div>
      </div>

      <h3 className="font-bold text-[17px] mb-1 mt-8">Questions 35–40</h3>
      <p className="text-[17px] mb-2 leading-[1.5]">
        Do the following statements agree with the views of the writer in Reading Passage 3?
      </p>
      <p className="text-[17px] mb-4 leading-[1.5]">
        Choose <strong>YES</strong> if the statement agrees with the views of the writer, <strong>NO</strong> if the
        statement contradicts the views of the writer, or <strong>NOT GIVEN</strong> if it is impossible to say what
        the writer thinks about this.
      </p>

      <div className="space-y-5">
        {YNNG_QUESTIONS.map((q, idx) => {
          const num = idx + 35;
          const key = String(num);
          const selected = answers[key];
          return (
            <div
              key={num}
              ref={(el) => {
                if (qRefs?.current) qRefs.current[num] = el;
              }}
            >
              <div className="flex gap-2 items-start mb-2">
                <span
                  className={`inline-flex items-center justify-center min-w-[22px] h-[20px] px-1 border text-[12px] font-semibold ${
                    num === currentQ
                      ? "border-[#1a5fb4] border-2 text-[#1a5fb4]"
                      : "border-gray-500"
                  }`}
                >
                  {num}
                </span>
                <span className="leading-[1.5]">{q}</span>
              </div>
              <div>
                {["YES", "NO", "NOT GIVEN"].map((opt) => (
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
