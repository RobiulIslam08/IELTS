import NumberedInput from "./NumberedInput";

export default function Part1({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const iprops = (num) => ({
    num,
    answers,
    setAnswer,
    qRefs,
    currentQ,
    setCurrentQ,
  });

  return (
    <div className="mx-auto w-full px-4 text-[15px] text-black pb-20">
      <div className="mb-5">
        <h2 className="font-bold text-[16px] mb-0">Questions 1–6</h2>
        <p className="text-[17px]">Complete the form below.</p>
        <p className="text-[17px]">
          Write <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each answer.
        </p>
      </div>

      <h3 className="font-bold text-[19px] mb-6">Guitar Group</h3>

      <div className="mb-12 space-y-4 text-[17px] text-black max-w-[700px]">
        <div className="grid grid-cols-[180px_1fr] gap-x-3 gap-y-4 items-start">
          <span className="font-semibold pt-0.5">Coordinator:</span>
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-1">Gary</span>
            <NumberedInput {...iprops(1)} />
          </div>

          <span className="font-semibold pt-0.5">Level:</span>
          <div className="flex items-center flex-wrap gap-y-2">
            <NumberedInput {...iprops(2)} />
          </div>

          <span className="font-semibold pt-0.5">Place:</span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">the</span>
              <NumberedInput {...iprops(3)} />
            </div>
            <div className="flex items-center flex-wrap gap-y-2">
              <NumberedInput {...iprops(4)} />
              <span className="ml-1">Street</span>
            </div>
            <div>First floor, Room T347</div>
          </div>

          <span className="font-semibold pt-0.5">Time:</span>
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-1">Thursday morning at</span>
            <NumberedInput {...iprops(5)} />
          </div>

          <span className="font-semibold pt-0.5">Recommended website:</span>
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-1">&apos;The perfect</span>
            <NumberedInput {...iprops(6)} />
            <span className="ml-0.5">&apos;</span>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h2 className="font-bold text-[16px] mb-0">Questions 7–10</h2>
        <p className="text-[17px]">Complete the table below.</p>
        <p className="text-[17px]">
          Write <span className="font-bold">ONE WORD ONLY</span> for each answer.
        </p>
      </div>

      <h3 className="font-bold text-[19px] mb-4">A typical 45-minute guitar lesson</h3>

      <div className="overflow-x-auto max-w-[900px]">
        <table className="w-full border-collapse text-[17px] text-left">
          <thead>
            <tr>
              <th className="border border-gray-500 px-3 py-2 font-bold w-[15%]">Time</th>
              <th className="border border-gray-500 px-3 py-2 font-bold w-[35%]">Activity</th>
              <th className="border border-gray-500 px-3 py-2 font-bold w-[50%]">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-500 px-3 py-2 align-top">5 minutes</td>
              <td className="border border-gray-500 px-3 py-2 align-top">tuning guitars</td>
              <td className="border border-gray-500 px-3 py-2 align-top">
                <div className="flex items-center flex-wrap gap-y-2">
                  <span className="mr-1">using an app or by</span>
                  <NumberedInput {...iprops(7)} />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-3 py-2 align-top">10 minutes</td>
              <td className="border border-gray-500 px-3 py-2 align-top">strumming chords using our thumbs</td>
              <td className="border border-gray-500 px-3 py-2 align-top">
                <div className="flex items-center flex-wrap gap-y-2">
                  <span className="mr-1">keeping time while the teacher is</span>
                  <NumberedInput {...iprops(8)} />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-3 py-2 align-top">15 minutes</td>
              <td className="border border-gray-500 px-3 py-2 align-top">playing songs</td>
              <td className="border border-gray-500 px-3 py-2 align-top">
                <div className="flex items-center flex-wrap gap-y-2">
                  <span className="mr-1">often listening to a</span>
                  <NumberedInput {...iprops(9)} />
                  <span className="ml-1">of a song</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-3 py-2 align-top">10 minutes</td>
              <td className="border border-gray-500 px-3 py-2 align-top">playing single notes and simple tunes</td>
              <td className="border border-gray-500 px-3 py-2 align-top">
                <div className="flex items-center flex-wrap gap-y-2">
                  <span className="mr-1">playing together, then</span>
                  <NumberedInput {...iprops(10)} />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-500 px-3 py-2 align-top">5 minutes</td>
              <td className="border border-gray-500 px-3 py-2 align-top">noting things to practise at home</td>
              <td className="border border-gray-500 px-3 py-2 align-top"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
