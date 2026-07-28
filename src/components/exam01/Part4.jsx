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

      <h3 className="font-bold text-[19px] mb-4">Céide Fields</h3>
      <ul className="list-disc pl-6 mb-8 text-[17px]">
        <li>an important Neolithic archaeological site in the northwest of Ireland</li>
      </ul>

      <div className="mb-8">
        <div className="font-bold mb-4 text-[17px]">Discovery</div>
        <ul className="list-disc pl-6 space-y-4 text-[17px] text-black">
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">In the 1930s, a local teacher realised that stones beneath the bog surface were once</span>
              <NumberedInput {...iprops(31)} />
              <span>.</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">His</span>
              <NumberedInput {...iprops(32)} />
              <span className="ml-1">became an archaeologist and undertook an investigation of the site:</span>
            </div>
            <ul className="list-disc pl-6 mt-3 space-y-3">
              <li>
                <div className="flex items-center flex-wrap gap-y-2">
                  <span className="mr-1">a traditional method used by local people to dig for</span>
                  <NumberedInput {...iprops(33)} />
                  <span className="ml-1">was used to identify where stones were located</span>
                </div>
              </li>
              <li>carbon dating later proved the site was Neolithic.</li>
            </ul>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">Items are well preserved in the bog because of a lack of</span>
              <NumberedInput {...iprops(34)} />
              <span>.</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <div className="font-bold mb-4 text-[17px]">Neolithic farmers</div>
        <ul className="list-disc pl-6 space-y-4 text-[17px] text-black">
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">Houses were</span>
              <NumberedInput {...iprops(35)} />
              <span className="ml-1">in shape and had a hole in the roof.</span>
            </div>
          </li>
          <li>
            <span>Neolithic innovations include:</span>
            <ul className="list-disc pl-6 mt-3 space-y-3">
              <li>cooking indoors</li>
              <li>
                <div className="flex items-center flex-wrap gap-y-2">
                  <span className="mr-1">pots used for storage and to make</span>
                  <NumberedInput {...iprops(36)} />
                  <span>.</span>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">Each field at Céide was large enough to support a big</span>
              <NumberedInput {...iprops(37)} />
              <span>.</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">
                The fields were probably used to restrict the grazing of animals – no evidence of structures to house
                them during
              </span>
              <NumberedInput {...iprops(38)} />
              <span>.</span>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <div className="font-bold mb-4 text-[17px]">Reasons for the decline in farming</div>
        <ul className="list-disc pl-6 space-y-4 text-[17px] text-black">
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">a decline in</span>
              <NumberedInput {...iprops(39)} />
              <span className="ml-1">quality</span>
            </div>
          </li>
          <li>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-1">an increase in</span>
              <NumberedInput {...iprops(40)} />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
