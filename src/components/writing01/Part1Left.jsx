// @ts-nocheck
import ChartImg from "../../assets/test/writting.png";

export default function Part1Left() {
  return (
    <div className="text-[16px] leading-[1.5] text-black mt-2">
      <p className="mb-5 font-semibold">
        The graph below gives information on the numbers of participants for different activities
        at one social centre in Melbourne, Australia for the period 2000 to 2020.
      </p>

      <p className="mb-10 font-semibold">
        Summarise the information by selecting and reporting the main features, and make
        comparisons where relevant.
      </p>

      <p className="font-bold text-center mb-2">
        Number of participants, by activity 2000–2020
      </p>

      <div className="mt-4">
        <img
          src={ChartImg}
          alt="Number of participants by activity 2000-2020"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}
