// @ts-nocheck
import { useEffect, useRef } from "react";
import CheckboxRow from "./CheckboxRow";
import NumberedInput from "./NumberedInput";

const HEADINGS = [
  "How a maths experiment actually reduced traffic congestion",
  "How a concept from one field of study was applied in another",
  "A lack of investment in driver training",
  "Areas of doubt and disagreement between experts",
  "How different countries have dealt with traffic congestion",
  "The impact of driver behavior on traffic speed",
  "A proposal to take control away from the driver",
];

const CHECKBOX_GROUPS = [
  {
    range: [18, 19],
    prompt: "Which TWO options describe what the writer is doing in section two?",
    options: [
      "explaining Helbing and Kerner's attitude to chaos theory",
      "clarifying Helbing and Kerner's conclusions about traffic behaviour",
      "showing how weather and temperature can change traffic flow",
      "drawing parallels between the behaviour of clouds and traffic",
      "giving examples of different potential causes of congestion",
    ],
  },
  {
    range: [20, 21],
    prompt: "Which TWO statements reflect civil engineers' opinions of the physicists' theories?",
    options: [
      "They fail to take into account road maintenance.",
      "They may have little to do with everyday traffic behaviour.",
      "They are inconsistent with chaos theory.",
      "They do not really describe anything new.",
      "They can easily be disproved.",
    ],
  },
  {
    range: [22, 23],
    prompt: "Which TWO of the following options express the purpose of the text?",
    options: [
      "to change the behaviour of vehicle drivers",
      "to discuss contrasting approaches to understanding congestion",
      "to recommend a practical rather than a theoretical approach to traffic control",
      "to inform drivers of future changes to traffic control methods",
      "to give details of some of the behaviours shown by traffic",
    ],
  },
];

function DraggableHeading({ text, used }) {
  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/heading", text)}
      className={` border border-gray-500 rounded-sm px-2  my-1 font-bold mr-2 text-[17px] font-bold bg-white ${
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

  const toggle = (opt) => {
    setCurrentQ(a);
    let next;
    if (selected.includes(opt)) next = selected.filter((x) => x !== opt);
    else if (selected.length >= 2) next = [selected[1], opt];
    else next = [...selected, opt];
    setAnswer(key, next);
  };
  return (
    <div
      ref={groupRef}
      className="mb-6"
    >
      <div className="flex gap-2 items-start mb-2">
        <span className="font-semibold text-[17px] ">{`${a}-${b}`}</span>
        <span className="leading-normal">{group.prompt}</span>
      </div>
      <div className="space-y-0.5">
        {group.options.map((opt) => (
          <CheckboxRow key={opt} label={opt} checked={selected.includes(opt)} onToggle={() => toggle(opt)} />
        ))}
      </div>
    </div>
  );
}

export default function Part2({ answers, setAnswer, currentQ, setCurrentQ, qRefs, registerQRef }) {
  const usedHeadings = [14, 15, 16, 17].map((n) => answers[String(n)]).filter(Boolean);
  const clearDroppedHeading = (heading) => {
    [14, 15, 16, 17].forEach((num) => {
      if (answers[String(num)] === heading) {
        setAnswer(String(num), null);
      }
    });
  };

  return (
    <>
      <div
        ref={(el) => {
          if (!el || !registerQRef) return;
          [14, 15, 16, 17].forEach((n) => registerQRef(n, el));
        }}
        className="mb-6"
      >
        <h3 className="font-bold text-[17px] mb-1">Questions 14-17</h3>
        <p className="text-[17px] mb-3">
          The text has four sections. Choose the correct heading for each section and move it into
          the gap.
        </p>
        <p className="font-semibold text-[17px] mb-2">List of Headings</p>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const heading = e.dataTransfer.getData("text/heading");
            if (heading) clearDroppedHeading(heading);
          }}
          className=" bg-white p-1 pl-3"
          title="Drop a heading here to return it"
        >
          {HEADINGS.map((h) => (
            <DraggableHeading key={h} text={h} used={usedHeadings.includes(h)} />
          ))}
        </div>
      </div>

      <h3 className="font-bold text-[17px] mb-1 mt-6">Questions 18-23</h3>
      <p className="text-[17px] mb-4">Choose <span className="font-bold">TWO</span> correct answers.</p>

      {CHECKBOX_GROUPS.map((g) => (
        <CheckboxQuestion
          key={g.range[0]}
          group={g}
          answers={answers}
          setAnswer={setAnswer}
          currentQ={currentQ} setCurrentQ={setCurrentQ}
          registerQRef={registerQRef}
        />
      ))}

      <h3 className="font-bold text-[17px] mb-1 mt-6">Questions 24-26</h3>
      <p className="text-[17px] mb-4">
        Complete the summary. Write <strong>ONE WORD ONLY</strong> from the text for each answer.
      </p>

      <h4 className="font-bold text-[18px] text-black mb-3">Physicists' theories on gas molecules and traffic flow</h4>
      <p className=" text-[17px] ">
        Using simulations based on
        <NumberedInput num={24} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
        more commonly used to illustrate the movement of molecules in a gas, physicists showed that
        there are similarities between the ways gas molecules and traffic behave. They are not
        similar in all aspects - gas molecules randomly crash into one another but drivers prevent
        <NumberedInput num={25} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
        from happening by altering their speed. The physicists' investigations seemed to show that
        congestion can occur even when traffic is moving without problem and when its
        <NumberedInput num={26} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
        is within approved levels for the road.
      </p>
    </>
  );
}
