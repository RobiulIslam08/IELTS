import { useEffect, useState } from "react";
import { Menu, Wifi } from "lucide-react";
import { FaBell } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../../api';
import Swal from 'sweetalert2';

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function WritingOneGeneral() {
  const { examId, testNumber } = useParams();
  const navigate = useNavigate();

  // ১ অর্থ Part 1 (Task 1), ২ অর্থ Part 2 (Task 2)
  const [activeSection, setActiveSection] = useState(1); 
  const [answers, setAnswers] = useState({
    paragraph1: '',
    paragraph2: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60 * 60); // ১ ঘণ্টার টাইমার

  // টাইমার কাউন্টডাউন
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ডায়নামিক শব্দ গণনা মেথড
  const getWordCount = (text) => {
    if (!text || text.trim() === '') return 0;
    return text.trim().split(/\s+/).length;
  };

  const handleFinalSubmit = async () => {
    if (isSaving || submitted) return;

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to submit your Writing test answers?",
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
          const test_type = userData?.test_type;

          const payload = {
            user_id: userId,
            module_type: 'writing',
            test_type: test_type,
            exam_id: Number(examId),
            test_id: Number(testNumber),
            answers: {
              ans1: answers.paragraph1,
              ans2: answers.paragraph2
            },
          };

          const response = await api.post('storeExamPara', payload);
          
          if (response.status === 200 || response.status === 201) {
            setSubmitted(true);
            Swal.fire({
              title: 'Success!',
              text: 'Writing Exam Successfully Submitted',
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

  return (
    <main className="h-screen w-screen flex flex-col bg-stone-50 text-[16px] text-black overflow-hidden select-none">
      
      {/* ১. STICKY TOP HEADER */}
      <header className="flex-shrink-0 bg-white px-5 pt-3 pb-4 text-stone-700 shadow-[0_2px_5px_rgba(0,0,0,0.08)] z-20">
        <div className="mx-auto flex w-full items-center justify-between gap-6 max-[820px]:flex-wrap max-[820px]:gap-y-2">
          <div className="flex items-center gap-6 max-[820px]:w-full max-[820px]:justify-between">
            <div className="flex items-center font-black">
              <img className="w-20 object-contain md:w-[136px]" src="/ielts.svg" alt="Logo" />
            </div>
            <div className="grid gap-0.5 content-center justify-items-start text-[13px] text-stone-700">
              <span className="font-semibold">Test Taker ID: 123456</span>
              <span className="text-stone-500 font-medium">
                {activeSection === 1 ? "IELTS Writing General Training - Task 1" : "IELTS Writing General Training - Task 2"}
              </span>
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

      {/* ২. MAIN WORKSPACE AREA */}
      <section className="flex-1 flex overflow-hidden w-full bg-white relative">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-stone-200 overflow-y-auto">
          
          {/* বাম পাশ: প্রশ্নের নির্দেশনাবলী এলাকা (আপডেটেড স্ক্রিনশট অনুযায়ী) */}
          <div className="p-6 md:p-8 bg-stone-50 overflow-y-auto space-y-6">
            
            {activeSection === 1 ? (
              // Task 1: Participant Numbers Graph Question Content
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Information Sheet</span>
                  <h2 className="text-xl font-bold text-stone-800">WRITING TASK 1</h2>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm text-stone-700 space-y-4 text-sm leading-relaxed">
                  <p className="font-semibold text-stone-900">You should spend about 20 minutes on this task.</p>
                  <div className="italic bg-stone-50 p-4 rounded-lg border-l-4 border-emerald-500 font-medium text-stone-800 space-y-2">
                    <p>
                      The graph below gives information on the numbers of participants for different activities at one social centre in Melbourne, Australia for the period 2000 to 2020.
                    </p>
                    <p className="font-bold pt-2">
                      Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
                    </p>
                  </div>
                  <div className="pt-2">
                    <ul className="list-disc pl-5 space-y-1 text-stone-600 font-semibold">
                      <li>Write at least 150 words.</li>
                    </ul>
                  </div>
                </div>

                
              </div>
            ) : (
              // Task 2: Competition vs Cooperation Essay Content
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Information Sheet</span>
                  <h2 className="text-xl font-bold text-stone-800">WRITING TASK 2</h2>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm text-stone-700 space-y-4 text-sm leading-relaxed">
                  <p className="font-semibold text-stone-900">You should spend about 40 minutes on this task.</p>
                  <p className="font-bold text-stone-900">Write about the following topic:</p>
                  
                  <div className="italic bg-stone-50 p-5 rounded-lg border-l-4 border-blue-500 space-y-4 text-stone-800 font-medium">
                    <p>
                      Some people think that competition at work, at school and in daily life is a good thing. Others believe that we should try to cooperate more, rather than competing against each other.
                    </p>
                    <p className="font-bold text-stone-900 pt-1">
                      Discuss both these views and give your own opinion.
                    </p>
                  </div>

                  <div className="pt-2 text-stone-600 space-y-2 text-xs">
                    <p>• Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
                    <p className="font-bold text-stone-700">• Write at least 250 words.</p>
                  </div>
                </div>
              </div>
            )}
            
          </div>

          {/* ডান পাশ: উত্তর লেখার সীমানা */}
          <div className="p-6 md:p-8 bg-white overflow-y-auto space-y-6">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Response Sheet</span>
                <h2 className="text-xl font-bold text-stone-800">
                  {activeSection === 1 ? "Part 1: Answer Paragraph" : "Part 2: Answer Paragraph"}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-stone-400 block">Total Words Typed</span>
                <span className="text-sm font-black text-stone-700">
                  {getWordCount(answers.paragraph1) + getWordCount(answers.paragraph2)} words
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Part 1 (Task 1 Response Area) */}
              {activeSection === 1 && (
                <div className="space-y-2 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <label className="text-[13px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                      Task 1 Response Box (Minimum 150 words)
                    </label>
                    <span className="text-[11px] bg-stone-100 px-2 py-0.5 rounded text-stone-500 font-bold">
                      {getWordCount(answers.paragraph1)} words
                    </span>
                  </div>
                  <textarea
                    name="paragraph1"
                    value={answers.paragraph1}
                    onChange={handleInputChange}
                    disabled={submitted}
                    placeholder="Write your answer here. Summarise the participant trends graph. Minimum 150 words."
                    className="w-full h-[380px] p-4 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/5 transition-all duration-200 resize-none"
                  />
                </div>
              )}

              {/* Part 2 (Task 2 Response Area) */}
              {activeSection === 2 && (
                <div className="space-y-2 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <label className="text-[13px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Task 2 Response Box (Minimum 250 words)
                    </label>
                    <span className="text-[11px] bg-stone-100 px-2 py-0.5 rounded text-stone-500 font-bold">
                      {getWordCount(answers.paragraph2)} words
                    </span>
                  </div>
                  <textarea
                    name="paragraph2"
                    value={answers.paragraph2}
                    onChange={handleInputChange}
                    disabled={submitted}
                    placeholder="Write your answer here. Discuss both views regarding competition and cooperation and give your opinion. Minimum 250 words."
                    className="w-full h-[380px] p-4 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm font-medium focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all duration-200 resize-none"
                  />
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ৩. INSPERA DOUBLE-LAYER BOTTOM FOOTER BAR */}
      <footer className="flex-shrink-0 min-h-[85px] w-full border-t border-stone-300 bg-[#f4f4f4] flex flex-col justify-center px-6 py-2 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] gap-2">
        <div className="flex items-center justify-between w-full">
          
          {/* LAYER 1: Part 1 and Part 2 Buttons */}
          <div className="flex items-center gap-1 bg-stone-200 p-0.5 rounded-md border border-stone-300">
            {[1, 2].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSection(id)}
                className={cx(
                  "px-5 py-1 text-[13px] font-bold transition-all rounded",
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
              type="button"
              onClick={handleFinalSubmit}
              disabled={isSaving || submitted}
              className="px-6 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[13px] shadow transition-all disabled:opacity-50"
            >
              {isSaving ? "Submitting..." : "Submit Test"}
            </button>
          </div>
        </div>

        {/* LAYER 2: Live Status Bar Indicators */}
        <div className="w-full flex items-center justify-start gap-1.5 py-1">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-500">
            <span>Status:</span>
            <button 
              type="button"
              onClick={() => setActiveSection(1)}
              className={cx(
                "px-2 py-0.5 rounded border text-[11px] font-bold transition-all",
                getWordCount(answers.paragraph1) > 0 ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-white border-stone-300 text-stone-600",
                activeSection === 1 && "ring-2 ring-emerald-600/30 font-black"
              )}
            >
              Part 1 {getWordCount(answers.paragraph1) > 0 ? "✓" : "Empty"}
            </button>
            <button 
              type="button"
              onClick={() => setActiveSection(2)}
              className={cx(
                "px-2 py-0.5 rounded border text-[11px] font-bold transition-all",
                getWordCount(answers.paragraph2) > 0 ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-white border-stone-300 text-stone-600",
                activeSection === 2 && "ring-2 ring-emerald-600/30 font-black"
              )}
            >
              Part 2 {getWordCount(answers.paragraph2) > 0 ? "✓" : "Empty"}
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}