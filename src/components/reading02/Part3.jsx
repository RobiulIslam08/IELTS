// @ts-nocheck
import RadioRow from "./RadioRow";

const PHRASES = [
  { id: "A", text: "appeal" },
  { id: "B", text: "determined" },
  { id: "C", text: "intrigued" },
  { id: "D", text: "single" },
  { id: "E", text: "achievement" },
  { id: "F", text: "devoted" },
  { id: "G", text: "involved" },
  { id: "H", text: "unique" },
  { id: "I", text: "innovative" },
  { id: "J", text: "satisfaction" },
  { id: "K", text: "intent" },
];

const SUMMARY_SLOTS = [27, 28, 29, 30, 31, 32];

const YN_QUESTIONS = [
  "Many people who ended up winning prestigious intellectual prizes only reached an average standard when young.",
  "Einstein's failures as a young man were due to his lack of confidence.",
  "It is difficult to reach agreement on whether some children are actually born gifted.",
  "Einstein was upset by the public's view of his life's work.",
  "Einstein put his success down to the speed at which he dealt with scientific questions.",
];

const MCQ_QUESTIONS = [
  {
    num: 38,
    question: "What does Eyre believe is needed for children to equal 'gifted' standards?",
    options: [
      { id: "A", label: "strict discipline from the teaching staff" },
      { id: "B", label: "assistance from their peers in the classroom" },
      { id: "C", label: "the development of a spirit of inquiry towards their studies" },
      { id: "D", label: "the determination to surpass everyone else's achievements" },
    ],
  },
  {
    num: 39,
    question: "What is the result of Ericsson's research?",
    options: [
      { id: "A", label: "Very gifted students do not need to work on improving memory skills." },
      { id: "B", label: "Being born with a special gift is not the key factor in becoming expert." },
      { id: "C", label: "Including time for physical exercise is crucial in raising performance." },
      { id: "D", label: "10,000 hours of relevant and demanding work will create a genius." },
    ],
  },
  {
    num: 40,
    question: "In the penultimate paragraph, it is stated the key to some deprived children's success is",
    options: [
      { id: "A", label: "a regular and nourishing diet at home." },
      { id: "B", label: "the loving support of more than one parent." },
      { id: "C", label: "a community which has well-funded facilities for learning." },
      { id: "D", label: "the guidance of someone who recognises the benefits of learning." },
    ],
  },
];

function findPhrase(id) {
  return PHRASES.find((p) => p.id === id);
}

function findSlotWithPhrase(answers, phraseId, excludeSlot) {
  return SUMMARY_SLOTS.find((slot) => slot !== excludeSlot && answers[String(slot)] === phraseId);
}

function getDragPhraseId(e) {
  return e.dataTransfer.getData("text/phrase") || e.dataTransfer.getData("text/plain");
}

function PhraseDrop({ num, answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const placedId = answers[String(num)];
  const placed = placedId ? findPhrase(placedId) : null;

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const phraseId = getDragPhraseId(e);
    if (!phraseId || !findPhrase(phraseId)) return;

    const previousSlot = findSlotWithPhrase(answers, phraseId, num);
    if (previousSlot) setAnswer(String(previousSlot), null);

    setAnswer(String(num), phraseId);
    setCurrentQ(num);
  };

  return (
    <span
      className="relative inline-block align-middle mx-1 my-1"
      ref={(el) => {
        if (el && qRefs) qRefs.current[num] = el;
      }}
    >
      <span
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={onDrop}
        onClick={() => setCurrentQ(num)}
        className={`inline-flex items-center justify-center min-w-[120px] min-h-[24px] px-2 py-0.5 text-[13px] font-semibold cursor-pointer bg-white ${
          num === currentQ || placed
            ? "border-2 border-[#1a5fb4]"
            : "border border-dashed border-gray-500"
        }`}
      >
        {placed ? (
          <span
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/phrase", placed.id);
              e.dataTransfer.setData("text/plain", placed.id);
              e.dataTransfer.setData("text/source", String(num));
              e.dataTransfer.effectAllowed = "move";
            }}
            onClick={(e) => {
              e.stopPropagation();
              setAnswer(String(num), null);
            }}
            className="cursor-grab active:cursor-grabbing"
            title="Click to remove, or drag to move"
          >
            {placed.text}
          </span>
        ) : (
          <span className="text-gray-600 pointer-events-none">{num}</span>
        )}
      </span>
    </span>
  );
}

