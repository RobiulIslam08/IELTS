import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserLayout from '../user/UserLayout';
import api from '../../api';
import { CheckCircle2, XCircle, Info, ArrowLeft } from 'lucide-react';

const MockTestDetails = () => {
    const { id } = useParams(); // answerTable এর ID
    const [detail, setDetail] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await api.get(`/getExamDetail/${id}`);
                setDetail(res.data.user_result);
                setCorrectAnswers(res.data.correct_sheet);
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false); // এখানে 'loading(false)' এর বদলে 'setLoading(false)' করে দেওয়া হয়েছে
            }
        };
        fetchDetails();
    }, [id]);

    // আইইএলটিএস অফিশিয়াল ৯ ব্যান্ড স্কোর ক্যালকুলেটর
    const calculateBandScore = (correctCount, moduleType, testType) => {
        const score = Number(correctCount);
        const module = moduleType ? moduleType.toLowerCase().trim() : 'listening';
        const type = testType ? testType.toLowerCase().trim() : 'academic';

        if (module === 'listening') {
            if (score >= 39) return "9.0";
            if (score >= 37) return "8.5";
            if (score >= 35) return "8.0";
            if (score >= 32) return "7.5";
            if (score >= 30) return "7.0";
            if (score >= 27) return "6.5";
            if (score >= 23) return "6.0";
            if (score >= 19) return "5.5";
            if (score >= 15) return "5.0";
            if (score >= 13) return "4.5";
            if (score >= 10) return "4.0";
            if (score >= 8)  return "3.5";
            return "2.5";
        }
        if (module === 'reading' && type === 'academic') {
            if (score >= 39) return "9.0";
            if (score >= 37) return "8.5";
            if (score >= 35) return "8.0";
            if (score >= 33) return "7.5";
            if (score >= 30) return "7.0";
            if (score >= 27) return "6.5";
            if (score >= 23) return "6.0";
            if (score >= 19) return "5.5";
            if (score >= 15) return "5.0";
            if (score >= 13) return "4.5";
            if (score >= 10) return "4.0";
            if (score >= 8)  return "3.5";
            return "2.5";
        }
        if (module === 'reading' && type === 'general') {
            if (score >= 40) return "9.0";
            if (score >= 39) return "8.5";
            if (score >= 37) return "8.0";
            if (score >= 36) return "7.5";
            if (score >= 34) return "7.0";
            if (score >= 32) return "6.5";
            if (score >= 30) return "6.0";
            if (score >= 27) return "5.5";
            if (score >= 23) return "5.0";
            if (score >= 19) return "4.5";
            if (score >= 15) return "4.0";
            if (score >= 12) return "3.5";
            return "2.5";
        }
        return "0.0";
    };

    // সব প্রশ্নের জন্য ১-৪০ সাধারণ ম্যাচিং ফাংশন (কোনো স্পেশাল 'Either Order' ছাড়াই)
    const checkIsCorrect = (userAns, correctAns) => {
        if (!userAns || userAns === '---' || !correctAns || correctAns === 'N/A') return false;
        
        const userAnswersArray = userAns.toLowerCase().split(',').map(ans => ans.trim());
        const cAnsClean = correctAns.toLowerCase().trim();

        if (cAnsClean.includes('/')) {
            const options = cAnsClean.split('/').map(opt => opt.trim());
            return userAnswersArray.some(uAns => options.includes(uAns));
        }

        return userAnswersArray.some(uAns => uAns === cAnsClean);
    };

    if (loading) return <UserLayout><div className="text-center py-20 italic">Loading result details...</div></UserLayout>;
    if (!detail) return <UserLayout><div className="text-center py-20 text-red-500">Result not found!</div></UserLayout>;

    // ফ্রন্টএন্ড লজিক অনুযায়ী ডাইনামিক কাউন্টার ক্যালকুলেশন (১ থেকে ৪০ পর্যন্ত)
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    for (let i = 1; i <= 40; i++) {
        const rawUserAns = detail[`ans${i}`];
        const uAns = rawUserAns && rawUserAns.trim() !== '' ? rawUserAns : '---';
        const cAns = correctAnswers ? correctAnswers[`ca${i}`] : 'N/A';

        if (uAns === '---') {
            skippedCount++;
        } else if (checkIsCorrect(uAns, cAns)) {
            correctCount++;
        } else {
            wrongCount++; 
        }
    }

    return (
        <UserLayout>
            <div className="max-w-5xl mx-auto">
                {/* Header with Back Button */}
                <button onClick={() => window.history.back()} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-6 transition-colors">
                    <ArrowLeft size={20} /> Back to History
                </button>

                {/* Score Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <ScoreCard label="Correct Answers" value={correctCount} variant="emerald" icon={<CheckCircle2 />} />
                    <ScoreCard label="Wrong Answers" value={wrongCount} variant="red" icon={<XCircle />} />
                    <ScoreCard label="Skipped / Empty" value={skippedCount} variant="amber" icon={<XCircle className="rotate-45" />} />
                    <ScoreCard 
                        label="Total Band Score" 
                        value={calculateBandScore(correctCount, detail.module_type, detail.test_type)} 
                        variant="indigo" 
                        icon={<Info />} 
                    />
                </div>

                {/* Detailed Answer Comparison Table */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-black text-slate-800 text-xl italic">Answer Review Sheet</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-slate-100">
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase">No.</th>
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase">Your Answer</th>
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase">Correct Answer</th>
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[...Array(40)].map((_, index) => {
                                    const qNo = index + 1;
                                    const rawUserAns = detail[`ans${qNo}`];
                                    const uAns = rawUserAns && rawUserAns.trim() !== '' ? rawUserAns : '---';
                                    const cAns = correctAnswers ? correctAnswers[`ca${qNo}`] : 'N/A';
                                    
                                    const isCorrect = checkIsCorrect(uAns, cAns);
                                    const isSkipped = uAns === '---';

                                    return (
                                        <tr key={qNo} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-4 font-bold text-slate-400">{qNo}</td>
                                            <td className={`px-8 py-4 font-bold ${isSkipped ? 'text-amber-500 italic' : isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>
                                                {uAns}
                                            </td>
                                            <td className="px-8 py-4 font-bold text-slate-700 italic">
                                                {cAns}
                                            </td>
                                            <td className="px-8 py-4 text-center">
                                                {isSkipped ? (
                                                    <span className="text-amber-500 bg-amber-50 px-2 py-1 text-xs font-bold rounded-md">Skipped</span>
                                                ) : isCorrect ? (
                                                    <span className="text-emerald-500 bg-emerald-50 p-1.5 rounded-full inline-block"><CheckCircle2 size={18} /></span>
                                                ) : (
                                                    <span className="text-red-400 bg-red-50 p-1.5 rounded-full inline-block"><XCircle size={18} /></span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

const ScoreCard = ({ label, value, variant, icon }) => {
    const styles = {
        emerald: { border: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600' },
        red: { border: 'border-red-500', bg: 'bg-red-50', text: 'text-red-600' },
        amber: { border: 'border-amber-500', bg: 'bg-amber-50', text: 'text-amber-600' },
        indigo: { border: 'border-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-600' },
    };

    const currentStyle = styles[variant] || styles.indigo;

    return (
        <div className={`bg-white p-5 rounded-3xl border-b-4 ${currentStyle.border} shadow-sm border border-slate-100`}>
            <div className="flex justify-between items-start mb-2">
                <div className={`p-3 rounded-2xl ${currentStyle.bg} ${currentStyle.text}`}>{icon}</div>
                <span className="text-3xl font-black text-slate-800">{value}</span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        </div>
    );
};

export default MockTestDetails;