// @ts-nocheck
import RadioRow from "./RadioRow";

const MCQ_QUESTIONS = [
  {
    num: 27,
    question: "What point does the writer make about misinformation in the first paragraph?",
    options: [
      { id: "A", label: "Misinformation is a relatively recent phenomenon." },
      { id: "B", label: "Some people find it easy to identify misinformation." },
      { id: "C", label: "Misinformation changes as it is passed from one person to another." },
      { id: "D", label: "There may be a number of reasons for the spread of misinformation." },
    ],
  },
  {
    num: 28,
    question: "What does the writer say about the role of technology?",
    options: [
      { id: "A", label: "It may at some point provide us with a solution to misinformation." },
      { id: "B", label: "It could fundamentally alter the way in which people regard information." },
      { id: "C", label: "It has changed the way in which organisations use misinformation." },
      { id: "D", label: "It has made it easier for people to check whether information is accurate." },
    ],
  },
  {
    num: 29,
    question: "What is the writer doing in the fourth paragraph?",
    options: [
      { id: "A", label: "comparing the different opinions people have of misinformation" },
      { id: "B", label: "explaining how the effects of misinformation have changed over time" },
      { id: "C", label: "outlining which issues connected with misinformation are significant today" },
      { id: "D", label: "describing the attitude of policy makers towards misinformation in the media" },
    ],
  },
  {
    num: 30,
    question: "What point does the writer make about regulation in the USA?",
    options: [
      { id: "A", label: "The guidelines issued by the FDA need to be simplified." },
      { id: "B", label: "Regulation does not affect people's opinions of new prescription drugs." },
      { id: "C", label: "The USA has more regulatory bodies than most other countries." },
      { id: "D", label: "Regulation fails to prevent misinformation from appearing in the media." },
    ],
  },
];

const PHRASES = [
  { id: "A", text: "constant conflict" },
  { id: "B", text: "additional evidence" },
  { id: "C", text: "different locations" },
  { id: "D", text: "experimental subjects" },
  { id: "E", text: "short period" },
  { id: "F", text: "extreme distrust" },
  { id: "G", text: "frequent exposure" },
  { id: "H", text: "mental operation" },
  { id: "I", text: "dubious reason" },
  { id: "J", text: "different ideas" },
];

const SUMMARY_SLOTS = [31, 32, 33, 34, 35, 36];

const YN_QUESTIONS = [
  "Campaigns designed to correct misinformation will fail to achieve their purpose if people are unable to understand them.",
  "Attempts to teach elementary school students about misinformation have been opposed.",
  "It may be possible to overcome the problem of misinformation in a relatively short period.",
  "The need to keep up with new information is hugely exaggerated in today's world.",
];

function findPhrase(id) {
  return PHRASES.find((p) => p.id === id);
}

function findSlotWithPhrase(answers, phraseId, excludeSlot) {
  return SUMMARY_SLOTS.find(
    (slot) => slot !== excludeSlot && answers[String(slot)] === phraseId
  );
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
            <strong>{placed.id}</strong> {placed.text}
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
      <span className="mr-1.5">{id}</span>
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
      {/* Questions 27–30 — Multiple choice */}
      <h3 className="font-bold text-[17px] mb-1">Questions 27–30</h3>
      <p className="mb-1 leading-[1.5] text-[17px] text-black">
        Choose the correct letter, <strong>A</strong>, <strong>B</strong>, <strong>C</strong> or{" "}
        <strong>D</strong>.
      </p>
      <p className="mb-5 leading-[1.5] text-[17px] text-black">
        Write the correct letter in boxes 27–30 on your answer sheet.
      </p>

      <div className="space-y-6">
        {MCQ_QUESTIONS.map((q) => {
          const key = String(q.num);
          const selected = answers[key];
          return (
            <div
              key={q.num}
              ref={(el) => {
                if (qRefs) qRefs.current[q.num] = el;
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
                <span className="leading-[1.4] text-[17px] font-medium text-black mt-[1px]">
                  {q.question}
                </span>
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

      {/* Questions 31–36 — Summary + side List of Phrases (drag & drop) */}
      <h3 className="font-bold text-[17px] mb-1 mt-8">Questions 31–36</h3>
      <p className="mb-1 text-[17px]">
        Complete the summary using the list of phrases, <strong>A–J</strong>, on the right.
      </p>
      <p className="mb-4 text-[17px]">
        Drag the correct phrase into each gap. Write the correct letter, <strong>A–J</strong>, in
        boxes 31–36 on your answer sheet.
      </p>

      <div className="flex flex-col lg:flex-row gap-4 mb-6 items-start">
        {/* Summary — left */}
        <div className="border border-black px-4 py-4 flex-1 min-w-0 w-full">
          <h4 className="font-bold text-[17px] text-center mb-4">
            What happens when people encounter misinformation?
          </h4>
          <p className="text-[17px] leading-[1.8]">
            Although people have
            <PhraseDrop
              num={31}
              answers={answers}
              setAnswer={setAnswer}
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}
              qRefs={qRefs}
            />
            to misinformation, there is debate about precisely how and when we label something as
            true or untrue. The philosophers Descartes and Spinoza had
            <PhraseDrop
              num={32}
              answers={answers}
              setAnswer={setAnswer}
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}
              qRefs={qRefs}
            />
            about how people engage with information. While Descartes believed that people accept or
            reject information after considering whether it is true or not, Spinoza argued that
            people accepted <em>all</em> information they encountered (and by default
            misinformation) and did not verify or reject it until afterwards. Moreover, Spinoza
            believed that a distinct
            <PhraseDrop
              num={33}
              answers={answers}
              setAnswer={setAnswer}
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}
              qRefs={qRefs}
            />
            is involved in these stages. Recent research has provided
            <PhraseDrop
              num={34}
              answers={answers}
              setAnswer={setAnswer}
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}
              qRefs={qRefs}
            />
            for Spinoza's theory and it would appear that people accept all encountered information
            as if it were true, even if this is for an extremely
            <PhraseDrop
              num={35}
              answers={answers}
              setAnswer={setAnswer}
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}
              qRefs={qRefs}
            />
            , and do not label the information as true or false until later. This is consistent with
            the fact that the resources for scepticism and the resources for perceiving and encoding
            are in
            <PhraseDrop
              num={36}
              answers={answers}
              setAnswer={setAnswer}
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}
              qRefs={qRefs}
            />
            in the brain.
          </p>
        </div>

        {/* List of Phrases — side */}
        <div
          className="border border-black px-3 py-3 w-full lg:w-[240px] shrink-0 lg:sticky lg:top-2"
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
          <p className="text-[12px] text-gray-500 mt-2 leading-snug">
            Drag a phrase into a gap. Click a placed phrase to remove it.
          </p>
        </div>
      </div>

      {/* Questions 37–40 — YES / NO / NOT GIVEN */}
      <h3 className="font-bold text-[17px] mb-1 mt-8">Questions 37–40</h3>
      <p className="mb-1 leading-[1.5] text-[17px] text-black">
        Do the following statements agree with the claims of the writer in Reading Passage 3?
      </p>
      <p className="mb-2 leading-[1.5] text-[17px] text-black">
        In boxes 37–40 on your answer sheet, write
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

      <div className="space-y-5">
        {YN_QUESTIONS.map((q, idx) => {
          const num = idx + 37;
          const key = String(num);
          const selected = answers[key];
          return (
            <div
              key={num}
              ref={(el) => {
                if (qRefs) qRefs.current[num] = el;
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
    </>
  );
}
