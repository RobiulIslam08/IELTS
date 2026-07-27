import { useEffect, useMemo, useState } from "react";
import { Bell, Menu, Wifi } from "lucide-react";
import { FaBell } from "react-icons/fa";
import { parts, totalQuestions } from "../../../../components/test02/quizData";
// import { scoreQuestion } from "../../../../components/test01/quizUtils";
import { PartFour, PartOne, PartThree, PartTwo } from "../../../../components/test02/Sections";
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../../api';

// অডিও ইম্পোর্ট
import audio1 from "../../../../audio/test02/p1.mp3";
import audio2 from "../../../../audio/test02/p2.mp3";
import audio3 from "../../../../audio/test02/p3.mp3";
import audio4 from "../../../../audio/test02/p4.mp3";

import { FaVolumeHigh, FaVolumeHigh as FaVolumeHighIcon } from "react-icons/fa6";
import Swal from 'sweetalert2';

// ১. AudioComponent ইম্পোর্ট করুন (পাথ ঠিক করে নিন)
import AudioComponent from "../../../../components/AudioComponent"; 

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ListeningOne() {
  const { examId, testNumber } = useParams();
  const navigate = useNavigate();

  const [activePart, setActivePart] = useState(1);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30 * 60);
  const [isSaving, setIsSaving] = useState(false);

  // ২. অডিও ট্র্যাকগুলোর অ্যারে তৈরি করুন
  const allAudioTracks = [audio1, audio2, audio3, audio4];

  const calculateBandScore = (score) => {
    if (score >= 39) return 9.0;
    if (score >= 37) return 8.5;
    if (score >= 35) return 8.0;
    if (score >= 32) return 7.5;
    if (score >= 30) return 7.0;
    if (score >= 27) return 6.5;
    if (score >= 23) return 6.0;
    return 5.5;
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

//   const score = useMemo(() => {
//     return Array.from({ length: totalQuestions }, (_, index) => `q${index + 1}`).reduce(
//       (total, question) => total + (scoreQuestion(question, answers) ? 1 : 0),
//       0,
//     );
//   }, [answers]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const handleFinalSubmit = async () => {
    if (!confirmed || isSaving) return;

    setIsSaving(true);
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const userId = userData?.id;
      const formattedAnswers = {};
      for (let i = 1; i <= 40; i++) {
        formattedAnswers[`ans${i}`] = answers[`q${i}`] || "";
      }

      const payload = {
        user_id: userId,
        exam_id: Number(examId),
        test_id: Number(testNumber),
        module_type: 'listening',
        answers: formattedAnswers,
      };

      const response = await api.post('storeExamResult', payload);
      
      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        Swal.fire({
          title: 'Success!',
          text: 'Exam Successfully Submitted',
          icon: 'success',
          confirmButtonColor: '#059669',
        }).then((result) => {
          if (result.isConfirmed) navigate(-1); 
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.debug_info || "Submission failed. Please try again.";
      Swal.fire('Error', errorMsg, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 pb-[4.8rem] text-[16px] text-black">
      <header className="sticky top-0 z-20 bg-white px-5 pt-3 pb-6 text-stone-700 shadow-[0_2px_7px_rgba(0,0,0,0.12)]">
        <div className="mx-auto flex w-full items-center justify-between gap-6 max-[820px]:flex-wrap max-[820px]:gap-y-2">
          <div className="flex items-center gap-6 max-[820px]:w-full max-[820px]:justify-between">
            <div className="flex items-center font-black">
              <img className="w-20 object-contain md:w-[136px]" src="/ielts.svg" alt="Logo" />
            </div>
            <div className="grid gap-2 content-center justify-items-start text-[14px] text-stone-700">
              <span>Test Taker ID: 123456</span>
              <span className="flex items-center text-[#666666] gap-[5px]">
                <FaVolumeHigh size={24} className="text-[#666666]" /> Audio Mode
              </span>
            </div>
          </div>

          <div className={cx(
            "whitespace-nowrap text-[24px] font-bold text-[#333333] max-[820px]:order-3 max-[820px]:w-full max-[820px]:text-center max-[820px]:text-[20px]",
            secondsLeft <= 60 && "text-rose-600"
          )}>
            Time Remaining: {minutes}:{seconds}
          </div>
          <div className="flex items-center justify-end gap-[27px] max-[820px]:hidden cursor-pointer text-[#666666]">
            <Wifi size={25} />
            <FaBell size={21} />
            <Menu size={24} />
          </div>
        </div>
      </header>

      {/* ৩. এখন আর এরর আসবে না */}
      <AudioComponent audioTracks={allAudioTracks} />

     

      <section className="block">
        <div className="mx-auto min-w-0 w-[780px] max-w-[calc(100vw-36px)]">
          {activePart === 1 && <PartOne answers={answers} setAnswers={setAnswers} submitted={submitted} />}
          {activePart === 2 && <PartTwo answers={answers} setAnswers={setAnswers} submitted={submitted} />}
          {activePart === 3 && <PartThree answers={answers} setAnswers={setAnswers} submitted={submitted} />}
          {activePart === 4 && <PartFour answers={answers} setAnswers={setAnswers} submitted={submitted} />}
        </div>
      </section>

      <footer className="mx-auto mb-2.5 flex w-[780px] max-w-[calc(100vw-36px)] flex-col items-center justify-center gap-[18px] px-5 pt-2.5">
        <label className="flex items-center gap-[5px] text-[16px] font-normal text-black cursor-pointer">
          <input 
            type="checkbox" 
            className="w-4 h-4"
            checked={confirmed} 
            onChange={(event) => setConfirmed(event.target.checked)} 
          /> 
          I confirm that I have answered all questions.
        </label>

        <button 
          className="inline-flex h-[35px] min-w-[110px] items-center justify-center rounded-[5px] bg-emerald-600 px-5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-55" 
          disabled={!confirmed || isSaving || submitted} 
          onClick={handleFinalSubmit}
        >
          {isSaving ? "Saving..." : submitted ? "Submitted" : "Submit Test"}
        </button>
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid h-[50px] grid-cols-4 border-t border-stone-300 bg-stone-50 shadow-[0_-2px_7px_rgba(0,0,0,0.12)]" aria-label="Test parts">
        {parts.map((part) => (
          <button
            key={part.id}
            onClick={() => setActivePart(part.id)}
            className={cx(
              "cursor-pointer h-[50px] border-0 border-l border-stone-300 bg-stone-100 px-0 text-center text-[16px] leading-[50px] text-stone-700 hover:bg-stone-100 focus-visible:outline-none",
              part.id === activePart ? "bg-stone-50 font-bold text-black" : "font-normal",
            )}
          >
            <span>{part.title}</span>
          </button>
        ))}
      </nav>
    </main>
  );
}