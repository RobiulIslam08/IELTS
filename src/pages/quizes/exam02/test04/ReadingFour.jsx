import { useEffect, useMemo, useState } from 'react';
import { Menu, Wifi } from 'lucide-react';
import { FaBell } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../../../api';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

const sections = [
  { id: 1, title: 'Section 1' },
  { id: 2, title: 'Section 2' },
  { id: 3, title: 'Section 3' },
];

const passage1 = [
  'Reading Passage 1: The impact of climate change on butterflies in Britain',
  'Populations of many butterfly species have declined in Britain, and researchers are examining how warming temperatures and phenology shifts affect abundance and distribution.',
  'Species with flexible lifecycles may benefit from earlier emergence, while some single-generation species face greater risks.',
];

const passage2 = [
  'Reading Passage 2: Deep-sea mining',
  'The debate contrasts medical and biodiversity potential in deep-sea habitats with demand for minerals used in modern technology.',
  'Scientists and legal experts call for caution due to uncertain environmental and social impacts.',
];

const passage3 = [
  'Reading Passage 3: The Unselfish Gene',
  'The passage questions the idea that humans are naturally selfish and presents evidence from hunter-gatherer societies about sharing and egalitarian social organization.',
  'It suggests some forms of modern hierarchy and selfishness developed later with farming and settlement.',
];

const readingAnswerKey = {
  1: 'FALSE',
  2: 'TRUE',
  3: 'FALSE',
  4: 'NOTGIVEN',
  5: 'FALSE',
  6: 'TRUE',
  7: 'COLONIES',
  8: 'SPRING',
  9: 'ENDANGERED',
  10: 'HABITATS',
  11: 'EUROPE',
  12: 'SOUTHERN',
  13: 'DIET',
  14: 'C',
  15: 'F',
  16: 'E',
  17: 'D',
  18: 'D',
  19: 'B',
  20: 'A',
  21: 'E',
  22: 'B',
  23: 'C',
  24: 'WASTE',
  25: 'MACHINERY',
  26: 'CAUTION',
  27: 'C',
  28: 'C',
  29: 'B',
  30: 'A',
  31: 'EGALITARIANISM',
  32: 'STATUS',
  33: 'HUNTING',
  34: 'DOMINEERING',
  35: 'AUTONOMY',
  36: 'NOTGIVEN',
  37: 'NO',
  38: 'YES',
  39: 'NOTGIVEN',
  40: 'NO',
};

const normalizeKey = (value) =>
  String(value || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '');

const getQuestionRangeForSection = (sectionId) => {
  if (sectionId === 1) return { start: 1, end: 13 };
  if (sectionId === 2) return { start: 14, end: 26 };
  return { start: 27, end: 40 };
};

