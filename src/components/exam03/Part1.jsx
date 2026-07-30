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

      <h3 className="font-bold text-[19px] mb-6">Local food shops</h3>

      <div className="mb-8 space-y-6 text-[17px] text-black">
        <div>
          <div className="font-bold mb-3">Where to go</div>
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-2">Kite Place – near the</span>
            <NumberedInput {...iprops(1)} />
          </div>
        </div>

        <div>
          <div className="font-bold mb-3">Fish market</div>
          <div className="space-y-3">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-2">cross the</span>
              <NumberedInput {...iprops(2)} />
              <span className="ml-2">and turn right</span>
            </div>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-2">best to go before</span>
              <NumberedInput {...iprops(3)} />
              <span className="ml-2">pm, earlier than closing time</span>
            </div>
          </div>
        </div>

        <div>
          <div className="font-bold mb-3">Organic shop</div>
          <div className="space-y-3">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-2">called &apos;</span>
              <NumberedInput {...iprops(4)} />
              <span className="ml-1">&apos;</span>
            </div>
            <div>below a restaurant in the large, grey building</div>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-2">look for the large</span>
              <NumberedInput {...iprops(5)} />
              <span className="ml-2">outside</span>
            </div>
          </div>
        </div>

        <div>
          <div className="font-bold mb-3">Supermarket</div>
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-2">take a</span>
            <NumberedInput {...iprops(6)} />
            <span className="ml-2">minibus, number 289</span>
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

      <div className="mt-4 border border-neutral-400 text-[17px] text-black max-w-[720px]">
        <div className="bg-neutral-50 border-b border-neutral-400 py-2 text-center font-bold text-[18px]">
          Shopping
        </div>

        <div className="grid grid-cols-[160px_1fr_1fr] border-b border-neutral-400 font-bold bg-neutral-50">
          <div className="p-3 border-r border-neutral-400" />
          <div className="p-3 border-r border-neutral-400 text-center">To buy</div>
          <div className="p-3 text-center">Other ideas</div>
        </div>

        <div className="grid grid-cols-[160px_1fr_1fr] border-b border-neutral-400 min-h-[100px]">
          <div className="p-3 font-bold border-r border-neutral-400 bg-neutral-50 flex items-start">
            Fish market
          </div>
          <div className="p-3 border-r border-neutral-400">a dozen prawns</div>
          <div className="p-3">
            <div className="flex flex-wrap items-center gap-y-2">
              <span className="mr-2">a handful of</span>
              <NumberedInput {...iprops(7)} />
            </div>
            <div className="text-neutral-500 text-[15px] mt-1">(type of seaweed)</div>
          </div>
        </div>

        <div className="grid grid-cols-[160px_1fr_1fr] border-b border-neutral-400 min-h-[100px]">
          <div className="p-3 font-bold border-r border-neutral-400 bg-neutral-50 flex items-start">
            Organic shop
          </div>
          <div className="p-3 border-r border-neutral-400">
            <div className="flex flex-wrap items-center gap-y-2">
              <span className="mr-2">beans and a</span>
              <NumberedInput {...iprops(8)} />
              <span className="ml-2">for dessert</span>
            </div>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap items-center gap-y-2">
              <span className="mr-2">spices and</span>
              <NumberedInput {...iprops(9)} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[160px_1fr_1fr] min-h-[100px]">
          <div className="p-3 font-bold border-r border-neutral-400 bg-neutral-50 flex items-start">
            Bakery
          </div>
          <div className="p-3 border-r border-neutral-400">a brown loaf</div>
          <div className="p-3">
            <div className="flex flex-wrap items-center gap-y-2">
              <span className="mr-2">a</span>
              <NumberedInput {...iprops(10)} />
              <span className="ml-2">tart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
