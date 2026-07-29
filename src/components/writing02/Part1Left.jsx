// @ts-nocheck
import HarbourMaps from "../../assets/test/porth-harbour-maps.png";

export default function Part1Left() {
  return (
    <div className="text-[16px] leading-[1.5] text-black mt-2">
      <p className="mb-5 font-semibold">
        The plans below show a harbour in 2000 and how it looks today.
      </p>

      <p className="mb-10 font-semibold">
        Summarise the information by selecting and reporting the main features, and make
        comparisons where relevant.
      </p>

      <div className="mt-4">
        <img
          src={HarbourMaps}
          alt="Porth Harbour in 2000 and today"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}
