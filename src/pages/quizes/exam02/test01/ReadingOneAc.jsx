import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../../../api";

import ExamHeader from "../../../../components/reading01/ExamHeader";
import PartBanner from "../../../../components/reading01/PartBanner";
import ResizableSplit from "../../../../components/reading01/ResizableSplit";
import ExamFooter from "../../../../components/reading01/ExamFooter";
import Part1 from "../../../../components/reading01/Part1";
import Part1Left from "../../../../components/reading01/Part1Left";
import Part2 from "../../../../components/reading01/Part2";
import Part2Left from "../../../../components/reading01/Part2Left";
import Part3 from "../../../../components/reading01/Part3";
import Part3Left from "../../../../components/reading01/Part3Left";

const EXAM_DURATION_MINUTES = 60;
const STORAGE_KEY = "reading_one_academic_answers";

const GROUPS = [
  [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12], [13]],
  [[14], [15], [16], [17], [18], [19], [20, 21], [22, 23], [24], [25], [26]],
  [[27], [28], [29], [30], [31], [32], [33], [34], [35], [36], [37], [38], [39], [40]],
];

const PARTS = [
  {
    title: "Part 1",
    intro: "Read the text and answer questions 1-13.",
    start: 1,
    end: 13,
    Left: Part1Left,
    Right: Part1,
  },
  {
    title: "Part 2",
    intro: "Read the text and answer questions 14-26.",
    start: 14,
    end: 26,
    Left: Part2Left,
    Right: Part2,
  },
  {
    title: "Part 3",
    intro: "Read the text and answer questions 27-40.",
    start: 27,
    end: 40,
    Left: Part3Left,
    Right: Part3,
  },
];

function formatAnswersForApi(answers) {
  const formatted = {};
  for (let i = 1; i <= 40; i++) {
    formatted[`ans${i}`] = "";
  }

  Object.entries(answers).forEach(([key, value]) => {
    if (value == null || value === "") return;

    if (key.includes("-") && Array.isArray(value)) {
      const nums = key.split("-").map(Number);
      nums.forEach((n, idx) => {
        formatted[`ans${n}`] = value[idx] || "";
      });
      return;
    }

    formatted[`ans${key}`] = Array.isArray(value) ? value.join("; ") : String(value);
  });

  return formatted;
}

export default function ReadingOneAc() {
  const { examId, testNumber } = useParams();
  const navigate = useNavigate();

  const [activePart, setActivePart] = useState(0);
  const [currentQ, setCurrentQ] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_MINUTES * 60);

  const qRefs = useRef({});
  const rightColRef = useRef(null);
  const isSavingRef = useRef(false);

  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const answersRef = useRef(answers);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    isSavingRef.current = isSaving;
  }, [isSaving]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

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

  const handleAutoSubmit = useCallback(async () => {
    if (isSavingRef.current) return;

    setIsSaving(true);

    Swal.fire({
      title: "Time Out!",
      text: "Saving your exam answers automatically...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const userId = userData?.id;
      const test_type = userData?.test_type;

      const payload = {
        user_id: userId,
        module_type: "reading",
        test_type: test_type,
        exam_id: Number(examId),
        test_id: Number(testNumber),
        answers: formatAnswersForApi(answersRef.current),
      };

      const response = await api.post("storeExamResult", payload);

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        localStorage.removeItem(STORAGE_KEY);
        await api
          .delete("removeExamDraft", {
            data: {
              user_id: userId,
              module_type: "reading",
              exam_id: Number(examId),
              test_id: Number(testNumber),
            },
          })
          .catch(() => {});
        Swal.close();
        Swal.fire({
          title: "Time is Over!",
          text: "Your 60 minutes are up. Answers have been automatically submitted.",
          icon: "warning",
          confirmButtonColor: "#059669",
          allowOutsideClick: false,
        }).then((res) => {
          if (res.isConfirmed) navigate(-1);
        });
      }
    } catch (error) {
      Swal.close();
      console.error("Auto submission failed:", error);
      Swal.fire("Time Up!", "Time is up, but submission failed. Please contact support.", "error");
    } finally {
      setIsSaving(false);
    }
  }, [examId, testNumber, navigate]);

  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      if (!isSavingRef.current) {
        handleAutoSubmit();
      }
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, submitted, handleAutoSubmit]);

  const handleFinalSubmit = async () => {
    if (isSaving || submitted) return;

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit your Reading test answers?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      setIsSaving(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const userId = userData?.id;
        const test_type = userData?.test_type;

        const payload = {
          user_id: userId,
          module_type: "reading",
          test_type: test_type,
          exam_id: Number(examId),
          test_id: Number(testNumber),
          answers: formatAnswersForApi(answers),
        };

        const response = await api.post("storeExamResult", payload);

        if (response.status === 200 || response.status === 201) {
          setSubmitted(true);
          localStorage.removeItem(STORAGE_KEY);
          await api
            .delete("removeExamDraft", {
              data: {
                user_id: userId,
                module_type: "reading",
                exam_id: Number(examId),
                test_id: Number(testNumber),
              },
            })
            .catch(() => {});
          Swal.fire({
            title: "Success!",
            text: "Reading Exam Successfully Submitted",
            icon: "success",
            confirmButtonColor: "#059669",
          }).then((res) => {
            if (res.isConfirmed) navigate(-1);
          });
        }
      } catch (error) {
        const errorMsg = error.response?.data?.debug_info || "Submission failed. Please try again.";
        Swal.fire("Error", errorMsg, "error");
      } finally {
        setIsSaving(false);
      }
    });
  };

  const ActiveLeft = PARTS[activePart].Left;
  const ActiveRight = PARTS[activePart].Right;

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white text-[#111]">
      <ExamHeader timeLeft={timeLeft} />
      <main className="flex-1 min-h-0 flex flex-col">
        <PartBanner title={PARTS[activePart].title} intro={PARTS[activePart].intro} />
        <ResizableSplit
          className="pb-12"
          rightColRef={rightColRef}
          left={<ActiveLeft answers={answers} setAnswer={setAnswer} />}
          right={
            <ActiveRight
              answers={answers}
              setAnswer={setAnswer}
              currentQ={currentQ}
              setCurrentQ={setCurrentQuestion}
              registerQRef={(num, el) => {
                qRefs.current[num] = el;
              }}
              qRefs={qRefs}
            />
          }
        />
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
        onSubmit={handleFinalSubmit}
        isSaving={isSaving}
        submitted={submitted}
      />
    </div>
  );
}
