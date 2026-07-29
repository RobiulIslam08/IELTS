// @ts-nocheck
import { useEffect, useRef } from "react";
import CheckboxRow from "./CheckboxRow";
import NumberedInput from "./NumberedInput";

const MATCH_ITEMS = [
  { num: 14, text: "a reference to a denial of involvement in piracy" },
  { num: 15, text: "details of how a campaign to eradicate piracy was carried out" },
  { num: 16, text: "a mention of the circumstances in which states in the ancient world would make use of pirates" },
  { num: 17, text: "a reference to how people today commonly view pirates" },
  { num: 18, text: "an explanation of how some people were encouraged not to return to piracy" },
  { num: 19, text: "a mention of the need for many sailing vessels to stay relatively close to land" },
];

const MATCH_NUMS = MATCH_ITEMS.map((item) => item.num);

const CHECKBOX_GROUPS = [
  {
    range: [20, 21],
    prompt:
      "Which TWO of the following statements does the writer make about inhabitants of the Mediterranean region in the ancient world?",
    options: [
      { id: "A", label: "They often used stolen vessels to carry out pirate attacks." },
      { id: "B", label: "They managed to escape capture by the authorities because they knew the area so well." },
      { id: "C", label: "They paid for information about the routes merchant ships would take." },
      { id: "D", label: "They depended more on the sea for their livelihood than on farming." },
      { id: "E", label: "They stored many of the goods taken in pirate attacks in coves along the coastline." },
    ],
  },
  {
    range: [22, 23],
    prompt: "Which TWO of the following statements does the writer make about piracy and ancient Greece?",
    options: [
      { id: "A", label: "The state estimated that very few people were involved in piracy." },
      { id: "B", label: "Attitudes towards piracy changed shortly after the Iliad and the Odyssey were written." },
      { id: "C", label: "Important officials were known to occasionally take part in piracy." },
      { id: "D", label: "Every citizen regarded pirate attacks on cities as unacceptable." },
      { id: "E", label: "A favourable view of piracy is evident in certain ancient Greek texts." },
    ],
  },
];

function DraggableStatement({ text, num, used }) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/statement", String(num));
        e.dataTransfer.effectAllowed = "copy";
      }}
      className={`border border-gray-500 rounded-sm px-2 my-1 font-bold mr-2 text-[17px] bg-white ${
        used ? "opacity-40 cursor-grab hover:bg-gray-50" : "cursor-grab hover:bg-gray-50"
      }`}
    >
      {text}
    </div>
  );
}

function CheckboxQuestion({ group, answers, setAnswer, setCurrentQ, registerQRef }) {
  const [a, b] = group.range;
  const key = `${a}-${b}`;
  const selected = answers[key] || [];
  const groupRef = useRef(null);

  useEffect(() => {
    if (!groupRef.current || !registerQRef) return;
    registerQRef(a, groupRef.current);
    registerQRef(b, groupRef.current);
  }, [a, b, registerQRef]);

  const toggle = (id) => {
    setCurrentQ(a);
    let next;
    if (selected.includes(id)) next = selected.filter((x) => x !== id);
    else if (selected.length >= 2) next = [selected[1], id];
    else next = [...selected, id];
    setAnswer(key, next);
  };

  return (
    <div ref={groupRef} className="mb-6">
      <div className="flex gap-2 items-start mb-2">
        <span className="font-semibold text-[17px]">{`${a}–${b}`}</span>
        <span className="leading-normal text-[17px]">{group.prompt}</span>
      </div>
      <div className="space-y-0.5">
        {group.options.map((opt) => (
          <CheckboxRow
            key={opt.id}
            label={`${opt.id}  ${opt.label}`}
            checked={selected.includes(opt.id)}
            onToggle={() => toggle(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Part2({ answers, setAnswer, currentQ, setCurrentQ, qRefs, registerQRef }) {
  const usedStatements = MATCH_NUMS.filter((num) =>
    MATCH_NUMS.some((slot) => Number(answers[String(slot)]) === num)
  );

  return (
    <>
      <div
        ref={(el) => {
          if (!el || !registerQRef) return;
          MATCH_NUMS.forEach((n) => registerQRef(n, el));
        }}
        className="mb-6"
      >
        <h3 className="font-bold text-[17px] mb-1">Questions 14–19</h3>
        <p className="text-[17px] mb-3">
          The text has seven paragraphs. Choose the correct information for
          each question and move it into the gap.
        </p>
        <p className="text-[17px] mb-3">
          <strong>NB</strong> You may use any letter more than once.
        </p>

        <p className="font-semibold text-[17px] mb-2">List of Information</p>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const raw = e.dataTransfer.getData("text/statement");
            if (!raw) return;
            MATCH_NUMS.forEach((slot) => {
              if (Number(answers[String(slot)]) === Number(raw)) {
                setAnswer(String(slot), null);
              }
            });
          }}
          className="bg-white p-1 pl-3"
          title="Drop a statement here to return it"
        >
          {MATCH_ITEMS.map((item) => (
            <DraggableStatement
              key={item.num}
              num={item.num}
              text={item.text}
              used={usedStatements.includes(item.num)}
            />
          ))}
        </div>
      </div>

      <h3 className="font-bold text-[17px] mb-1 mt-6">Questions 20 and 21</h3>
      <p className="text-[17px] mb-1">
        Choose <strong>TWO</strong> correct answers.
      </p>
      <p className="text-[17px] mb-4">
        Write the correct letters in boxes 20 and 21 on your answer sheet.
      </p>

      <CheckboxQuestion
        group={CHECKBOX_GROUPS[0]}
        answers={answers}
        setAnswer={setAnswer}
        setCurrentQ={setCurrentQ}
        registerQRef={registerQRef}
      />

      <h3 className="font-bold text-[17px] mb-1 mt-6">Questions 22 and 23</h3>
      <p className="text-[17px] mb-1">
        Choose <strong>TWO</strong> correct answers.
      </p>
      <p className="text-[17px] mb-4">
        Write the correct letters in boxes 22 and 23 on your answer sheet.
      </p>

      <CheckboxQuestion
        group={CHECKBOX_GROUPS[1]}
        answers={answers}
        setAnswer={setAnswer}
        setCurrentQ={setCurrentQ}
        registerQRef={registerQRef}
      />

      <h3 className="font-bold text-[17px] mb-1 mt-6">Questions 24–26</h3>
      <p className="text-[17px] mb-1">Complete the summary below.</p>
      <p className="text-[17px] mb-1">
        Choose <strong>ONE WORD ONLY</strong> from the passage for each answer.
      </p>
      <p className="text-[17px] mb-4">Write your answers in boxes 24–26 on your answer sheet.</p>

      <div className=" px-5 py-4">
        <h4 className="font-bold text-[17px] text-center mb-4">Ancient Rome and piracy</h4>
        <p className="text-[17px] leading-[1.7]">
          Piracy was an issue ancient Rome had to deal with, but it also brought some benefits for
          Rome. For example, pirates supplied slaves that were important for Rome's industries.
          However, attacks on vessels transporting
          <NumberedInput
            num={24}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          to Rome resulted in calls for
          <NumberedInput
            num={25}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          for the pirates responsible. Nevertheless, piracy continued, with some pirates demanding a
          <NumberedInput
            num={26}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          for the return of the Roman officials they captured.
        </p>
      </div>
    </>
  );
}
