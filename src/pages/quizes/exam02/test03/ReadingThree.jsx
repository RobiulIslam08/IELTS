import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // navigate এর জন্য
import Swal from "sweetalert2"; // SweetAlert ইমপোর্ট
import ExamHeader from "../../../../components/test03reading/ExamHeader";
import PartBanner from "../../../../components/test03reading/PartBanner";
import ResizableSplit from "../../../../components/test03reading/ResizableSplit";
import ExamFooter from "../../../../components/test03reading/ExamFooter";
import Part1 from "../../../../components/test03reading/Part1";
import Part1Left from "../../../../components/test03reading/Part1Left";
import Part2 from "../../../../components/test03reading/Part2";
import Part2Left from "../../../../components/test03reading/Part2Left";
import Part3 from "../../../../components/test03reading/Part3";
import Part3Left from "../../../../components/test03reading/Part3Left";
import api from '../../../../api';

const GROUPS = [
    [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12], [13]],
    [[14], [15], [16], [17], [18], [19], [20], [21], [22], [23], [24], [25], [26]],
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

const ReadingThree = () => {
    const navigate = useNavigate();
    const [activePart, setActivePart] = useState(0);
    const [currentQ, setCurrentQ] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    // ৬০ মিনিটের কাউন্টডাউন টাইমার (৬০ * ৬০ সেকেন্ড = ৩৬০০ সেকেন্ড)
    const [timeLeft, setTimeLeft] = useState(60 * 60);
    
    const qRefs = useRef({});
    const rightColRef = useRef(null);

    // ১. লোকালস্টোরেজ থেকে পূর্বে সেভ করা উত্তর লোড করা
    const [answers, setAnswers] = useState(() => {
        const saved = localStorage.getItem("reading_test_3_answers");
        return saved ? JSON.parse(saved) : {};
    });

    // অটো-সাবমিটের সময় লেটেস্ট উত্তর পাওয়ার জন্য Answers Ref ব্যবহার করা হয়েছে
    const answersRef = useRef(answers);
    useEffect(() => {
        answersRef.current = answers;
    }, [answers]);

    // ২. উত্তর পরিবর্তনের সাথে সাথে localStorage-এ অটো-সেভ করা
    useEffect(() => {
        localStorage.setItem("reading_test_3_answers", JSON.stringify(answers));
    }, [answers]);

    // ৩. ৪০ মিনিট পার হওয়ার পর সরাসরি অটো-সাবমিট ফাংশন (DATABASE INSERT)
    const handleAutoSubmit = useCallback(async () => {
        setIsSaving(true);
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            const userId = userData?.id;
            const test_type = userData?.test_type;

            const formattedAnswers = {};
            for (let i = 1; i <= 40; i++) {
                formattedAnswers[`ans${i}`] = answersRef.current[String(i)] || "";
            }

            const payload = {
                user_id: userId,
                module_type: 'reading',
                test_type: test_type,
                exam_id: Number(2),
                test_id: Number(3),
                answers: formattedAnswers,
            };

            const response = await api.post('storeExamResult', payload);

            if (response.status === 200 || response.status === 201) {
                setSubmitted(true);
                localStorage.removeItem("reading_test_3_answers");

                // Remove draft from database
                await api.delete('removeExamDraft', {
                    data: {
                        user_id: userId,
                        module_type: 'reading',
                        exam_id: Number(2),
                        test_id: Number(3),
                    }
                }).catch(() => {
                    // Silent fail
                });

                Swal.fire({
                    title: 'Time is Over!',
                    text: 'Your 60 minutes are up. Answers have been automatically submitted.',
                    icon: 'warning',
                    confirmButtonColor: '#059669',
                    allowOutsideClick: false
                }).then((res) => {
                    if (res.isConfirmed) navigate(-1);
                });
            }
        } catch (error) {
            console.error("Auto submission failed", error);
            Swal.fire('Time Up!', 'Time is up, but submission failed. Please contact support.', 'error');
        } finally {
            setIsSaving(false);
        }
    }, [navigate]);

    // ৪. কাউন্টডাউন টাইমার ইফেক্ট (প্রতি সেকেন্ড কমবে, শেষ হলে অটো-সাবমিট)
    useEffect(() => {
        if (submitted) return;

        if (timeLeft <= 0) {
            handleAutoSubmit();
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft((prev) => Math.max(0, prev - 1));
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, submitted, handleAutoSubmit]);

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

    const ActiveLeft = PARTS[activePart].Left;
    const ActiveRight = PARTS[activePart].Right;

    // ৫. ম্যানুয়াল সাবমিশন (ব্যবহারকারী নিজে যখন সাবমিট বাটনে চাপ দেবেন) - DATABASE INSERT
    const handleFinalSubmit = async () => {
        if (isSaving || submitted) return;

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to submit your Reading test answers?",
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

                    const formattedAnswers = {};
                    for (let i = 1; i <= 40; i++) {
                        formattedAnswers[`ans${i}`] = answers[String(i)] || "";
                    }

                    const payload = {
                        user_id: userId,
                        module_type: 'reading',
                        test_type: test_type,
                        exam_id: Number(2),
                        test_id: Number(3),
                        answers: formattedAnswers,
                    };

                    const response = await api.post('storeExamResult', payload);
                    
                    if (response.status === 200 || response.status === 201) {
                        setSubmitted(true);
                        localStorage.removeItem("reading_test_3_answers");
                        
                        // Remove draft from database
                        await api.delete('removeExamDraft', {
                            data: {
                                user_id: userId,
                                module_type: 'reading',
                                exam_id: Number(2),
                                test_id: Number(3),
                            }
                        }).catch(() => {
                            // Silent fail
                        });
                        
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

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-white text-[#111]">
            {/* ExamHeader এ timeLeft প্রপ হিসেবে পাঠানো হয়েছে যাতে সেখানে টাইমার শো করা যায় */}
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
            />
        </div>
    );
};

export default ReadingThree;