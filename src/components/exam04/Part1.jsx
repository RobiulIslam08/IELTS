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
        <p className="text-[17px]">Complete the notes below.</p>
        <p className="text-[17px]">
          Write <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each answer.
        </p>
      </div>

      <h3 className="font-bold text-[19px] mb-6">First day at work</h3>

      <div className="space-y-4 text-[17px] text-black mb-10">
        <div className="flex items-center flex-wrap gap-y-2">
          <span className="mr-2">Name of supervisor:</span>
          <NumberedInput {...iprops(1)} />
        </div>
        <div className="flex items-center flex-wrap gap-y-2">
          <span className="mr-2">Where to leave coat and bag: use</span>
          <NumberedInput {...iprops(2)} />
          <span className="ml-2">in staffroom</span>
        </div>
        <div>
          <div className="mb-2">See Tiffany in HR:</div>
          <div className="space-y-3 pl-4">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-2">to give</span>
              <NumberedInput {...iprops(3)} />
              <span className="ml-2">number</span>
            </div>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-2">to collect</span>
              <NumberedInput {...iprops(4)} />
            </div>
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-y-2">
          <span className="mr-2">Location of HR office: on</span>
          <NumberedInput {...iprops(5)} />
          <span className="ml-2">floor</span>
        </div>
        <div className="flex items-center flex-wrap gap-y-2">
          <span className="mr-2">Supervisor&apos;s mobile number:</span>
          <NumberedInput {...iprops(6)} width={180} />
        </div>
      </div>

      <div className="mb-5">
        <h2 className="font-bold text-[16px] mb-0">Questions 7–10</h2>
        <p className="text-[17px]">Complete the table below.</p>
        <p className="text-[17px]">
          Write <span className="font-bold">ONE WORD ONLY</span> for each answer.
        </p>
      </div>

      <div className="mt-4 border border-neutral-400 text-[17px] text-black max-w-[900px]">
        <div className="bg-neutral-50 border-b border-neutral-400 py-2 text-center font-bold text-[18px]">
          Responsibilities
        </div>
        <div className="grid grid-cols-[180px_1fr_1fr_1fr] border-b border-neutral-400 font-bold bg-neutral-50">
          <div className="p-2 border-r border-neutral-400" />
          <div className="p-2 border-r border-neutral-400 text-center">Task 1</div>
          <div className="p-2 border-r border-neutral-400 text-center">Task 2</div>
          <div className="p-2 text-center">Notes</div>
        </div>

        <div className="grid grid-cols-[180px_1fr_1fr_1fr] border-b border-neutral-400">
          <div className="p-2 font-bold border-r border-neutral-400 bg-neutral-50">Bakery section</div>
          <div className="p-2 border-r border-neutral-400">Check sell-by dates</div>
          <div className="p-2 border-r border-neutral-400">Change price labels</div>
          <div className="p-2">
            <div className="flex flex-wrap items-center gap-y-2">
              <span className="mr-2">Use</span>
              <NumberedInput {...iprops(7)} />
              <span className="ml-2">labels</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[180px_1fr_1fr_1fr] border-b border-neutral-400">
          <div className="p-2 font-bold border-r border-neutral-400 bg-neutral-50">Sushi takeaway counter</div>
          <div className="p-2 border-r border-neutral-400">
            <div className="flex flex-wrap items-center gap-y-2">
              <span className="mr-2">Re-stock with</span>
              <NumberedInput {...iprops(8)} />
              <span className="ml-2">boxes if needed</span>
            </div>
          </div>
          <div className="p-2 border-r border-neutral-400">Wipe preparation area and clean the sink</div>
          <div className="p-2">Do not clean any knives</div>
        </div>

        <div className="grid grid-cols-[180px_1fr_1fr_1fr]">
          <div className="p-2 font-bold border-r border-neutral-400 bg-neutral-50">Meat and fish counters</div>
          <div className="p-2 border-r border-neutral-400">
            Clean the serving area, including the weighing scales
          </div>
          <div className="p-2 border-r border-neutral-400">
            <div className="flex flex-wrap items-center gap-y-2">
              <span className="mr-2">Collect</span>
              <NumberedInput {...iprops(9)} />
              <span className="ml-2">for the fish from the cold-room</span>
            </div>
          </div>
          <div className="p-2">
            <div className="flex flex-wrap items-center gap-y-2">
              <span className="mr-2">Must wear special</span>
              <NumberedInput {...iprops(10)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
