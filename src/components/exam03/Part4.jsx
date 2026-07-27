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
          <h2 className="font-semibold text-[17px] mb-1">Complete the notes below.</h2>
          <p className="text-[17px]">Write ONE WORD ONLY for each answer.</p>
        </div>

        <h2 className="font-bold text-[17px] mb-4 text-center">Microplastics</h2>

        
      </div>

      
      <div className="mb-10">
        

       <b className="font-bold">Where microplastics come from:</b>
        <ul className="list-disc pl-10 space-y-4 text-[17px]">
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">fibres from some</span>
              <NumberedInput {...iprops(31)} width={120} />
              <span>during washing</span>
            </div>
          </li>
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">the breakdown of large pieces of plastic</span>
              
              
            </div>
          </li>
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1"> waste from industry</span>
              
              
            </div>
          </li>
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">the action of vehicle tyres on roads</span>
              
              
            </div>
          </li>
          
          
        </ul>
      </div>
      <div className="mb-10">
        

       <b className="font-bold">Effects of microplastics:</b>
        <ul className="list-disc pl-10 space-y-4 text-[17px]">
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">They cause injuries to the</span>
              <NumberedInput {...iprops(32)} width={120} />
              <span>of wildlife and affect their digestive systems.</span>
            </div>
          </li>
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">They enter the food chain, e.g., in bottled and tap water,</span>
              <NumberedInput {...iprops(33)} width={120} />
              <span>and seafood.</span>
            </div>
          </li>
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">They may not affect human health, but they are already banned in skin cleaning products and

              </span>
              <NumberedInput {...iprops(34)} width={120} />
              <span>in some countries.</span>
              
              
            </div>
          </li>
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">Microplastics enter the soil through the air, rain and</span>
              <NumberedInput {...iprops(35)} width={120} />
              <span>.</span>
            </div>
          </li>
          
          
        </ul>
      </div>
      <div className="mb-10">
        

       <b className="font-bold">Microplastics in the soil - a study by Anglia Ruskin University:</b>
        <ul className="list-disc pl-10 space-y-4 text-[17px]">
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">Earthworms are important because they add</span>
              <NumberedInput {...iprops(36)} width={120} />
              <span>to the soil.</span>
            </div>
          </li>
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">The study aimed to find whether microplastics in earthworms affect the</span>
              <NumberedInput {...iprops(37)} width={120} />
              <span>of plants.</span>
            </div>
          </li>
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1"> The study found that microplastics caused</span>
              <NumberedInput {...iprops(38)} width={120} />
              <span>loss in earthworms</span>
            </div>
          </li>
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">fewer seeds to germinate</span>
              <span className="mr-1">a rise in the level of</span>
              <NumberedInput {...iprops(39)} width={120} />
              <span>in the soil.</span>
              
              
            </div>
          </li>
          <li className="pl-1">
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">The study concluded:</span>
              <span className="mr-1">soil should be seen as an important natural process.</span>
              <span className="mr-1">changes to soil damage both ecosystems and</span>
              <NumberedInput {...iprops(40)} width={120} />
              <span>.</span>
              
              
            </div>
          </li>
          
          
        </ul>
      </div>

    </div>
  );
}
