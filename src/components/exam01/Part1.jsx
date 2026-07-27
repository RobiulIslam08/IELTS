import NumberedInput from "./NumberedInput";

export default function Part1({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  // Helper for Input props
  const iprops = (num) => ({
    num,
    answers,
    setAnswer,
    qRefs,
    currentQ,
    setCurrentQ,
  });

  return (
    <div className="mx-auto w-full  px-4 text-[15px] text-black pb-20">
      <div className="mb-5">
        <h2 className="font-bold text-[16px] mb-0">Questions 1–10</h2>
        <p className="text-[17px]">Complete the notes. Write <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each answer.</p>
      </div>

      <h3 className="font-bold text-[19px] mb-6">Phone call about second-hand furniture</h3>

      <div className="mb-8">
        <div className="font-bold mb-4 text-[17px]">Items:</div>
        
        <div className="grid grid-cols-[140px_1fr] gap-x-0 gap-y-6 text-[17px] text-black">
          {/* Row 1 */}
          <div className="">Dining table:</div>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="mr-2 ">-</span>
              <NumberedInput {...iprops(1)} />
              <span className="ml-2 ">shape</span>
            </div>
            <div>- medium size</div>
            <div className="flex items-center">
              <span className="mr-2">-</span>
              <NumberedInput {...iprops(2)} />
              <span className="ml-2">old</span>
            </div>
            <div>- price: £25.00</div>
          </div>

          {/* Row 2 */}
          <div>Dining chairs:</div>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="mr-2">-</span>
              <span>set of</span>
              <NumberedInput {...iprops(3)} />
              <span className="ml-2">chairs</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">-</span>
              <span>seats covered in</span>
              <NumberedInput {...iprops(4)} />
              <span className="ml-2">material</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">-</span>
              <span>in</span>
              <NumberedInput {...iprops(5)} />
              <span className="ml-2">condition</span>
            </div>
            <div>- price: £20.00</div>
          </div>

          {/* Row 3 */}
          <div>Desk:</div>
          <div className="space-y-4">
            <div>- length: 1 metre 20</div>
            <div className="flex items-center flex-wrap gap-y-2">
              <span className="mr-2">-</span>
              <span>3 drawers. Top drawer has a</span>
              <NumberedInput {...iprops(6)} />
              <span>.</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">-</span>
              <span>price: £</span>
              <NumberedInput {...iprops(7)} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 text-[17px] text-black">
        <div className="font-bold mb-4">Address:</div>
        <div className="flex items-center flex-wrap gap-y-2 ml-28">
          <NumberedInput {...iprops(8)} />
          <span className="ml-2">Old Lane, Stonethorpe</span>
        </div>
      </div>

      <div>
        <div className="font-bold mb-4 text-[17px] text-black">Directions:</div>
        <div className="ml-28 leading-relaxed max-w-4xl text-[17px] text-black">
          Take the Hawcroft road out of Stonethorpe. Go past the secondary school, then turn 
          <NumberedInput {...iprops(9)} /> 
          at the crossroads. House is down this road, opposite the 
          <NumberedInput {...iprops(10)} /> 
          .
        </div>
      </div>
    </div>
  );
}