export default function ReadingFour() {
  const { examId, testNumber } = useParams();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60 * 60);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  const setAnswer = (q, value) => {
    setAnswers((prev) => ({ ...prev, [`q${q}`]: value }));
  };

  const estimatedScore = useMemo(() => {
    let total = 0;
    for (let q = 1; q <= 40; q += 1) {
      const typed = normalizeKey(answers[`q${q}`]);
      const key = readingAnswerKey[q];
      if (typed && typed === key) total += 1;
      if (typed === 'NG' && key === 'NOTGIVEN') total += 1;
    }
    return total;
  }, [answers]);

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
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  const handleFinalSubmit = async () => {
    if (isSaving || submitted) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to submit your Reading test?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#059669',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsSaving(true);
        try {
          const userData = JSON.parse(localStorage.getItem('user') || '{}');
          const userId = userData?.id;
          const formattedAnswers = {};
          for (let i = 1; i <= 40; i += 1) {
            formattedAnswers[`ans${i}`] = answers[`q${i}`] || '';
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
              text: `Reading submitted. Estimated score: ${estimatedScore}/40`,
              icon: 'success',
              confirmButtonColor: '#059669',
            }).then((res) => {
              if (res.isConfirmed) navigate(-1);
            });
          }
        } catch (error) {
          const errorMsg = error.response?.data?.debug_info || 'Submission failed. Please try again.';
          Swal.fire('Error', errorMsg, 'error');
        } finally {
          setIsSaving(false);
        }
      }
    });
  };

  const activePassage = activeSection === 1 ? passage1 : activeSection === 2 ? passage2 : passage3;

  return (
    <main className="h-screen w-screen flex flex-col bg-stone-50 text-[16px] text-black overflow-hidden select-none">
      <header className="flex-shrink-0 bg-white px-5 pt-3 pb-4 text-stone-700 shadow-[0_2px_5px_rgba(0,0,0,0.08)] z-20">
        <div className="mx-auto flex w-full items-center justify-between gap-6 max-[820px]:flex-wrap max-[820px]:gap-y-2">
          <div className="flex items-center gap-6 max-[820px]:w-full max-[820px]:justify-between">
            <div className="flex items-center font-black">
              <img className="w-20 object-contain md:w-[136px]" src="/ielts.svg" alt="Logo" />
            </div>
            <div className="grid gap-0.5 content-center justify-items-start text-[13px] text-stone-700">
              <span className="font-semibold">Test Taker ID: 123456</span>
              <span className="text-stone-500 font-medium">IELTS Reading Academic</span>
            </div>
          </div>

          <div
            className={cx(
              'whitespace-nowrap text-[22px] font-bold text-stone-800 max-[820px]:order-3 max-[820px]:w-full max-[820px]:text-center max-[820px]:text-[18px]',
              secondsLeft <= 300 && 'text-rose-600 animate-pulse'
            )}
          >
            Time Remaining: {minutes}:{seconds}
          </div>

          <div className="flex items-center justify-end gap-[20px] max-[820px]:hidden cursor-pointer text-[#666666]">
            <Wifi size={20} />
            <FaBell size={18} />
            <Menu size={20} />
          </div>
        </div>
      </header>

      <section className="flex-1 flex overflow-hidden w-full bg-white relative">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-stone-200 overflow-y-auto">
          <div className="p-5 space-y-3 bg-stone-50">
            {activePassage.map((line) => (
              <p key={line} className="text-sm leading-7 text-stone-700">
                {line}
              </p>
            ))}
            <p className="text-xs font-semibold text-stone-500">Estimated score: {estimatedScore}/40</p>
          </div>

          <div className="p-5 space-y-3">
            {activeQuestionsArray.map((qNum) => (
              <div key={qNum} id={`question-wrapper-${qNum}`} className="space-y-1">
                <label className="text-sm font-semibold text-stone-700">Question {qNum}</label>
                <input
                  value={answers[`q${qNum}`] || ''}
                  onChange={(e) => setAnswer(qNum, e.target.value)}
                  className={cx(
                    'w-full rounded border px-3 py-2 text-sm',
                    activeQuestion === qNum ? 'border-emerald-500' : 'border-stone-300'
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="flex-shrink-0 min-h-[95px] w-full border-t border-stone-300 bg-[#f4f4f4] flex flex-col justify-center px-6 py-2 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] gap-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1 bg-stone-200 p-0.5 rounded-md border border-stone-300">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  const range = getQuestionRangeForSection(sec.id);
                  setActiveQuestion(range.start);
                }}
                className={cx(
                  'px-4 py-1 text-[13px] font-bold transition-all rounded',
                  sec.id === activeSection ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                )}
              >
                {sec.title === 'Section 1' ? 'Part 1' : sec.title === 'Section 2' ? 'Part 2' : 'Part 3'}
              </button>
            ))}
          </div>

          <div className="shrink-0">
            <button
              onClick={handleFinalSubmit}
              disabled={isSaving || submitted}
              className="h-[34px] px-6 rounded bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-[13px] shadow-sm transition-all flex items-center justify-center min-w-[110px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : submitted ? 'Submitted' : 'Submit Test'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full no-scrollbar">
          {activeQuestionsArray.map((qNum) => {
            const hasAnswer = !!answers[`q${qNum}`];
            const isSelectedQuestion = activeQuestion === qNum;
            return (
              <button
                key={qNum}
                onClick={() => handleQuestionClick(qNum)}
                title={`Go to Question ${qNum}`}
                className={cx(
                  'w-[34px] h-[34px] rounded text-[13px] font-semibold flex flex-col items-center justify-center relative transition-all border shrink-0',
                  isSelectedQuestion
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-600/30 font-bold scale-105 z-10'
                    : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50'
                )}
              >
                <span>{qNum}</span>
                {hasAnswer && (
                  <span
                    className={cx(
                      'absolute bottom-[3px] w-1 h-1 rounded-full',
                      isSelectedQuestion ? 'bg-emerald-600' : 'bg-emerald-500'
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>
      </footer>
    </main>
  );
}
