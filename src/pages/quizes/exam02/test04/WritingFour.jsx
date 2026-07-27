import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../../../api';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

function getWordCount(text) {
  if (!text || text.trim() === '') return 0;
  return text.trim().split(/\s+/).length;
}

export default function WritingFour() {
  const { examId, testNumber } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(1);
  const [answers, setAnswers] = useState({
    paragraph1: '',
    paragraph2: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60 * 60);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isSaving || submitted) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to submit your Writing test answers?',
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
          const payload = {
            user_id: userId,
            module_type: 'writing',
            test_type: 'Academic',
            exam_id: Number(examId),
            test_id: Number(testNumber),
            answers: {
              ans1: answers.paragraph1 || '',
              ans2: answers.paragraph2 || '',
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
            }).then((done) => {
              if (done.isConfirmed) navigate(-1);
            });
          }
        } catch (error) {
          const errorMsg =
            error.response?.data?.debug_info || 'Submission failed. Please try again.';
          Swal.fire('Error', errorMsg, 'error');
        } finally {
          setIsSaving(false);
        }
      }
    });
  };

  return (
    <main className="h-screen w-screen flex flex-col bg-stone-50 text-[16px] text-black overflow-hidden">
      <header className="flex-shrink-0 bg-white px-5 pt-3 pb-4 shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex w-full items-center justify-between gap-6 max-[820px]:flex-wrap">
          <div className="flex items-center gap-6 max-[820px]:w-full max-[820px]:justify-between">
            <img className="w-20 object-contain md:w-[136px]" src="/ielts.svg" alt="Logo" />
            <div className="grid gap-0.5 text-[13px] text-stone-700">
              <span className="font-semibold">Test Taker ID: 123456</span>
              <span className="text-stone-500 font-medium">
                {activeSection === 1 ? 'IELTS Writing Task 1' : 'IELTS Writing Task 2'}
              </span>
            </div>
          </div>

          <div
            className={cx(
              'whitespace-nowrap text-[22px] font-bold text-stone-800 max-[820px]:order-3 max-[820px]:w-full max-[820px]:text-center',
              secondsLeft <= 300 && 'text-rose-600'
            )}
          >
            Time Remaining: {minutes}:{seconds}
          </div>
        </div>
      </header>

      <section className="flex-1 flex overflow-hidden w-full bg-white">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-stone-200 overflow-y-auto">
          <div className="p-6 md:p-8 bg-stone-50 overflow-y-auto space-y-6">
            {activeSection === 1 ? (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-stone-800">WRITING TASK 1</h2>
                <p className="font-semibold text-stone-900">You should spend about 20 minutes on this task.</p>
                <p className="italic bg-white p-4 rounded border border-stone-200">
                  The charts below give information on the location and types of dance classes
                  young people in a town in Australia are currently attending.
                  <br />
                  <br />
                  Summarise the information by selecting and reporting the main features, and
                  make comparisons where relevant.
                </p>
                <p className="font-semibold text-stone-700">Write at least 150 words.</p>

                <div className="rounded border border-stone-200 bg-white p-4">
                  <h3 className="font-bold">Location of dance classes</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
                    <li>Private studios: 48%</li>
                    <li>School halls (after-school): 24%</li>
                    <li>Community halls &amp; other: 18%</li>
                    <li>College-based studios: 10%</li>
                  </ul>
                </div>

                <div className="rounded border border-stone-200 bg-white p-4">
                  <h3 className="font-bold">Types of dance classes (by age group)</h3>
                  <div className="mt-2 text-sm space-y-2">
                    <p><b>Ballet:</b> Under 11 = 600, Age 11–16 = 300</p>
                    <p><b>Tap:</b> Under 11 = 450, Age 11–16 = 420</p>
                    <p><b>Modern:</b> Under 11 = 300, Age 11–16 = 520</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-stone-800">WRITING TASK 2</h2>
                <p className="font-semibold text-stone-900">You should spend about 40 minutes on this task.</p>
                <p className="font-bold">Write about the following topic:</p>
                <p className="italic bg-white p-4 rounded border border-stone-200">
                  In many countries nowadays, consumers can go to a supermarket and buy food
                  produced all over the world.
                  <br />
                  <br />
                  Do you think this is a positive or negative development?
                </p>
                <p className="text-sm">
                  Give reasons for your answer and include any relevant examples from your own
                  knowledge or experience.
                </p>
                <p className="font-semibold text-stone-700">Write at least 250 words.</p>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 bg-white overflow-y-auto space-y-6">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <h2 className="text-xl font-bold text-stone-800">
                {activeSection === 1 ? 'Task 1 Response' : 'Task 2 Response'}
              </h2>
              <span className="text-sm font-bold text-stone-700">
                Total words: {getWordCount(answers.paragraph1) + getWordCount(answers.paragraph2)}
              </span>
            </div>

            {activeSection === 1 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-stone-500">
                  Minimum 150 words | Current: {getWordCount(answers.paragraph1)}
                </div>
                <textarea
                  name="paragraph1"
                  value={answers.paragraph1}
                  onChange={handleInputChange}
                  disabled={submitted}
                  placeholder="Write your Task 1 answer here..."
                  className="w-full h-[420px] p-4 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-emerald-600 resize-none"
                />
              </div>
            )}

            {activeSection === 2 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-stone-500">
                  Minimum 250 words | Current: {getWordCount(answers.paragraph2)}
                </div>
                <textarea
                  name="paragraph2"
                  value={answers.paragraph2}
                  onChange={handleInputChange}
                  disabled={submitted}
                  placeholder="Write your Task 2 answer here..."
                  className="w-full h-[420px] p-4 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-emerald-600 resize-none"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="flex-shrink-0 border-t border-stone-300 bg-[#f4f4f4] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {[1, 2].map((id) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={cx(
                'px-4 py-1.5 rounded text-sm font-bold',
                id === activeSection ? 'bg-white text-stone-900' : 'bg-stone-200 text-stone-600'
              )}
            >
              Part {id}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving || submitted}
          className="rounded bg-emerald-600 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? 'Saving...' : submitted ? 'Submitted' : 'Submit Writing Test'}
        </button>
      </footer>
    </main>
  );
}
