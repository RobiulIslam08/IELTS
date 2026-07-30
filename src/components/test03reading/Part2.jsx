// @ts-nocheck
import NumberedInput from "./NumberedInput";

const MATCH_ITEMS = [
  { num: 14, text: "reference to the need to ensure that inhabitants of wetland regions continue to benefit from them" },
  { num: 15, text: "the proportion of wetlands which have already been lost" },
  { num: 16, text: "reference to the idea that people are beginning to appreciate the value of wetlands" },
  { num: 17, text: "mention of the cultural significance of wetlands" },
];

const MATCH_NUMS = MATCH_ITEMS.map((item) => item.num);

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

function DraggableExpert({ id, name, used }) {
  return (
    <div
      draggable={!used}
      onDragStart={(e) => {
        if (used) {
          e.preventDefault();
          return;
        }
        e.dataTransfer.setData("text/expert", id);
        e.dataTransfer.setData("text/plain", id);
      }}
      className={`px-2.5 py-1 border border-gray-500 rounded-[3px] text-[14px] w-fit select-none ${
        used
          ? "opacity-0 pointer-events-none"
          : "bg-white cursor-grab active:cursor-grabbing hover:bg-gray-50"
      }`}
    >
      {name}
    </div>
  );
}

export default function Part2({ answers, setAnswer, currentQ, setCurrentQ, qRefs, registerQRef }) {
  const usedStatements = MATCH_NUMS.filter((num) => Boolean(answers[String(num)]));
  const usedExperts = [23, 24, 25, 26].map((n) => answers[String(n)]).filter(Boolean);

  const handleExpertDrop = (e, qNum) => {
    e.preventDefault();
    const expertId = e.dataTransfer.getData("text/expert") || e.dataTransfer.getData("text/plain");
    if (!expertId || !EXPERTS.some((ex) => ex.id === expertId)) return;

    [23, 24, 25, 26].forEach((num) => {
      if (answers[String(num)] === expertId) {
        setAnswer(String(num), null);
      }
    });

    setAnswer(String(qNum), expertId);
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
          The text has eight paragraphs. Choose the correct information for each question and move it into the gap.
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

      <h3 className="font-bold text-[17px] mb-1 mt-6">Questions 18–22</h3>
      <p className="text-[17px] mb-2">Complete the sentences below.</p>
      <p className="text-[17px] mb-4">
        Choose <span className="font-bold">ONE WORD ONLY</span> from the passage for each answer.
      </p>

      <div className="space-y-6 text-[17px] leading-loose mb-8">
        <div>
          <span className="font-bold mr-2">18</span>
          Peatlands which have been drained begin to release
          <NumberedInput
            num={18}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          instead of storing it.
        </div>

        <div>
          <span className="font-bold mr-2">19</span>
          Once peatland areas have been cleared,
          <NumberedInput
            num={19}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          are more likely to occur.
        </div>

        <div>
          <span className="font-bold mr-2">20</span>
          Clearing peatland forests to make way for oil palm plantations destroys the
          <NumberedInput
            num={20}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          of the local environment.
        </div>

        <div>
          <span className="font-bold mr-2">21</span>
          Water is drained out of peatlands through the
          <NumberedInput
            num={21}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          which are created by logging companies.
        </div>

        <div>
          <span className="font-bold mr-2">22</span>
          Draining peatlands leads to
          <NumberedInput
            num={22}
            answers={answers}
            setAnswer={setAnswer}
            qRefs={qRefs}
            currentQ={currentQ}
            setCurrentQ={setCurrentQ}
          />
          : a serious problem which can eventually result in coastal flooding and land loss.
        </div>
      </div>

      <div
        ref={(el) => {
          if (!el || !registerQRef) return;
          [23, 24, 25, 26].forEach((n) => registerQRef(n, el));
        }}
        className="mb-8"
      >
        <h3 className="font-bold text-[17px] mb-1">Questions 23–26</h3>
        <p className="text-[17px] mb-3">
          Look at the following statements (Questions 23–26) and the list of experts below. Match each statement with
          the correct expert.
        </p>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 space-y-4">
            {EXPERT_QUESTIONS.map((eq) => {
              const currentSelected = answers[String(eq.num)];
              const expert = EXPERTS.find((ex) => ex.id === currentSelected);
              return (
                <div
                  key={eq.num}
                  className={`flex flex-col gap-2 p-3 border ${
                    currentQ === eq.num ? "border-[#1a5fb4]" : "border-gray-200"
                  }`}
                  onClick={() => setCurrentQ(eq.num)}
                >
                  <div className="flex gap-3 items-start">
                    <span className="font-bold text-[17px]">{eq.num}</span>
                    <span className="text-[16px] leading-normal">{eq.text}</span>
                  </div>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleExpertDrop(e, eq.num)}
                    onClick={(e) => {
                      if (currentSelected) {
                        e.stopPropagation();
                        setAnswer(String(eq.num), null);
                      }
                    }}
                    className={`inline-flex items-center justify-center min-w-[160px] min-h-[28px] px-2 py-1 text-[14px] cursor-pointer bg-white w-fit ${
                      currentSelected || currentQ === eq.num
                        ? "border-2 border-[#1a5fb4]"
                        : "border border-dashed border-gray-500"
                    }`}
                  >
                    {expert ? expert.name : eq.num}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="px-3 py-3 w-full lg:w-[240px] shrink-0 border border-dashed border-gray-300 space-y-2"
            onDragOver={handleDragOver}
            onDrop={(e) => {
              e.preventDefault();
              const expertId = e.dataTransfer.getData("text/expert") || e.dataTransfer.getData("text/plain");
              if (!expertId) return;
              [23, 24, 25, 26].forEach((num) => {
                if (answers[String(num)] === expertId) setAnswer(String(num), null);
              });
            }}
          >
            <p className="font-semibold text-[16px] mb-2">List of Experts</p>
            {EXPERTS.map((exp) => (
              <DraggableExpert key={exp.id} id={exp.id} name={exp.name} used={usedExperts.includes(exp.id)} />
            ))}
            <p className="text-[13px] text-gray-600 mt-2">Drag an expert onto a statement. Click to remove.</p>
          </div>
        </div>
      </div>
    </>
  );
}
