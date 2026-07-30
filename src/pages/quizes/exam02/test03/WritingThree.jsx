// @ts-nocheck
import { useRef, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../../../api";

import ExamHeader from "../../../../components/testing03writting/ExamHeader";
import PartBanner from "../../../../components/testing03writting/PartBanner";
import ResizableSplit from "../../../../components/testing03writting/ResizableSplit";
import ExamFooter from "../../../../components/testing03writting/ExamFooter";
import Part1Left from "../../../../components/testing03writting/Part1Left";
import Part1Right from "../../../../components/testing03writting/Part1Right";
import Part2Left from "../../../../components/testing03writting/Part2Left";
import Part2Right from "../../../../components/testing03writting/Part2Right";

const EXAM_DURATION_MINUTES = 60;
const STORAGE_KEY = "writing_three_academic_answers";

const PARTS = [
  {
    title: "Part 1",
    intro: "You should spend about 20 minutes on this task. Write at least 150 words.",
    Left: Part1Left,
    Right: Part1Right,
  },
  {
    title: "Part 2",
    intro: "You should spend about 40 minutes on this task. Write at least 250 words.",
    Left: Part2Left,
    Right: Part2Right,
  },
];

export default function WritingThree() {
  const { examId, testNumber } = useParams();
  const navigate = useNavigate();

  const [activePart, setActivePart] = useState(0);
  const [part1Text, setPart1Text] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).paragraph1 || "" : "";
    } catch {
      return "";
    }
  });
  const [part2Text, setPart2Text] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).paragraph2 || "" : "";
    } catch {
      return "";
    }
  });
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_MINUTES * 60);
  const [isSaving, setIsSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const rightColRef = useRef(null);
  const textRef = useRef({ part1Text, part2Text });
  const isSavingRef = useRef(false);

  useEffect(() => {
    textRef.current = { part1Text, part2Text };
  }, [part1Text, part2Text]);

  useEffect(() => {
    isSavingRef.current = isSaving;
  }, [isSaving]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ paragraph1: part1Text, paragraph2: part2Text })
    );
  }, [part1Text, part2Text]);

  const switchPart = (idx) => setActivePart(idx);

  const goPrev = () => {
    if (activePart > 0) setActivePart(activePart - 1);
  };

  const goNext = () => {
    if (activePart < PARTS.length - 1) setActivePart(activePart + 1);
  };

  const answeredStatus = (partIdx) => {
    if (partIdx === 0) return part1Text.trim().length > 0 ? 1 : 0;
    if (partIdx === 1) return part2Text.trim().length > 0 ? 1 : 0;
    return 0;
  };

  const submitAnswers = useCallback(
    async ({ auto = false } = {}) => {
      if (isSavingRef.current || submitted) return;

      setIsSaving(true);

      if (auto) {
        Swal.fire({
          title: "Time Out!",
          text: "Your writing exam time is over. Saving answers...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });
      }

      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const userId = userData?.id;
        const test_type = userData?.test_type;
        const { part1Text: latestPart1, part2Text: latestPart2 } = textRef.current;

        const payload = {
          user_id: userId,
          module_type: "writing",
          test_type: test_type,
          exam_id: Number(examId),
          test_id: Number(testNumber),
          answers: {
            ans1: latestPart1 || "",
            ans2: latestPart2 || "",
          },
        };

        const response = await api.post("storeExamPara", payload);

        if (response.status === 200 || response.status === 201) {
          setSubmitted(true);
          localStorage.removeItem(STORAGE_KEY);

          if (auto) {
            Swal.close();
            await Swal.fire({
              title: "Submitted",
              text: "Your 60 minutes are up. Answers have been automatically submitted.",
              icon: "success",
              confirmButtonColor: "#059669",
            });
            navigate(-1);
          } else {
            Swal.fire({
              title: "Success!",
              text: "Writing Exam Successfully Submitted",
              icon: "success",
              confirmButtonColor: "#059669",
            }).then((res) => {
              if (res.isConfirmed) navigate(-1);
            });
          }
        }
      } catch (error) {
        if (auto) Swal.close();
        const errorMsg =
          error.response?.data?.debug_info || "Submission failed. Please try again.";
        Swal.fire("Error", errorMsg, "error");
        if (auto) navigate(-1);
      } finally {
        setIsSaving(false);
      }
    },
    [examId, testNumber, navigate, submitted]
  );

  const handleAutoSubmit = useCallback(() => {
    submitAnswers({ auto: true });
  }, [submitAnswers]);

  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      if (!isSavingRef.current) handleAutoSubmit();
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, submitted, handleAutoSubmit]);

  const handleFinalSubmit = () => {
    if (isSaving || submitted) return;

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit your Writing test answers?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit!",
    }).then((result) => {
      if (result.isConfirmed) submitAnswers({ auto: false });
    });
  };

  const ActiveLeft = PARTS[activePart].Left;
  const ActiveRight = PARTS[activePart].Right;
  const activeText = activePart === 0 ? part1Text : part2Text;
  const setActiveText = activePart === 0 ? setPart1Text : setPart2Text;

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white text-[#111]">
      <ExamHeader timeLeft={timeLeft} />
      <main className="flex-1 min-h-0 flex flex-col">
        <PartBanner title={PARTS[activePart].title} intro={PARTS[activePart].intro} />
        <ResizableSplit
          className="pb-12"
          rightColRef={rightColRef}
          left={<ActiveLeft />}
          right={
            <ActiveRight text={activeText} setText={setActiveText} disabled={submitted} />
          }
        />
      </main>

      <ExamFooter
        parts={PARTS}
        activePart={activePart}
        switchPart={switchPart}
        answeredStatus={answeredStatus}
        goPrev={goPrev}
        goNext={goNext}
        onSubmit={handleFinalSubmit}
        isSaving={isSaving}
        submitted={submitted}
      />
    </div>
  );
}