function DraggablePhrase({ id, text, used }) {
  return (
    <div
      draggable={!used}
      onDragStart={(e) => {
        if (used) {
          e.preventDefault();
          return;
        }
        e.dataTransfer.setData("text/phrase", id);
        e.dataTransfer.setData("text/plain", id);
        e.dataTransfer.effectAllowed = "copy";
      }}
      className={`border border-gray-500 rounded-sm px-2 py-1 my-1 font-bold text-[15px] bg-white select-none ${
        used
          ? "opacity-40 cursor-default"
          : "cursor-grab active:cursor-grabbing hover:bg-gray-50"
      }`}
    >
      {text}
    </div>
  );
}

export default function Part3({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const usedPhrases = PHRASES.map((p) => p.id).filter((id) =>
    SUMMARY_SLOTS.some((slot) => answers[String(slot)] === id)
  );

  const returnPhraseToList = (e) => {
    e.preventDefault();
    const phraseId = getDragPhraseId(e);
    const source = e.dataTransfer.getData("text/source");
    if (source) {
      setAnswer(source, null);
      return;
    }
    if (!phraseId) return;
    SUMMARY_SLOTS.forEach((slot) => {
      if (answers[String(slot)] === phraseId) setAnswer(String(slot), null);
    });
  };

  return (
    <>
      <h3 className="font-bold text-[17px] mb-1">Questions 27–32</h3>
      <p className="mb-1 text-[17px]">Complete the summary using the list of phrases on the right.</p>
      <p className="mb-4 text-[17px]">
        Drag the correct phrase into each gap. Write your answers in boxes 27–32 on your answer sheet.
      </p>

      <div className="flex flex-col lg:flex-row gap-4 mb-6 items-start">
        <div className="px-4 py-4 flex-1 min-w-0 w-full">
          <h4 className="font-bold text-[17px] text-center mb-4">Maryam Mirzakhani</h4>
          <p className="text-[17px] leading-[1.8]">
            Maryam Mirzakhani is regarded as
            <PhraseDrop
              num={27}
              answers={answers}
              setAnswer={setAnswer}
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}
              qRefs={qRefs}
            />
            in the field of mathematics because she was the only female holder of the prestigious Fields
            Medal – a record that she retained at the time of her death. However, maths held little
            <PhraseDrop
              num={28}
              answers={answers}
              setAnswer={setAnswer}
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}
              qRefs={qRefs}
            />
            for her as a child and in fact her performance was below average until she was
            <PhraseDrop
              num={29}
              answers={answers}
              setAnswer={setAnswer}
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}
              qRefs={qRefs}
            />
            by a difficult puzzle that one of her siblings showed her.
          </p>
          <p className="text-[17px] leading-[1.8] mt-3">
            Later, as a professional mathematician, she had an inquiring mind and proved herself to be
            <PhraseDrop
              num={30}
              answers={answers}
              setAnswer={setAnswer}
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}
              qRefs={qRefs}
            />
            when things did not go smoothly. She said she got the greatest
            <PhraseDrop
              num={31}
              answers={answers}
              setAnswer={setAnswer}
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}
              qRefs={qRefs}
            />
            from making ground-breaking discoveries and in fact she was responsible for some extremely
            <PhraseDrop
              num={32}
              answers={answers}
              setAnswer={setAnswer}
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}
              qRefs={qRefs}
            />
            mathematical studies.
          </p>
        </div>

        <div
          className="px-3 py-3 w-full lg:w-[240px] shrink-0 lg:sticky lg:top-2"
          onDragOver={(e) => e.preventDefault()}
          onDrop={returnPhraseToList}
        >
          <p className="font-semibold text-[16px] mb-2">List of Phrases</p>
          <div className="flex flex-col">
            {PHRASES.map((p) => (
              <DraggablePhrase
                key={p.id}
                id={p.id}
                text={p.text}
                used={usedPhrases.includes(p.id)}
              />
            ))}
          </div>
          <p className="text-[13px] text-gray-600 mt-3 leading-[1.4]">
            Drag a phrase into a gap. Click a placed phrase to remove it.
          </p>
        </div>
      </div>

      <h3 className="font-bold text-[17px] mb-1 mt-6">Questions 33–37</h3>
      <p className="mb-1 leading-[1.5] text-[17px] text-black">
        Do the following statements agree with the claims of the writer in Reading Passage 3?
      </p>
      <p className="mb-2 leading-[1.5] text-[17px] text-black">
        In boxes 33–37 on your answer sheet, write
      </p>
      <div className="mb-5 space-y-0.5 text-[17px] text-black pl-1">
        <p>
          <strong>YES</strong> if the statement agrees with the claims of the writer
        </p>
        <p>
          <strong>NO</strong> if the statement contradicts the claims of the writer
        </p>
        <p>
          <strong>NOT GIVEN</strong> if it is impossible to say what the writer thinks about this
        </p>
      </div>

      <div className="space-y-5 mb-8">
        {YN_QUESTIONS.map((q, idx) => {
          const num = idx + 33;
          const key = String(num);
          const selected = answers[key];
          return (
            <div
              key={num}
              ref={(el) => {
                qRefs.current[num] = el;
              }}
            >
              <div className="flex gap-2 items-start mb-2">
                <span
                  className={`inline-flex flex-shrink-0 items-center justify-center min-w-[24px] h-[22px] px-1 border text-[13px] font-semibold ${
                    num === currentQ
                      ? "border-[#1a5fb4] bg-white text-[#1a5fb4]"
                      : "border-gray-400 bg-white text-gray-800"
                  }`}
                >
                  {num}
                </span>
                <span className="leading-[1.4] text-[17px] font-medium text-black mt-[1px]">{q}</span>
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

      <h3 className="font-bold text-[17px] mb-1 mt-6">Questions 38–40</h3>
      <p className="text-[17px] mb-1">
        Choose the correct letter, <strong>A</strong>, <strong>B</strong>, <strong>C</strong> or{" "}
        <strong>D</strong>.
      </p>
      <p className="text-[17px] mb-4">Write the correct letter in boxes 38–40 on your answer sheet.</p>

      <div className="space-y-6">
        {MCQ_QUESTIONS.map((q) => {
          const key = String(q.num);
          const selected = answers[key];
          return (
            <div
              key={q.num}
              ref={(el) => {
                qRefs.current[q.num] = el;
              }}
            >
              <div className="flex gap-2 items-start mb-2">
                <span
                  className={`inline-flex flex-shrink-0 items-center justify-center min-w-[24px] h-[22px] px-1 border text-[13px] font-semibold ${
                    q.num === currentQ
                      ? "border-[#1a5fb4] bg-white text-[#1a5fb4]"
                      : "border-gray-400 bg-white text-gray-800"
                  }`}
                >
                  {q.num}
                </span>
                <span className="leading-[1.4] text-[17px] font-medium text-black mt-[1px]">{q.question}</span>
              </div>
              <div>
                {q.options.map((opt) => (
                  <RadioRow
                    key={opt.id}
                    name={`q${q.num}`}
                    value={opt.id}
                    label={`${opt.id}  ${opt.label}`}
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
    </>
  );
}
