import React, { useState, useRef, useEffect } from 'react';
import { FaVolumeHigh } from "react-icons/fa6";

const AudioComponent = ({ audioTracks = [] }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    audioRef.current.load();
                    await audioRef.current.play();
                } catch (err) {
                    console.log("Autoplay blocked. User needs to interact with the site first.");
                }
            }
        };
        playAudio();
    }, [currentTrackIndex]);

    const handleAudioEnded = () => {
        if (currentTrackIndex < audioTracks.length - 1) {
            setCurrentTrackIndex(prev => prev + 1);
        }
    };

    if (!audioTracks.length) return null;

    return (
        <div className="flex flex-col items-center justify-center px-4 pb-6 pt-5">
            {/* ভিজ্যুয়াল ইন্ডিকেটর: ইউজারকে বোঝানোর জন্য যে অডিও চলছে */}
            <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-indigo-50 flex items-center gap-4 ring-2 ring-indigo-50/50">
                <div className="bg-indigo-600 p-2 rounded-full">
                    <FaVolumeHigh size={18} className="text-white animate-pulse" />
                </div>
                <div>
                    <p className="text-[14px] font-bold text-slate-800">
                        Listening Section: Part {currentTrackIndex + 1}
                    </p>
                    <p className="text-[11px] text-indigo-500 font-medium uppercase tracking-wider">
                        Audio is playing automatically
                    </p>
                </div>
            </div>

            {/* অডিও ট্যাগ - এখানে 'controls' নেই, তাই ইউজার এটি দেখতে বা কন্ট্রোল করতে পারবে না */}
            <audio 
                ref={audioRef}
                className="hidden" // পুরোপুরি হাইড করার জন্য
                autoPlay 
                onEnded={handleAudioEnded}
                src={audioTracks[currentTrackIndex]}
            />
        </div>
    );
};

export default AudioComponent;