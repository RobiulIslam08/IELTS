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

      <h2 className="font-bold text-[17px] mb-6 text-center">Tree planting</h2>

      <div className="mb-8">
        <b className="font-bold text-[17px]">Reforestation projects should:</b>
        <ul className="list-disc pl-10 space-y-4 text-[17px] mt-3">
          <li>include a range of tree species</li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">not include invasive species because of possible</span>
              <NumberedInput {...iprops(31)} />
              <span className="ml-1">with native species</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">aim to capture carbon, protect the environment and provide sustainable sources of</span>
              <NumberedInput {...iprops(32)} />
              <span className="ml-1">for local people</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">use tree seeds with a high genetic diversity to increase resistance to</span>
              <NumberedInput {...iprops(33)} />
              <span className="ml-1">and climate change</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">
                plant trees on previously forested land which is in a bad condition, not select land which is being used
                for
              </span>
              <NumberedInput {...iprops(34)} />
            </div>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <b className="font-bold text-[17px]">Large-scale reforestation projects</b>
        <ul className="list-disc pl-10 space-y-4 text-[17px] mt-3">
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">Base planning decisions on information from accurate</span>
              <NumberedInput {...iprops(35)} />
              <span>.</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">Drones are useful for identifying areas in Brazil which are endangered by keeping</span>
              <NumberedInput {...iprops(36)} />
              <span className="ml-1">and illegal logging.</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <b className="font-bold text-[17px]">Lampang Province, Northern Thailand</b>
        <ul className="list-disc pl-10 space-y-4 text-[17px] mt-3">
          <li>A forest was restored in an area damaged by mining.</li>
          <li>
            A variety of native fig trees were planted, which are important for
            <ul className="list-disc pl-6 mt-2 space-y-3">
              <li>supporting many wildlife species</li>
              <li>
                <div className="flex items-center flex-wrap gap-y-2">
                  <span className="mr-1">increasing the</span>
                  <NumberedInput {...iprops(37)} />
                  <span className="ml-1">of recovery by attracting animals and birds, e.g.,</span>
                  <NumberedInput {...iprops(38)} />
                  <span className="ml-1">were soon attracted to the area.</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <b className="font-bold text-[17px]">Involving local communities</b>
        <ul className="list-disc pl-10 space-y-4 text-[17px] mt-3">
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">Destruction of mangrove forests in Madagascar made it difficult for people to make a living from</span>
              <NumberedInput {...iprops(39)} />
              <span>.</span>
            </div>
          </li>
          <li>
            The mangrove reforestation project:
            <ul className="list-disc pl-6 mt-2 space-y-3">
              <li>provided employment for local people</li>
              <li>restored a healthy ecosystem</li>
              <li>
                <div className="flex items-center flex-wrap gap-y-2">
                  <span className="mr-1">protects against the higher risk of</span>
                  <NumberedInput {...iprops(40)} />
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
