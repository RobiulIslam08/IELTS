// @ts-nocheck
import { useEffect, useRef } from "react";
import CheckboxRow from "./CheckboxRow";
import NumberedInput from "./NumberedInput";

const MATCH_ITEMS = [
  { num: 14, text: "reference to two chemical compounds which impact on performance" },
  { num: 15, text: "examples of strategies for minimising the effects of stress" },
  { num: 16, text: "how a sportsperson accounted for their own experience of stress" },
  { num: 17, text: "study results indicating links between stress responses and performance" },
  { num: 18, text: "mention of people who can influence how athletes perceive their stress responses" },
];

const MATCH_NUMS = MATCH_ITEMS.map((item) => item.num);

const CHECKBOX_GROUPS = [
  {
    range: [23, 24],
    prompt:
      "Which TWO facts about Emma Raducanu's withdrawal from the Wimbledon tournament are mentioned in the text?",
    options: [
      { id: "A", label: "the stage at which she dropped out of the tournament" },
      { id: "B", label: "symptoms of her performance stress at the tournament" },
      { id: "C", label: "measures which she had taken to manage her stress levels" },
      { id: "D", label: "aspects of the Wimbledon tournament which increased her stress levels" },
      { id: "E", label: "reactions to her social media posts about her experience at Wimbledon" },
    ],
  },
  {
    range: [25, 26],
    prompt: "Which TWO facts about anxiety are mentioned in Paragraph E of the text?",
    options: [
      { id: "A", label: "the factors which determine how severe it may be" },
      { id: "B", label: "how long it takes for its effects to become apparent" },
      { id: "C", label: "which of its symptoms is most frequently encountered" },
      { id: "D", label: "the types of athletes who are most likely to suffer from it" },
      { id: "E", label: "the harm that can result if athletes experience it too often" },
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
  const usedStatements = MATCH_NUMS.filter((num) => Boolean(answers[String(num)]));

  return (
    <>
      <div
        ref={(el) => {
          if (!el || !registerQRef) return;
          MATCH_NUMS.forEach((n) => registerQRef(n, el));
        }}
        className="mb-6"
      >
        <h3 className="font-bold text-[17px] mb-1">Questions 14–18</h3>
        <p className="text-[17px] mb-3">
          The text has six paragraphs. Choose the correct information for each question and move it into the
          gap.
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
            const num = Number(raw);
            if (!num) return;
            setAnswer(String(num), null);
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

      <h3 className="font-bold text-[17px] mb-1 mt-6">Questions 19–22</h3>
      <p className="text-[17px] mb-1">Complete the sentences below.</p>
      <p className="text-[17px] mb-1">
        Choose <strong>ONE WORD ONLY</strong> from the passage for each answer.
      </p>
      <p className="text-[17px] mb-4">Write your answers in boxes 19–22 on your answer sheet.</p>

      <div className="px-5 py-4 space-y-4 text-[17px] leading-[1.7] mb-8">
        <p>
          Performance stress involves many demands on the athlete, for example, coping with the possible
          risk of
          <NumberedInput
            num={19}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          .
        </p>
        <p>
          Cortisol can cause tennis players to produce fewer good
          <NumberedInput
            num={20}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          .
        </p>
        <p>
          Psychologists can help athletes to view their physiological responses as the effect of a positive
          feeling such as
          <NumberedInput
            num={21}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          .
        </p>
        <p>
          <NumberedInput
            num={22}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          is an example of a psychological technique which can reduce an athlete&apos;s stress responses.
        </p>
      </div>

      <h3 className="font-bold text-[17px] mb-1 mt-6">Questions 23 and 24</h3>
      <p className="text-[17px] mb-1">
        Choose <strong>TWO</strong> correct answers.
      </p>
      <p className="text-[17px] mb-4">Write the correct letters in boxes 23 and 24 on your answer sheet.</p>
      <CheckboxQuestion
        group={CHECKBOX_GROUPS[0]}
        answers={answers}
        setAnswer={setAnswer}
        setCurrentQ={setCurrentQ}
        registerQRef={registerQRef}
      />

      <h3 className="font-bold text-[17px] mb-1 mt-6">Questions 25 and 26</h3>
      <p className="text-[17px] mb-1">
        Choose <strong>TWO</strong> correct answers.
      </p>
      <p className="text-[17px] mb-4">Write the correct letters in boxes 25 and 26 on your answer sheet.</p>
      <CheckboxQuestion
        group={CHECKBOX_GROUPS[1]}
        answers={answers}
        setAnswer={setAnswer}
        setCurrentQ={setCurrentQ}
        registerQRef={registerQRef}
      />
    </>
  );
}
