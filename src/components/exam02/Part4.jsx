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
    <div className="mx-auto w-full px-4 text-[15px] text-black pb-20">
      <div className="mb-5">
        <h2 className="font-bold text-[16px] mb-0">Questions 31–40</h2>
        <p className="text-[17px]">Complete the notes below.</p>
        <p className="text-[17px]">
          Write <span className="font-bold">ONE WORD ONLY</span> for each answer.
        </p>
      </div>

      <div className="border border-gray-500 p-6 max-w-[760px] text-[17px]">
        <h3 className="font-bold text-[19px] text-center mb-6">Tardigrades</h3>

        <ul className="list-disc pl-6 space-y-3 mb-8">
          <li>more than 1,000 species, 0.05–1.2 millimetres long</li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">also known as water &apos;bears&apos; (due to how they</span>
              <NumberedInput {...iprops(31)} width={120} />
              <span className="ml-1">) and &apos;moss piglets&apos;</span>
            </div>
          </li>
        </ul>

        <div className="font-bold mb-3">Physical appearance</div>
        <ul className="list-disc pl-6 space-y-3 mb-8">
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">a</span>
              <NumberedInput {...iprops(32)} width={120} />
              <span className="ml-1">round body and four pairs of legs</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">claws or</span>
              <NumberedInput {...iprops(33)} width={120} />
              <span className="ml-1">for gripping</span>
            </div>
          </li>
          <li>absence of respiratory organs</li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">body filled with a liquid that carries both</span>
              <NumberedInput {...iprops(34)} width={120} />
              <span className="ml-1">and blood</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">mouth shaped like a</span>
              <NumberedInput {...iprops(35)} width={120} />
              <span className="ml-1">with teeth called stylets</span>
            </div>
          </li>
        </ul>

        <div className="font-bold mb-3">Habitat</div>
        <ul className="list-disc pl-6 space-y-3 mb-8">
          <li>often found at the bottom of a lake or on plants</li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">very resilient and can exist in very low or high</span>
              <NumberedInput {...iprops(36)} width={120} />
            </div>
          </li>
        </ul>

        <div className="font-bold mb-3">Cryptobiosis</div>
        <ul className="list-disc pl-6 space-y-3 mb-8">
          <li>In dry conditions, they roll into a ball called a &apos;tun&apos;.</li>
          <li>They stay alive with a much lower metabolism than usual.</li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">A type of</span>
              <NumberedInput {...iprops(37)} width={120} />
              <span className="ml-1">ensures their DNA is not damaged.</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">Research is underway to find out how many days they can stay alive in</span>
              <NumberedInput {...iprops(38)} width={120} />
              <span>.</span>
            </div>
          </li>
        </ul>

        <div className="font-bold mb-3">Feeding</div>
        <ul className="list-disc pl-6 space-y-3 mb-8">
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">consume liquids, e.g., those found in moss or</span>
              <NumberedInput {...iprops(39)} width={120} />
            </div>
          </li>
          <li>may eat other tardigrades</li>
        </ul>

        <div className="font-bold mb-3">Conservation status</div>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">They are not considered to be</span>
              <NumberedInput {...iprops(40)} width={120} />
              <span>.</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
