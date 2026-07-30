import NumberedInput from "./NumberedInput";

export default function Part4({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const iprops = (num) => ({
    num,
    answers,
    setAnswer,
    qRefs,
    currentQ,
    setCurrentQ,
  });

  return (
    <div className="mx-auto w-full px-4 text-[15px] text-black pb-32">
      <div className="mb-4">
        <h2 className="font-bold text-[16px] mb-1">Questions 31–40</h2>
        <p className="text-[17px]">Complete the notes below.</p>
        <p className="text-[17px]">
          Write <span className="font-bold">ONE WORD ONLY</span> for each answer.
        </p>
      </div>

      <h2 className="font-bold text-[17px] mb-6 text-center">Microplastics</h2>

      <div className="mb-10">
        <b className="font-bold text-[17px]">Where microplastics come from</b>
        <ul className="list-disc pl-10 space-y-4 text-[17px] mt-3">
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">fibres from some</span>
              <NumberedInput {...iprops(31)} width={120} />
              <span className="ml-1">during washing</span>
            </div>
          </li>
          <li>the breakdown of large pieces of plastic</li>
          <li>waste from industry</li>
          <li>the action of vehicle tyres on roads</li>
        </ul>
      </div>

      <div className="mb-10">
        <b className="font-bold text-[17px]">Effects of microplastics</b>
        <ul className="list-disc pl-10 space-y-4 text-[17px] mt-3">
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">They cause injuries to the</span>
              <NumberedInput {...iprops(32)} width={120} />
              <span className="ml-1">of wildlife and affect their digestive systems.</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">They enter the food chain, e.g. in bottled and tap water,</span>
              <NumberedInput {...iprops(33)} width={120} />
              <span className="ml-1">and seafood.</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">
                They may not affect human health, but they are already banned in skin cleaning products and
              </span>
              <NumberedInput {...iprops(34)} width={120} />
              <span className="ml-1">in some countries.</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">Microplastics enter the soil through the air, rain and</span>
              <NumberedInput {...iprops(35)} width={120} />
              <span>.</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="mb-10">
        <b className="font-bold text-[17px]">Microplastics in the soil – a study by Anglia Ruskin University</b>
        <ul className="list-disc pl-10 space-y-4 text-[17px] mt-3">
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">Earthworms are important because they add</span>
              <NumberedInput {...iprops(36)} width={120} />
              <span className="ml-1">to the soil.</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">The study aimed to find whether microplastics in earthworms affect the</span>
              <NumberedInput {...iprops(37)} width={120} />
              <span className="ml-1">of plants.</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">The study found that microplastics caused</span>
              <NumberedInput {...iprops(38)} width={120} />
              <span className="ml-1">loss in earthworms</span>
            </div>
          </li>
          <li>fewer seeds to germinate</li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">a rise in the level of</span>
              <NumberedInput {...iprops(39)} width={120} />
              <span className="ml-1">in the soil.</span>
            </div>
          </li>
          <li>
            <div className="font-semibold mb-2">The study concluded:</div>
            <ul className="list-disc pl-6 space-y-3">
              <li>soil should be seen as an important natural process.</li>
              <li>
                <div className="flex items-center flex-wrap gap-y-2">
                  <span className="mr-1">changes to soil damage both ecosystems and</span>
                  <NumberedInput {...iprops(40)} width={120} />
                  <span>.</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
