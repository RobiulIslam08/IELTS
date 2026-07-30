// @ts-nocheck

import ChartImg from "../../components/testing03writting/writingimg.png";

export default function Part1Left() {
  return (
    <div className="text-[16px] leading-[1.5] text-black mt-2">
      <p className="mb-5 font-semibold">
        The diagram below shows how a biofuel called ethanol is produced
      </p>

      <p className="mb-10  font-semibold">
       Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
      </p>

      <b className="font-bold text-center">Biofuel production: how ethanol is made</b>

      <div className="mt-4">
        <img
          src={ChartImg}
          alt="Biofuel production: how ethanol is made"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}
