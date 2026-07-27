// @ts-nocheck
import { useRef, useState, useEffect, useCallback } from "react";
import ExamHeader from "../../../../components/testing03writting/ExamHeader";
import PartBanner from "../../../../components/testing03writting/PartBanner";
import ResizableSplit from "../../../../components/testing03writting/ResizableSplit";
import ExamFooter from "../../../../components/testing03writting/ExamFooter";
import Part1Left from "../../../../components/testing03writting/Part1Left";
import Part1Right from "../../../../components/testing03writting/Part1Right";
import Part2Left from "../../../../components/testing03writting/Part2Left";
import Part2Right from "../../../../components/testing03writting/Part2Right";

import api from '../../../../api';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// এখান থেকে পরীক্ষার সময় মিনিট হিসেবে সহজেই পরিবর্তন করতে পারবেন (Writing এর জন্য টোটাল ৬০ মিনিট)
const EXAM_DURATION_MINUTES = 60;

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

const WritingThree = () => {
    const [activePart, setActivePart] = useState(0);
    const [part1Text, setPart1Text] = useState("");
    const [part2Text, setPart2Text] = useState("");
    const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_MINUTES * 60);
    const rightColRef = useRef(null);

    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);

    // টাইমারের ভেতর লেটেস্ট টেক্সট ডাটা পাওয়ার জন্য useRef ব্যবহার
    const textRef = useRef({ part1Text, part2Text });
    const isSavingRef = useRef(isSaving);

    useEffect(() => {
        textRef.current = { part1Text, part2Text };
    }, [part1Text, part2Text]);

    useEffect(() => {
        isSavingRef.current = isSaving;
    }, [isSaving]);

    const switchPart = (idx) => {
        setActivePart(idx);
    };

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

    // অটো সাবমিট হ্যান্ডলার লজিক
    const handleAutoSubmit = useCallback(async () => {
        if (isSavingRef.current) return;

        setIsSaving(true);

        Swal.fire({
            title: 'Time Out!',
            text: 'Your writing exam time is over. Saving answers...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            const userId = userData?.id;
            
            // useRef থেকে টাইমার শেষের সর্বশেষ টেক্সট নেওয়া হচ্ছে
            const { part1Text: latestPart1, part2Text: latestPart2 } = textRef.current;

            const payload = {
                user_id: userId,
                exam_id: Number(2),
                test_id: Number(3),
                module_type: 'writing', // মডিউল টাইপ রাইটিং সেট করা হয়েছে
                answers: {
                    ans1: latestPart1 || "",
                    ans2: latestPart2 || ""
                },
            };

            const response = await api.post('storeExamPara', payload);

            if (response.status === 200 || response.status === 201) {
                Swal.close();
                navigate(-1);
            }
        } catch (error) {
            Swal.close();
            console.error("Auto submission failed:", error);
            navigate(-1); // কোনো ব্যাকএন্ড এরর আসলেও ইউজার সেফলি ড্যাশবোর্ডে ব্যাক করবে
        } finally {
            setIsSaving(false);
        }
    }, [navigate]);

    // কাউন্টডাউন ইফেক্ট
    useEffect(() => {
        if (timeLeft <= 0) {
            handleAutoSubmit();
            return;
        }

        const t = setTimeout(() => {
            setTimeLeft((prev) => Math.max(0, prev - 1));
        }, 1000);

        return () => clearTimeout(t);
    }, [timeLeft, handleAutoSubmit]);

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
                        <ActiveRight
                            text={activeText}
                            setText={setActiveText}
                        />
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
            />
        </div>
    );
};

export default WritingThree;