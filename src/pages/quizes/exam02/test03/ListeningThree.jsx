import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import ExamHeader from "../../../../components/exam03/ExamHeader";
import PartBanner from "../../../../components/exam03/PartBanner";
import ExamFooter from "../../../../components/exam03/ExamFooter";
import Part1 from "../../../../components/exam03/Part1";
import Part2 from "../../../../components/exam03/Part2";
import Part3 from "../../../../components/exam03/Part3";
import Part4 from "../../../../components/exam03/Part4";
import AudioOverlay from "../../../../components/exam03/AudioOverlay"; 
import AudioPath from "../test03/Test 3.mp3";
import api from '../../../../api';

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// এখান থেকে পরীক্ষার সময় মিনিট হিসেবে সহজেই পরিবর্তন করতে পারবেন (যেমন: 45, 30, ইত্যাদি)
const EXAM_DURATION_MINUTES = 30;

const GROUPS = [
  [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]],
  [[11], [12], [13], [14], [15], [16], [17], [18], [19], [20]],
  [[21], [22], [23], [24], [25], [26], [27], [28], [29], [30]],
  [[31], [32], [33], [34], [35], [36], [37], [38], [39], [40]],
];

const PARTS = [ 
  {
    title: "Part 1",
    intro: "Listen and answer questions 1–10.",
    start: 1,
    end: 10,
    Component: Part1,
  },
  {
    title: "Part 2",
    intro: "Listen and answer questions 11–20.",
    start: 11,
    end: 20,
    Component: Part2,
  },
  {
    title: "Part 3",
    intro: "Listen and answer questions 21–30.",
    start: 21,
    end: 30,
    Component: Part3,
  },
  {
    title: "Part 4",
    intro: "Listen and answer questions 31–40.",
    start: 31,
    end: 40,
    Component: Part4,
  },
];

const ListeningThree = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activePart, setActivePart] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [currentQ, setCurrentQ] = useState(1);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_MINUTES * 60);
  const qRefs = useRef({});
  const audioRef = useRef(null);

  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  // লেটেস্ট স্টেটের রেফারেন্স রাখার জন্য (যাতে টাইমার একদম সঠিক লেটেস্ট ভ্যালু পায়)
  const answersRef = useRef(answers);
  const isSavingRef = useRef(isSaving);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    isSavingRef.current = isSaving;
  }, [isSaving]);

  const setAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const findPartIndex = (num) => PARTS.findIndex((p) => num >= p.start && num <= p.end);

  const setCurrentQuestion = (num) => {
    setCurrentQ(num);
    const idx = findPartIndex(num);
    if (idx !== -1 && idx !== activePart) setActivePart(idx);
  };

  const scrollToQ = (num) => {
    const el = qRefs.current[num];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      if (typeof el.focus === "function") {
        el.focus({ preventScroll: true });
      }
    }
    setCurrentQuestion(num);
  };

  const switchPart = (idx) => {
    setActivePart(idx);
    const firstQ = PARTS[idx].start;
    setCurrentQ(firstQ);
    requestAnimationFrame(() => {
      scrollToQ(firstQ);
    });
  };

  const countAnswered = (partIdx) => {
    const groups = GROUPS[partIdx];
    return groups.reduce((count, g) => {
      const key = g.length > 1 ? `${g[0]}-${g[g.length - 1]}` : String(g[0]);
      const ans = answers[key];
      if (Array.isArray(ans)) return count + (ans.length > 0 ? 1 : 0);
      return count + (ans ? 1 : 0);
    }, 0);
  };

  const allQs = useMemo(() => Array.from({ length: 40 }, (_, i) => i + 1), []);

  const goPrev = () => {
    const idx = allQs.indexOf(currentQ);
    if (idx > 0) scrollToQ(allQs[idx - 1]);
  };

  const goNext = () => {
    const idx = allQs.indexOf(currentQ);
    if (idx < allQs.length - 1) scrollToQ(allQs[idx + 1]);
  };

  const ActiveComponent = PARTS[activePart].Component;

  const handlePlayAudio = () => {
    setIsAudioPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.error("Audio playback failed:", err));
    }
  };

  // অটো সাবমিটের মূল ফাংশন (কনো কনফার্মেশন পপআপ ছাড়াই অটো সেভ হবে)
  const handleAutoSubmit = useCallback(async () => {
    if (isSavingRef.current) return;

    setIsSaving(true);
    
    // স্ক্রিনে একটি লোডিং ইন্ডিকেটর দেখাবে যে পরীক্ষাটি অটো সেভ হচ্ছে
    Swal.fire({
      title: 'Time Out!',
      text: 'Saving your exam answers automatically...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const userId = userData?.id;
      const formattedAnswers = {};
      
      const currentAnswers = answersRef.current;
      for (let i = 1; i <= 40; i++) {
        formattedAnswers[`ans${i}`] = currentAnswers[String(i)] || currentAnswers[`q${i}`] || "";
      }

      const payload = {
        user_id: userId,
        exam_id: Number(2),
        test_id: Number(3),
        module_type: 'listening',
        answers: formattedAnswers,
      };

      const response = await api.post('storeExamResult', payload);
      
      if (response.status === 200 || response.status === 201) {
        Swal.close();
        navigate(-1); 
      }
    } catch (error) {
      Swal.close();
      console.error("Auto submission failed:", error);
      // এরর খেলেও ইউজারকে সেফলি ব্যাক করানো হচ্ছে
      navigate(-1); 
    } finally {
      setIsSaving(false);
    }
  }, [navigate]);

  // টাইমার ইফেক্ট: নির্দিষ্ট মিনিট পর অটো সাবমিট ট্রিগার করবে
  useEffect(() => {
    if (timeLeft <= 0) {
      if (!isSavingRef.current) {
        handleAutoSubmit();
      }
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [handleAutoSubmit, timeLeft]);

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white text-[#111]">
      <audio 
        ref={audioRef} 
        src={AudioPath}
        preload="auto" 
      />
      {!isAudioPlaying && <AudioOverlay onPlay={handlePlayAudio} />}
      <ExamHeader timeLeft={timeLeft} />
      
      <main className="flex-1 min-h-0 flex flex-col relative">
        <div className="flex-1 min-h-0 overflow-y-auto pb-24">
          <PartBanner title={PARTS[activePart].title} intro={PARTS[activePart].intro} />
          <ActiveComponent
            answers={answers}
            setAnswer={setAnswer}
            currentQ={currentQ}
            setCurrentQ={setCurrentQuestion}
            qRefs={qRefs}
          />
        </div>
        
        {/* ম্যানুয়াল সাবমিট বাটনটি এখান থেকে সম্পূর্ণ রিমুভ করা হয়েছে */}
      </main>

      <ExamFooter
        parts={PARTS}
        groups={GROUPS}
        activePart={activePart}
        switchPart={switchPart}
        currentQ={currentQ}
        scrollToQ={scrollToQ}
        answers={answers}
        countAnswered={countAnswered}
        goPrev={goPrev}
        goNext={goNext}
      />
    </div>
  );
};

export default ListeningThree;