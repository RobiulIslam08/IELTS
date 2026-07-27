import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserLayout from '../user/UserLayout';

const SkillSelection = () => {
  const navigate = useNavigate();
  const { id: examId, test: testId } = useParams(); // URL parameters: /user/takeTest/:id/:test

  // LocalStorage থেকে ইউজারের test_type নেওয়া হচ্ছে (ডিফল্ট 'Academic' ব্যাকআপ রাখা হলো)
  const userData = JSON.parse(localStorage.getItem('user'));
  const test_type = userData?.test_type || 'Academic'; 

  /**
   * ম্যানুয়াল লিঙ্ক কনফিগারেশন লিস্ট
   * Reading এবং Writing এর ক্ষেত্রে Academic/General আলাদা অবজেক্টে ডিফাইন করা হয়েছে।
   */
  const linkConfig = {
    // Exam ID: 2
    "2": {
      "1": { // Test ID: 1
        listening: `/user/ListeningOne/${examId}/${testId}`,
        speaking: `/user/speaking-session/${examId}/${testId}`,
        
        // রিডিং ও রাইটিং এর টাইপ ভিত্তিক রুট
        reading: {
          Academic: `/user/reading-one-academic/${examId}/${testId}`,
          General: `/user/reading-one-general/${examId}/${testId}`
        },
        writing: {
          Academic: `/user/writingOne-academic/${examId}/${testId}`,
          General: `/user/writingOne-general/${examId}/${testId}`
        }
      },
      "2": { // Test ID: 2
        listening: `/user/listening-two/${examId}/${testId}`,
        speaking: `/user/speaking-expert/${examId}/${testId}`,
        
        reading: {
          Academic: `/user/reading-two-academic/${examId}/${testId}`,
          General: `/user/reading-two-general/${examId}/${testId}`
        },
        writing: {
          Academic: `/user/writing-two-academic/${examId}/${testId}`,
          General: `/user/writing-two-general/${examId}/${testId}`
        }
      },
      "3": { // Test ID: 3
        listening: `/user/listening-three/${examId}/${testId}`,
        speaking: `/user/speaking-expert/${examId}/${testId}`,
        
        reading: {
          Academic: `/user/reading-three-academic/${examId}/${testId}`,
          General: `/user/reading-three-general/${examId}/${testId}`
        },
        writing: {
          Academic: `/user/writing-three/${examId}/${testId}`,
          General: `/user/writing-three-general/${examId}/${testId}`
        }
      },
      "4": { // Test ID: 4
        listening: `/user/listening-four/${examId}/${testId}`,
        speaking: `/user/speaking-expert/${examId}/${testId}`,
        reading: {
          Academic: `/user/reading-four/${examId}/${testId}`,
          General: `/user/reading-four/${examId}/${testId}`
        },
        writing: {
          Academic: `/user/writing-four/${examId}/${testId}`,
          General: `/user/writing-four/${examId}/${testId}`
        }
      }
    }
  };

  const modules = [
    { id: 'listening', title: 'Listening', icon: '🎧', color: 'from-blue-500 to-cyan-400', desc: 'Practice your listening skills.' },
    { id: 'reading', title: 'Reading', icon: '📖', color: 'from-emerald-500 to-teal-400', desc: 'Improve your reading speed.' },
    { id: 'writing', title: 'Writing', icon: '✍️', color: 'from-amber-500 to-orange-400', desc: 'Write better essays.' },
    { id: 'speaking', title: 'Speaking', icon: '🗣️', color: 'from-rose-500 to-pink-400', desc: 'Speak with confidence.' }
  ];

  /**
   * মডিউল সিলেকশন হ্যান্ডলার
   */
  const handleSelection = (moduleId) => {
    const examData = linkConfig[examId];
    const testData = examData ? examData[testId] : null;
    
    let finalLink = null;

    if (testData) {
      const targetModule = testData[moduleId];

      // যদি মডিউলটি অবজেক্ট হয় (যেমন reading/writing), তবে Academic/General চেক করবে
      if (targetModule && typeof targetModule === 'object') {
        finalLink = targetModule[test_type]; 
      } else {
        // লিসেনিং বা স্পিকিং এর মতো সরাসরি স্ট্রিং লিঙ্ক হলে
        finalLink = targetModule;
      }
    }

    if (finalLink) {
      navigate(finalLink);
    } else {
      // যদি কনফিগারেশনে লিঙ্ক না মেলে, তবে ফলব্যাক বা ডিফল্ট রুটে পাঠাবে (টাইপ সহ)
      console.warn(`No manual link found for ${test_type} ${moduleId}. Using fallback.`);
      navigate(`/user/default-quiz/${moduleId}/${test_type}/${examId}/${testId}`);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-800 mb-2">
            Select Your <span className="text-indigo-600">Module</span>
          </h2>
          <div className="flex justify-center gap-3 mt-4">
             <span className="bg-slate-800 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest shadow-sm">
               Exam Set: {examId}
             </span>
             <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest shadow-sm">
               Test No: {testId}
             </span>
             <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest shadow-sm">
               Type: {test_type}
             </span>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {modules.map((module) => (
            <div
              key={module.id}
              onClick={() => handleSelection(module.id)}
              className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-indigo-500 shadow-xl hover:shadow-indigo-100 transition-all duration-500 cursor-pointer flex flex-col items-center text-center overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full group-hover:bg-indigo-50 transition-colors duration-500 -z-10"></div>

              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${module.color} flex items-center justify-center text-4xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {module.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-3">{module.title}</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                {module.desc}
              </p>

              <div className="mt-auto font-black text-xs uppercase tracking-[0.2em] text-indigo-600 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                Start Now <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default SkillSelection;