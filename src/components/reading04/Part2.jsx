// @ts-nocheck
import NumberedInput from "./NumberedInput";

const MATCH_ITEMS = [
  {
    num: 14,
    text: "reference to the rapidly increasing need for one raw material in the transport industry",
  },
  {
    num: 15,
    text: "a rough estimate of the area of the Earth covered by the oceans",
  },
  {
    num: 16,
    text: "how a particular underwater habitat, where minerals and organisms co-exist, is formed",
  },
  {
    num: 17,
    text: "reference to the fact that the countries of the world have yet to agree on rules for the exploration of the seabed",
  },
];

const MATCH_NUMS = MATCH_ITEMS.map((item) => item.num);

const PEOPLE_QUESTIONS = [
  {
    num: 18,
    text: "A move away from the exploration of heavily mined reserves on land is a good idea.",
  },
  {
    num: 19,
    text: "The negative effects of undersea exploration on local areas and their inhabitants are being ignored.",
  },
  {
    num: 20,
    text: "There are more worthwhile things to extract from the sea than minerals.",
  },
  {
    num: 21,
    text: "No other form of human exploration will have such a destructive impact on marine life as deep-sea mining.",
  },
  {
    num: 22,
    text: "More is known about outer space than about what lies beneath the oceans.",
  },
  {
    num: 23,
    text: "There is one marine life habitat where experts agree mining should not take place.",
  },
];

const PEOPLE = [
  { id: "A", name: "Professor Mat Upton" },
  { id: "B", name: "Julie Hunter, Julian Aguon and Pradeep Singh" },
  { id: "C", name: "Dr Jon Copley" },
  { id: "D", name: "Mike Johnston" },
  { id: "E", name: "Verena Tunnicliffe" },
];

const PEOPLE_NUMS = PEOPLE_QUESTIONS.map((q) => q.num);

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

function DraggablePerson({ id, name }) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/person", id);
        e.dataTransfer.setData("text/plain", id);
        e.dataTransfer.effectAllowed = "copy";
      }}
      className="px-2.5 py-1 border border-gray-500 rounded-[3px] text-[14px] w-fit select-none bg-white cursor-grab active:cursor-grabbing hover:bg-gray-50"
    >
      {name}
    </div>
  );
}

export default function Part2({ answers, setAnswer, currentQ, setCurrentQ, qRefs, registerQRef }) {
  const usedStatements = MATCH_NUMS.filter((num) => Boolean(answers[String(num)]));

  const handlePersonDrop = (e, qNum) => {
    e.preventDefault();
    const personId = e.dataTransfer.getData("text/person") || e.dataTransfer.getData("text/plain");
    if (!personId || !PEOPLE.some((p) => p.id === personId)) return;
    setAnswer(String(qNum), personId);
    setCurrentQ(qNum);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        ref={(el) => {
          if (!el || !registerQRef) return;
          MATCH_NUMS.forEach((n) => registerQRef(n, el));
        }}
        className="mb-6"
      >
        <h3 className="font-bold text-[17px] mb-1">Questions 14–17</h3>
        <p className="text-[17px] mb-3">
          The text has six paragraphs. Choose the correct information for each question and move it into
          the gap.
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

      <div
        ref={(el) => {
          if (!el || !registerQRef) return;
          PEOPLE_NUMS.forEach((n) => registerQRef(n, el));
        }}
        className="mb-8"
      >
        <h3 className="font-bold text-[17px] mb-1">Questions 18–23</h3>
        <p className="text-[17px] mb-3">
          Look at the following statements (Questions 18–23) and the list of people below. Match each
          statement with the correct person or people.
        </p>
        <p className="text-[17px] mb-4">
          <strong>NB</strong> You may use any person more than once.
        </p>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 space-y-4">
            {PEOPLE_QUESTIONS.map((pq) => {
              const currentSelected = answers[String(pq.num)];
              const person = PEOPLE.find((p) => p.id === currentSelected);
              return (
                <div
                  key={pq.num}
                  className={`flex flex-col gap-2 p-3 border ${
                    currentQ === pq.num ? "border-[#1a5fb4]" : "border-gray-200"
                  }`}
                  onClick={() => setCurrentQ(pq.num)}
                >
                  <div className="flex gap-3 items-start">
                    <span className="font-bold text-[17px]">{pq.num}</span>
                    <span className="text-[16px] leading-normal">{pq.text}</span>
                  </div>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handlePersonDrop(e, pq.num)}
                    onClick={(e) => {
                      if (currentSelected) {
                        e.stopPropagation();
                        setAnswer(String(pq.num), null);
                      }
                    }}
                    className={`inline-flex items-center justify-center min-w-[160px] min-h-[28px] px-2 py-1 text-[14px] cursor-pointer bg-white w-fit ${
                      currentSelected || currentQ === pq.num
                        ? "border-2 border-[#1a5fb4]"
                        : "border border-dashed border-gray-500"
                    }`}
                  >
                    {person ? person.name : pq.num}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-3 py-3 w-full lg:w-[260px] shrink-0 border border-dashed border-gray-300 space-y-2">
            <p className="font-semibold text-[16px] mb-2">List of People</p>
            {PEOPLE.map((p) => (
              <DraggablePerson key={p.id} id={p.id} name={p.name} />
            ))}
            <p className="text-[13px] text-gray-600 mt-2">
              Drag a name onto a statement. Click to remove.
            </p>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-[17px] mb-1 mt-6">Questions 24–26</h3>
      <p className="text-[17px] mb-1">Complete the summary below.</p>
      <p className="text-[17px] mb-1">
        Choose <strong>ONE WORD ONLY</strong> from the passage for each answer.
      </p>
      <p className="text-[17px] mb-4">Write your answers in boxes 24–26 on your answer sheet.</p>

      <div className="px-5 py-4 space-y-4 text-[17px] leading-[1.7] mb-8">
        <h4 className="font-bold text-[17px] text-center mb-2">Mining the sea floor</h4>
        <p>
          Mining corporations believe that the mineral resources lying under the sea may be superior
          to those found in the earth. They also say that these can be removed without producing much
          <NumberedInput
            num={24}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          .
        </p>
        <p>
          The extraction is often done by adapting the
          <NumberedInput
            num={25}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          that has already been used to work on land. The method of excavation involves removing the
          seawater from the slurry that is brought up to ships and returning it to the seabed.
          However, concerned groups strongly believe that
          <NumberedInput
            num={26}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          is necessary due to the possible number of unidentified consequences.
        </p>
      </div>
    </>
  );
}
