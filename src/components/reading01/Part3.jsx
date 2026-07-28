// @ts-nocheck
import RadioRow from "./RadioRow";
import NumberedInput from "./NumberedInput";

const TF_QUESTIONS = [
  "The Plain English campaigns are concerned with the language officials use when communicating with ordinary people.",
  "Campaigners found it difficult to talk to government officials.",
  "A change of president in the US meant that the effects of the campaign there were negligible.",
  "In the UK, awards are given to people who have produced materials that are easy to understand.",
  "Use of clear language on documents can be economically beneficial.",
  "The tendency of doctors to use jargon when talking to patients often leads to confusion.",
  "Regular checks are made on language used in the courts.",
];

export default function Part3({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  return (
    <>
      <h3 className="font-bold text-[17px] mb-1">Questions 27-33</h3>
      <p className="text-[17px] mb-4 leading-[1.5]">
        Choose <strong>TRUE</strong> if the statement agrees with the information given in the
        text, choose <strong>FALSE</strong> if the statement contradicts the information, or choose{" "}
        <strong>NOT GIVEN</strong> if there is no information on this.
      </p>

      <div className="space-y-5">
        {TF_QUESTIONS.map((q, idx) => {
          const num = idx + 27;
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
                {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
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

      <h3 className="font-bold text-[17px] mb-1 mt-8">Questions 34-40</h3>
      <p className="text-[17px] mb-4">
        Complete the summary. Write <strong>NO MORE THAN TWO WORDS</strong> from the text for each
        answer.
      </p>

      <p className="leading-[1] text-[17px] ">
        For businesses, the use of complex language can have financial implications. The benefits
        of plain language can be seen in the case of companies who remove
        <NumberedInput num={34} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
        from their forms and achieve
        <NumberedInput num={35} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
        as a result.
      </p>

      <p className="leading-[1] text-[17px]  mt-4">
        Consumers often complain that they experience a feeling of
        <NumberedInput num={36} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
        when trying to put together do-it-yourself products which have not been tested by companies
        on a
        <NumberedInput num={37} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
        . In situations where not keeping to the correct procedures could affect safety issues, it
        is especially important that
        <NumberedInput num={38} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
        information is not left out and no assumptions are made about a stage being self-evident or
        the consumer having a certain amount of
        <NumberedInput num={39} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
        .
      </p>

      <p className="leading-[1] text-[17px]  mt-4">
        Lawyers, however, have raised objections to the use of plain English. They feel that it
        would result in ambiguity in documents and cause people to lose faith in
        <NumberedInput num={40} answers={answers} setAnswer={setAnswer} qRefs={qRefs} currentQ={currentQ} setCurrentQ={setCurrentQ} />
        , as it would mean departing from language that has been used in the courts for a very long
        time.
      </p>
    </>
  );
}
