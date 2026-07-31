// @ts-nocheck
import RadioRow from "./RadioRow";
import NumberedInput from "./NumberedInput";

const MCQ_QUESTIONS = [
  {
    num: 27,
    question: "What is the writer doing in the first paragraph?",
    options: [
      { id: "A", label: "A setting out two opposing views about human nature" },
      { id: "B", label: "B justifying his opinion about our tendency to be greedy" },
      { id: "C", label: "C describing a commonly held belief about people's behaviour" },
      { id: "D", label: "D explaining why he thinks that humans act in a selfish manner" },
    ],
  },
  {
    num: 28,
    question: "What point is made about Richard Dawkins' book The Selfish Gene?",
    options: [
      { id: "A", label: "A Its appeal lay in the radical nature of its ideas." },
      { id: "B", label: "B Its success was due to the scientific support it offered." },
      { id: "C", label: "C It presented a view that was in line with the attitudes of its time." },
      {
        id: "D",
        label: "D It took an innovative approach to the analysis of human psychology.",
      },
    ],
  },
  {
    num: 29,
    question: "What does the writer suggest about the prehistoric era in the fourth paragraph?",
    options: [
      { id: "A", label: "A Societies were more complex than many people believe." },
      { id: "B", label: "B Supplies of natural resources were probably relatively plentiful." },
      { id: "C", label: "C Most estimates about population sizes are likely to be inaccurate." },
      {
        id: "D",
        label: "D Humans moved across continents more than was previously thought.",
      },
    ],
  },
  {
    num: 30,
    question: "The writer refers to Bruce Knauft's work as support for the idea that",
    options: [
      {
        id: "A",
        label: "A selfishness is a relatively recent development in human societies.",
      },
      {
        id: "B",
        label: "B only people in isolated communities can live in an unselfish manner.",
      },
      {
        id: "C",
        label: "C very few lifestyles have survived unchanged since prehistoric times.",
      },
      {
        id: "D",
        label: "D hunter-gatherer cultures worldwide are declining in number.",
      },
    ],
  },
];

const YNNG_QUESTIONS = [
  "Some anthropologists are mistaken about the point when the number of societies such as the !Kung began to decline.",
  "Humans who developed warlike traits in prehistory would have had an advantage over those who did not.",
  "Being peaceful and cooperative is a natural way for people to behave.",
  "Negative traits are more apparent in some modern cultures than in others.",
  "Animal research has failed to reveal a link between changes in the environment and the emergence of aggressive tendencies.",
];

export default function Part3({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const iprops = (num) => ({
    num,
    answers,
    setAnswer,
    qRefs,
    currentQ,
    setCurrentQ,
  });

  return (
    <>
      <h3 className="font-bold text-[17px] mb-1">Questions 27–30</h3>
      <p className="text-[17px] mb-4 leading-[1.5]">
        Choose the correct letter, <strong>A</strong>, <strong>B</strong>, <strong>C</strong> or{" "}
        <strong>D</strong>.
      </p>
      <p className="text-[17px] mb-4 leading-[1.5]">
        Write the correct letter in boxes 27–30 on your answer sheet.
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

      <h3 className="font-bold text-[17px] mb-1 mt-8">Questions 31–35</h3>
      <p className="text-[17px] mb-1">Complete the summary below.</p>
      <p className="text-[17px] mb-1">
        Choose <strong>ONE WORD ONLY</strong> from the passage for each answer.
      </p>
      <p className="text-[17px] mb-4">Write your answers in boxes 31–35 on your answer sheet.</p>

      <div className="px-5 py-4 space-y-4 text-[17px] leading-[1.7] mb-8">
        <h4 className="font-bold text-[17px] text-center mb-2">
          Contemporary hunter-gatherer societies
        </h4>
        <p>
          Bruce Knauft&apos;s research shows that contemporary hunter-gatherer societies tend to
          exhibit a high level of
          <NumberedInput {...iprops(31)} />
          in all areas of life. In these cultures, distributing resources fairly among all members
          is a moral obligation. These societies also employ strategies to prevent differences in
          <NumberedInput {...iprops(32)} />
          occurring: for example, the !Kung follow a custom whereby the credit for one person&apos;s
          success at
          <NumberedInput {...iprops(33)} />
          is given to another member of the group. Individuals who behave in a
          <NumberedInput {...iprops(34)} />
          manner are punished by being excluded from the group, and women have a considerable amount
          of
          <NumberedInput {...iprops(35)} />
          in choices regarding work and marriage.
        </p>
      </div>

      <h3 className="font-bold text-[17px] mb-1 mt-8">Questions 36–40</h3>
      <p className="text-[17px] mb-2 leading-[1.5]">
        Do the following statements agree with the views of the writer in Reading Passage 3?
      </p>
      <p className="text-[17px] mb-2 leading-[1.5]">
        In boxes 36–40 on your answer sheet, write
      </p>
      <div className="mb-5 space-y-0.5 text-[17px] text-black pl-1">
        <p>
          <strong>YES</strong> if the statement agrees with the views of the writer
        </p>
        <p>
          <strong>NO</strong> if the statement contradicts the views of the writer
        </p>
        <p>
          <strong>NOT GIVEN</strong> if it is impossible to say what the writer thinks about this
        </p>
      </div>

      <div className="space-y-5">
        {YNNG_QUESTIONS.map((q, idx) => {
          const num = idx + 36;
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
