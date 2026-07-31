import { Headphones } from "lucide-react";
import { FaPlay } from "react-icons/fa6";

export default function AudioOverlay({ onPlay }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center max-w-9xl text-center px-4 font-sans">
        <Headphones className="w-28 h-28 mb-8" strokeWidth={1.5} />
        
        <p className="text-[17px] font-medium mb-6 tracking-wide">
          You will be listening to an audio clip during this test. You will not be permitted to pause or rewind the audio while answering the questions.
        </p>
        
        <p className="text-[17px] font-bold mb-8">
          To continue, click Play.
        </p>
        
        <button
          onClick={onPlay}
          className="flex items-center gap-3 bg-black hover:bg-black/90 text-white px-8 py-2.5 rounded shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all font-bold text-lg"
        >
          <FaPlay className="text-white w-4 h-4" />
          Play
        </button>
      </div>
    </div>
  );
}
