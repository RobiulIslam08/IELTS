// @ts-nocheck
import RadioRow from "./RadioRow";

const MC_QUESTIONS = [
  "What does the reader learn about the conversation in the first paragraph?",
  "What assists the electronic translator during lectures at Karlsruhe Institute of Technology?",
  "When referring to The Hitchhiker's Guide to the Galaxy, the writer suggests that",
  "What does the writer say about sharing earpieces?",
];

const MATCHING_QUESTIONS = [
  "Speech translation methods are developing fast in Japan",
  "TV interviews that use translation voiceover methods are successful",
  "Future translation systems should address people appropriately",
  "Users may be able to maintain their local customs",
];

const YNNG_QUESTIONS = [
  "Language translation systems will be seen as very useful throughout the academic and professional worlds.",
  "The overall value of automated translation to family life is yet to be shown.",
  "Automated translation could make life more difficult for immigrant families.",
  "Visual aspects of language translation are being considered by scientists.",
  "International scientists have found English easier to translate into other languages than Latin.",
  "As far as language is concerned, there is a difference between people's social and practical needs.",
];

export default function Part3({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  return (
    <>
      {/* SECTION 1: Questions 27-30 (Multiple Choice) */}
      <h3 className="font-bold text-[17px] mb-1">Questions 27-30</h3>
      <p className="text-[17px] mb-4 leading-[1.5]">
        Choose the correct letter, <strong>A</strong>, <strong>B</strong>, <strong>C</strong> or{" "}
        <strong>D</strong>.
      </p>

      <div className="space-y-5">
        {MC_QUESTIONS.map((q, idx) => {
          const num = idx + 27;
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
                {["A", "B", "C", "D"].map((opt) => (
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

      {/* SECTION 2: Questions 31-34 (Matching Endings) */}
      <h3 className="font-bold text-[17px] mb-1 mt-8">Questions 31-34</h3>
      <p className="text-[17px] mb-4 leading-[1.5]">
        Complete each sentence with the correct ending, <strong>A–F</strong>, below.
      </p>

      <div className="space-y-5">
        {MATCHING_QUESTIONS.map((q, idx) => {
          const num = idx + 31;
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
                {["A", "B", "C", "D", "E", "F"].map((opt) => (
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

      {/* SECTION 3: Questions 35-40 (Yes/No/Not Given) */}
      <h3 className="font-bold text-[17px] mb-1 mt-8">Questions 35-40</h3>
      <p className="text-[17px] mb-4 leading-[1.5]">
        Do the following statements agree with the views of the writer in Reading Passage 3?
        Choose <strong>YES</strong> if the statement agrees with the views of the writer,{" "}
        <strong>NO</strong> if the statement contradicts the views of the writer, or{" "}
        <strong>NOT GIVEN</strong> if it is impossible to say what the writer thinks about this.
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