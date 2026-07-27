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
        <h2 className="font-bold text-[16px] mb-0">Questions 1–10</h2>
        <p className="text-[17px]">
          Complete the notes. Write <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each answer.
        </p>
      </div>

      <h3 className="font-bold text-[19px] mb-6">Hinchingbrooke Country Park</h3>

      <div className="mb-8">
        <div className="font-bold mb-4 text-[17px]">The park</div>
        <div className="space-y-4 text-[17px] text-black">
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-2">Area:</span>
            <NumberedInput {...iprops(1)} />
            <span className="ml-2">hectares</span>
          </div>
          <div>Habitats: wetland, grassland and woodland</div>
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-2">Wetland: lakes, ponds and a</span>
            <NumberedInput {...iprops(2)} />
          </div>
          <div>Wildlife includes birds, insects and animals</div>
        </div>
      </div>

      <div className="mb-8">
        <div className="font-bold mb-4 text-[17px]">Subjects studied in educational visits include</div>
        <div className="space-y-4 text-[17px] text-black">
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-2">Science: Children look at</span>
            <NumberedInput {...iprops(3)} />
            <span className="ml-2">about plants, etc.</span>
          </div>
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-2">Geography: includes learning to use a</span>
            <NumberedInput {...iprops(4)} />
            <span className="ml-2">and compass</span>
          </div>
          <div>History: changes in land use</div>
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-2">Leisure and tourism: mostly concentrates on the park&apos;s</span>
            <NumberedInput {...iprops(5)} />
          </div>
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-2">Music: Children make</span>
            <NumberedInput {...iprops(6)} />
            <span className="ml-2">with natural materials, and experiment with rhythm and speed.</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="font-bold mb-4 text-[17px]">Benefits of outdoor educational visits</div>
        <div className="space-y-4 text-[17px] text-black">
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-2">They give children a feeling of</span>
            <NumberedInput {...iprops(7)} />
            <span className="ml-2">that they may not have elsewhere.</span>
          </div>
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-2">Children learn new</span>
            <NumberedInput {...iprops(8)} />
            <span className="ml-2">and gain self-confidence.</span>
          </div>
        </div>
      </div>

      <div>
        <div className="font-bold mb-4 text-[17px]">Practical issues</div>
        <div className="space-y-4 text-[17px] text-black">
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-2">Cost per child:</span>
            <span className="mr-1">£</span>
            <NumberedInput {...iprops(9)} />
          </div>
          <div className="flex items-center flex-wrap gap-y-2">
            <span className="mr-2">Adults, such as</span>
            <NumberedInput {...iprops(10)} />
            <span className="ml-2">, free</span>
          </div>
        </div>
      </div>
    </div>
  );
}
