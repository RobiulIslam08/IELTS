import React, { useState, useEffect } from 'react';
import UserLayout from '../user/UserLayout';
import api from '../../api';
import { Eye, Award, FileText, Calendar, Edit3 } from 'lucide-react'; // Writing এর জন্য Edit3 আইকন যোগ করা হয়েছে
import { useNavigate } from 'react-router-dom';

const MockTestResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // ১. লোকাল স্টোরেজ থেকে ইউজার আইডি নেওয়া
                const userData = JSON.parse(localStorage.getItem('user'));
                const userId = userData?.id;

                if (userId) {
                    const res = await api.get(`/userResults?user_id=${userId}`); 
                    setResults(res.data);
                }
            } catch (error) {
                console.error("Error fetching results:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

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

    if (loading) {
        return (
            <UserLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            <div className="w-full">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-slate-800">My Mock Test Results</h1>
                    <p className="text-slate-500 font-medium">Track your performance and band scores</p>
                </div>

                {/* Results Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Exam Name</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Module Type</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Test No</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Score</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Band</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {results.length > 0 ? (
                                    results.map((item, index) => {
                                        // ব্যাকএন্ড অবজেক্ট কেসিং সেফটি (paramodel / Paramodel)
                                        const paramodelData = item.paramodel || item.Paramodel;

                                        return (
                                            <React.Fragment key={index}>
                                                {/* প্রধান ডেটা রো (Listening/Reading/Writing সব মডিউলের সাধারণ রো) */}
                                                <tr className="hover:bg-slate-50/80 transition-colors group border-b border-slate-100/50">
                                                    {/* Exam Name */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                                <FileText size={18} />
                                                            </div>
                                                            <span className="font-bold text-slate-700">{item.exam?.name || 'IELTS Mock Test'}</span>
                                                        </div>
                                                    </td>

                                                    {/* Module Type */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <span className="font-bold text-slate-700 capitalize">{item.module_type}</span>
                                                            {item.module_type === 'reading' && item.test_type && (
                                                                <span className="font-bold text-slate-400">({item.test_type})</span>
                                                            )}
                                                        </div>
                                                    </td>

                                                    {/* Test No */}
                                                    <td className="px-6 py-4 font-semibold text-slate-600">Test #{item.test_id}</td>

                                                    {/* Score */}
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold text-sm border border-emerald-100">
                                                            {item.correct_ans} / 40
                                                        </span>
                                                    </td>

                                                    {/* Band Score */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Award size={16} className="text-amber-500" />
                                                            <span className="font-black text-slate-800 text-lg">
                                                                {calculateBandScore(item.correct_ans, item.module_type, item.test_type)}
                                                            </span> 
                                                        </div>
                                                    </td>

                                                    {/* Date */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                                            <Calendar size={14} />
                                                            {new Date(item.created_at).toLocaleDateString()}
                                                        </div>
                                                    </td>

                                                    {/* Action */}
                                                    <td className="px-6 py-4 text-center">
                                                        <button 
                                                            onClick={() => navigate(`/user/mocktest-details/${item.id}`)}
                                                            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm"
                                                        >
                                                            <Eye size={18} />
                                                        </button>
                                                    </td>
                                                </tr>

                                                {/* কন্ডিশনাল রো: শুধুমাত্র Paramodel ডেটা থাকলে (যেমন Writing মডিউল) এই নিচের রো-টি ডিসপ্লে হবে */}
                                                {paramodelData && (
                                                    <tr className="bg-indigo-50/20 group-hover:bg-indigo-50/40 transition-colors">
                                                        <td colSpan="7" className="px-8 py-3.5 border-b border-slate-100">
                                                            <div className="flex flex-col gap-1.5 pl-3 border-l-2 border-indigo-500">
                                                                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                                                                    <Edit3 size={12} />
                                                                    Writing Model / Sub-Data:
                                                                </div>
                                                                <div className="text-sm font-medium text-slate-600">
                                                                    {/* আপনার ডাটাবেজের কলামের নাম অনুযায়ী title, name বা অন্য কিছু এখানে প্রিন্ট করতে পারেন */}
                                                                    <span className="text-slate-800 font-bold mr-2">
                                                                        {paramodelData.title || paramodelData.name || `Model ID: ${paramodelData.id}`}
                                                                    </span>
                                                                    {paramodelData.description && (
                                                                        <span className="text-xs text-slate-400 block mt-0.5">
                                                                            {paramodelData.description}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="text-4xl">📝</div>
                                                <p className="text-slate-400 font-bold italic">No exam results found yet.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default MockTestResults;