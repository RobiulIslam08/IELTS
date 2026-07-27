import NumberedInput from "./NumberedInput";
import RadioRow from "./RadioRow";

export default function Part4({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const iprops = (num) => ({
    num,
    answers,
    setAnswer,
    qRefs,
    currentQ,
    setCurrentQ,
  });

  const handleRadioChange = (qNum, value) => {
    setAnswer(String(qNum), value);
    if (setCurrentQ) setCurrentQ(qNum);
  };

  const renderQNum = (num) => {
    const isFocused = currentQ === num;
    return (
      <span
        ref={(el) => {
          if (el && qRefs) qRefs.current[num] = el;
        }}
        className={`font-bold inline-flex items-center justify-center min-w-[22px] px-1 h-[22px] cursor-pointer text-[13px] mr-2 align-middle ${
          isFocused ? "border-2 border-[#1a5fb4] text-black" : "border border-gray-400 text-black"
        }`}
        onClick={() => setCurrentQ && setCurrentQ(num)}
      >
        {num}
      </span>
    );
  };

  return (
    <div className="mx-auto w-full  px-4 text-[15px] text-black pb-32">
      
      {/* ----------------- Q31-32 ----------------- */}
      <div className="mb-4">
        <div className="mb-4">
          <h2 className="font-semibold text-[17px] mb-1">Questions 31–32</h2>
          <p className="text-[17px]">Choose the correct answer.</p>
        </div>

        <div className="space-y-8 mt-6">
          {/* Question 31 */}
          <div>
            <div className="flex items-start mb-3 text-[17px]">
              <div className="mt-0.5">{renderQNum(31)}</div>
              <span>Participants in the Learner Persistence study were all drawn from the same</span>
            </div>
            <div className="flex flex-col ml-0 mt-2">
              {["age group.", "geographical area.", "socio-economic level."].map((opt, idx) => (
                <RadioRow
                  key={idx}
                  name="q31"
                  value={opt}
                  label={opt}
                  selected={answers["31"]}
                  onSelect={(val) => handleRadioChange(31, val)}
                />
              ))}
            </div>
          </div>

          {/* Question 32 */}
          <div>
            <div className="flex items-start mb-3 text-[17px]">
              <div className="mt-0.5">{renderQNum(32)}</div>
              <span>The study showed that when starting their course, older students were most concerned about</span>
            </div>
            <div className="flex flex-col ml-0 mt-2">
              {["effects on their home life.", "implications for their future career.", "financial constraints."].map((opt, idx) => (
                <RadioRow
                  key={idx}
                  name="q32"
                  value={opt}
                  label={opt}
                  selected={answers["32"]}
                  onSelect={(val) => handleRadioChange(32, val)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- Q33-37 ----------------- */}
      <div className="mb-12">
        <div className="mb-4">
          <h2 className="font-semibold text-[17px] mb-1">Questions 33–37</h2>
          <p className="text-[17px]">Complete the table. Write <span className="font-bold">ONE WORD ONLY</span> for each answer.</p>
        </div>

        <div className="mt-6 w-full max-w-[1050px]">
          <table className="w-full border-collapse border border-black text-[14px]">
            <thead>
              <tr>
                <th colSpan="4" className="border border-black p-5 font-bold text-center text-[17px]">Research findings</th>
              </tr>
              <tr>
                <th className="border border-black p-2 bg-white"></th>
                <th className="border border-black p-1 font-semibold text-center text-[16px]">Social and Environmental Factors</th>
                <th className="border border-black p-1 font-semibold text-center text-[16px]">Other Factors</th>
                <th className="border border-black p-1 font-semibold text-center text-[16px]">Personal Characteristics</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black pl-3 text-[16px] font-bold whitespace-nowrap">First level of importance</td>
                <td className="border border-black pl-3 py-1 text-black text-[16px]">Effective support</td>
                <td className="border border-black pl-3 py-1 text-black text-[16px]">Perceived success in study</td>
                <td className="border border-black pl-3 py-1 text-black text-[16px]">
                  <div className="flex items-center flex-wrap gap-y-2">
                    <span className="mr-1">Enjoyment of a</span>
                    <NumberedInput {...iprops(33)} width={70} />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black pl-3 text-[16px] font-bold whitespace-nowrap">Second level of importance</td>
                <td className="border border-black pl-3 py-1 text-black text-[16px]">
                  <div className="flex items-center flex-wrap gap-y-2">
                    <span className="mr-1">Positive experiences at</span>
                    <NumberedInput {...iprops(34)} width={70} />
                  </div>
                </td>
                <td className="border border-black pl-3 py-1 text-black text-[16px]">
                  <div className="flex items-center flex-wrap gap-y-2">
                    <span className="mr-1">Good</span>
                    <NumberedInput {...iprops(35)} width={70} />
                  </div>
                </td>
                <td className="border border-black pl-3 py-1 text-black text-[16px]">
                  <div className="flex items-center flex-wrap gap-y-2">
                    <span className="mr-1">Many</span>
                    <NumberedInput {...iprops(36)} width={70} />
                    <span className="ml-1">in daily life</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black pl-3 text-[16px] font-bold whitespace-nowrap">Third level of importance</td>
                <td className="border border-black pl-3 py-1 text-black text-[16px]">
                  <div className="flex items-center flex-wrap gap-y-2">
                    <span className="mr-1">Good interaction with the</span>
                    <NumberedInput {...iprops(37)} width={70} />
                  </div>
                </td>
                <td className="border border-black pl-3 py-1 text-black text-[16px]">No family problems</td>
                <td className="border border-black pl-3 py-1 text-black text-[16px]">Capacity for multi-tasking</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------- Q38-40 ----------------- */}
      <div className="mb-10">
        <div className="mb-6">
          <h2 className="font-bold text-[16px] mb-1">Questions 38–40</h2>
          <p className="text-[17px]">Complete the notes. Write <span className="font-bold">ONE WORD ONLY</span> for each answer.</p>
        </div>

        <h3 className="font-bold text-[17px] mb-4">Recommendations</h3>
        <ul className="list-disc pl-10 space-y-4 text-[17px]">
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">Ask new students to complete questionnaires to gauge their level of</span>
              <NumberedInput {...iprops(38)} width={120} />
              <span>.</span>
            </div>
          </li>
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">Train selected students to act as</span>
              <NumberedInput {...iprops(39)} width={120} />
              <span>.</span>
            </div>
          </li>
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">Outside office hours, offer</span>
              <NumberedInput {...iprops(40)} width={120} />
              <span className="ml-1">help.</span>
            </div>
          </li>
        </ul>
      </div>

    </div>
  );
}
