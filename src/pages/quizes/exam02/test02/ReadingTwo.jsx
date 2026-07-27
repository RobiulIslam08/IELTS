import { useEffect, useState } from "react";
import { Menu, Wifi } from "lucide-react";
import { FaBell } from "react-icons/fa";
import { SectionOne, SectionTwo, SectionThree } from "./ReadingSections";
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../../api';
import Swal from 'sweetalert2';

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ReadingTwo() {
  const { examId, testNumber } = useParams();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(null); 
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60 * 60); 

  // টাইমার ইন্টিগ্রেশন
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const handleFinalSubmit = async () => {
    if (isSaving || submitted) return;

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to submit your Reading test?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#059669',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit!'
    }).then(async (result) => {
      if (result.isConfirmed) {
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
            module_type: 'reading', 
            exam_id: Number(examId),
            test_id: Number(testNumber),
            answers: formattedAnswers,
          };

          const response = await api.post('storeExamResult', payload);
          
          if (response.status === 200 || response.status === 201) {
            setSubmitted(true);
            Swal.fire({
              title: 'Success!',
              text: 'Reading Exam Successfully Submitted',
              icon: 'success',
              confirmButtonColor: '#059669',
            }).then((res) => {
              if (res.isConfirmed) navigate(-1); 
            });
          }
        } catch (error) {
          const errorMsg = error.response?.data?.debug_info || "Submission failed. Please try again.";
          Swal.fire('Error', errorMsg, 'error');
        } finally {
          setIsSaving(false);
        }
      }
    });
  };

  const getQuestionRangeForSection = (sectionId) => {
    if (sectionId === 1) return { start: 1, end: 14 };
    if (sectionId === 2) return { start: 15, end: 27 };
    return { start: 28, end: 40 };
  };

  const currentRange = getQuestionRangeForSection(activeSection);
  const activeQuestionsArray = Array.from(
    { length: currentRange.end - currentRange.start + 1 },
    (_, i) => currentRange.start + i
  );

  const handleQuestionClick = (qNum) => {
    setActiveQuestion(qNum);
    setTimeout(() => {
      const element = document.getElementById(`question-wrapper-${qNum}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);
  };

  return (
    <main className="h-screen w-screen flex flex-col bg-stone-50 text-[16px] text-black overflow-hidden select-none">
      
      {/* 1. STICKY TOP HEADER */}
      <header className="flex-shrink-0 bg-white px-5 pt-3 pb-4 text-stone-700 shadow-[0_2px_5px_rgba(0,0,0,0.08)] z-20">
        <div className="mx-auto flex w-full items-center justify-between gap-6 max-[820px]:flex-wrap max-[820px]:gap-y-2">
          <div className="flex items-center gap-6 max-[820px]:w-full max-[820px]:justify-between">
            <div className="flex items-center font-black">
              <img className="w-20 object-contain md:w-[136px]" src="/ielts.svg" alt="Logo" />
            </div>
            <div className="grid gap-0.5 content-center justify-items-start text-[13px] text-stone-700">
              <span className="font-semibold">Test Taker ID: 123456</span>
              <span className="text-stone-500 font-medium">IELTS Reading General Training</span>
            </div>
          </div>

          <div className={cx(
            "whitespace-nowrap text-[22px] font-bold text-stone-800 max-[820px]:order-3 max-[820px]:w-full max-[820px]:text-center max-[820px]:text-[18px]",
            secondsLeft <= 300 && "text-rose-600 animate-pulse"
          )}>
            Time Remaining: {minutes}:{seconds}
          </div>
          
          <div className="flex items-center justify-end gap-[20px] max-[820px]:hidden cursor-pointer text-[#666666]">
            <Wifi size={20} />
            <FaBell size={18} />
            <Menu size={20} />
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE AREA */}
      <section className="flex-1 flex overflow-hidden w-full bg-white relative">
        <div className="w-full h-full flex overflow-hidden">
          {activeSection === 1 && <SectionOne answers={answers} setAnswers={setAnswers} submitted={submitted} activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion} />}
          {activeSection === 2 && <SectionTwo answers={answers} setAnswers={setAnswers} submitted={submitted} activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion} />}
          {activeSection === 3 && <SectionThree answers={answers} setAnswers={setAnswers} submitted={submitted} activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion} />}
        </div>
      </section>

      {/* 3. INSPERA REAL DOUBLE-LAYER BOTTOM FOOTER BAR */}
      <footer className="flex-shrink-0 min-h-[95px] w-full border-t border-stone-300 bg-[#f4f4f4] flex flex-col justify-center px-6 py-2 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] gap-2">
        
        <div className="flex items-center justify-between w-full">
          {/* LAYER 1: Part 1, Part 2, Part 3 Buttons */}
          <div className="flex items-center gap-1 bg-stone-200 p-0.5 rounded-md border border-stone-300">
            {[1, 2, 3].map((id) => (
              <button
                key={id}
                onClick={() => {
                  setActiveSection(id);
                  const range = getQuestionRangeForSection(id);
                  setActiveQuestion(range.start);
                }}
                className={cx(
                  "px-4 py-1 text-[13px] font-bold transition-all rounded",
                  id === activeSection 
                    ? "bg-white text-stone-900 shadow-sm" 
                    : "text-stone-600 hover:text-stone-900"
                )}
              >
                Part {id}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <div className="shrink-0">
            <button 
              onClick={handleFinalSubmit}
              disabled={isSaving}
              className="px-6 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[13px] shadow transition-all disabled:opacity-50"
            >
              {isSaving ? "Submitting..." : "Submit Test"}
            </button>
          </div>
        </div>

        {/* LAYER 2: Question Navigation Dots */}
        <div className="w-full flex items-center justify-start gap-1.5 overflow-x-auto py-1">
          {activeQuestionsArray.map((qNum) => {
            const hasAnswer = !!answers[`q${qNum}`];
            const isCurrent = activeQuestion === qNum;

            return (
              <button
                key={qNum}
                onClick={() => handleQuestionClick(qNum)}
                className={cx(
                  "w-8 h-8 rounded-md flex items-center justify-center font-bold text-[12px] transition-all border shrink-0",
                  isCurrent 
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-600/20" 
                    : hasAnswer 
                      ? "border-stone-400 bg-stone-300 text-stone-800" 
                      : "border-stone-300 bg-white text-stone-600 hover:bg-stone-100"
                )}
              >
                {qNum}
              </button>
            );
          })}
        </div>
      </footer>
    </main>
  );
}