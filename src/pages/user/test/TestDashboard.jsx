import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LayoutGrid, ArrowRight, BookOpen, GraduationCap } from 'lucide-react';
import UserLayout from '../UserLayout';

const TestDashboard = () => {
  const { examId } = useParams(); // URL থেকে এক্সাম আইডি নেওয়া হচ্ছে
  const navigate = useNavigate();

  // টেস্ট মডিউলগুলোর ডাটা
  const modules = [
    { id: 1, title: 'Test 1', description: 'Full Mock Simulation - Set A' },
    { id: 2, title: 'Test 2', description: 'Full Mock Simulation - Set B' },
    { id: 3, title: 'Test 3', description: 'Full Mock Simulation - Set C' },
    { id: 4, title: 'Test 4', description: 'Full Mock Simulation - Set D' },
  ];

  const handleModuleClick = (testNumber) => {
    // এখানে ক্লিক করলে পরবর্তী পেজে (যেমন: লিসেনিং/রিডিং সিলেকশন) নিয়ে যাবে
    // examId এবং testNumber দুইটাই পাঠানো হচ্ছে
    navigate(`/user/takeTest/${examId}/${testNumber}`);
  };

  return (
    <UserLayout>
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-2xl text-sm font-bold mb-4">
              <GraduationCap size={18} />
              Exam ID: {examId}
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-4">Select Your Test Set</h1>
            <p className="text-slate-500 font-medium">Please select a test module to begin your examination process.</p>
          </div>

          {/* Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module.id)}
                className="group relative cursor-pointer bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                    <BookOpen size={24} />
                  </div>
                  <ArrowRight className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all" />
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-1">
                  {module.title}
                </h3>
                <p className="text-slate-400 text-sm font-medium">
                  {module.description}
                </p>

                {/* Decorative Background Element */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center text-slate-400 text-sm font-bold flex items-center justify-center gap-2">
            <LayoutGrid size={16} />
            All tests are based on standard IELTS patterns.
          </div>

        </div>
      </div>
    </UserLayout>
  );
};

export default TestDashboard;