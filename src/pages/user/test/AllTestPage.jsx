import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, BookOpen, Star, Lock, Unlock, 
  CheckCircle2, Gift, ArrowRight, ShieldCheck, 
  Sparkles, Timer
} from 'lucide-react';
import UserLayout from '../UserLayout';
import api from '../../../api'; 

const AllTestPage = () => {

  const navigate = useNavigate();

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // এপিআই থেকে ডাটা নিয়ে আসা
  useEffect(() => {

    const fetchExams = async () => {

      try {

        // localStorage থেকে ইউজার ডাটা নেওয়া
        const userData = JSON.parse(localStorage.getItem('user')); 
        const userId = userData?.id;

        // API Call
        const response = await api.get(`/exams?user_id=${userId}`);
        
        setTests(response.data.data || response.data); 

      } catch (error) {

        console.error("Error fetching exams:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchExams();

  }, []);

  // Button Action
  const handleAction = (test) => {

    const status = test.enrollment_status;

    const isExpired =
      test.expire_date &&
      new Date(test.expire_date) < new Date();

    // Free Test
    if (test.is_free) {

      navigate(`/user/test-dashboard/${test.id}`);
      return;

    }

    // Purchased
    if (status == 1) {

      // Expired হলে Renew
      if (isExpired) {

        navigate('/user/payment', {
          state: {
            itemId: test.id,
            itemName: test.name,
            amount: test.amount,
            buyType: 'Mock Test Renew'
          }
        });

      } else {

        // Active থাকলে Continue
        navigate(`/user/test-dashboard/${test.id}`);

      }

    }

    // Pending
    else if (status == 2) {

      navigate(`/user/pending-test/${test.id}`);

    }

    // Buy Now
    else {

      navigate('/user/payment', { 
        state: { 
          itemId: test.id, 
          itemName: test.name, 
          amount: test.amount, 
          buyType: 'Mock Test' 
        } 
      });

    }

  };

  return (

    <UserLayout>

      <div className="min-h-screen bg-[#F8FAFC] pb-20">

        {/* --- Hero Section --- */}
        <div className="bg-white border-b border-slate-100">

          <div className="max-w-7xl px-6 py-10 md:py-16 mx-auto">

            <div className="max-w-3xl space-y-4">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-[11px] font-black uppercase tracking-wider">
                <Sparkles size={12} />
                Premium Examination Hub
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Master the IELTS with <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                  Real-Time Simulations.
                </span>
              </h1>

              <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
                Boost your confidence with our expert-crafted mock tests. Designed by examiners for accurate score estimates.
              </p>

            </div>

          </div>

        </div>

        {/* --- Test Grid Section --- */}
        <div className="max-w-7xl mx-auto px-6 -mt-10">

          {loading ? (

            <div className="text-center py-20 font-bold text-slate-400">
              Loading Exams...
            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {tests.map((test) => {

                const isExpired =
                  test.expire_date &&
                  new Date(test.expire_date) < new Date();

                return (

                  <div 
                    key={test.id} 
                    className={`group bg-white rounded-[2.5rem] border border-slate-100 p-2 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2
                      ${test.is_free ? 'ring-2 ring-emerald-500/20' : ''}`}
                  >

                    <div className="relative p-6 md:p-8 flex flex-col h-full">

                      {/* Badge Section */}
                      <div className="absolute top-8 right-8 flex flex-col gap-2 items-end">

                        {/* Free Badge */}
                        {test.is_free ? (

                          <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-emerald-100">
                            Free Access
                          </span>

                        ) : (

                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border
                            ${test.enrollment_status == 1 
                              ? isExpired
                                ? 'bg-rose-50 text-rose-600 border-rose-100'
                                : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                              : test.enrollment_status == 2
                                ? 'bg-amber-50 text-amber-600 border-amber-100' 
                                : 'bg-slate-50 text-slate-600 border-slate-100'
                            }`}>

                            {
                              test.enrollment_status == 1
                                ? isExpired
                                  ? 'Expired'
                                  : 'Purchased'
                                : 'Premium'
                            }

                          </span>

                        )}

                        {/* Open Badge */}
                        {(test.is_free || test.enrollment_status == 1) && (

                          <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border
                            ${isExpired
                              ? 'bg-rose-50 text-rose-600 border-rose-100'
                              : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                            }`}>

                            {isExpired ? 'Renew Required' : 'Open'}

                          </span>

                        )}

                      </div>

                      {/* Icon & Details */}
                      <div className="mb-8">

                        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-6

                          ${test.is_free || test.enrollment_status == 1 

                            ? isExpired
                              ? 'bg-rose-600 text-white'
                              : 'bg-emerald-600 text-white'

                            : 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                          }`}>

                          {test.enrollment_status == 1
                            ? <ShieldCheck size={30} />
                            : <BookOpen size={30} />
                          }

                        </div>

                        <div className="flex items-center gap-2 mb-2">

                          <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md text-xs font-black">
                            <Star size={12} className="fill-amber-500 mr-1" />
                            {test.rating}
                          </div>

                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            Global Standard
                          </span>

                        </div>

                        <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                          {test.name}
                        </h3>

                      </div>

                      {/* Info Row */}
                      <div className="flex items-center gap-4 mb-10">

                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold bg-slate-50 px-3 py-2 rounded-xl">
                          <Timer size={14} className="text-indigo-500" />
                          {test.duration}
                        </div>

                      </div>

                      {/* Footer Action */}
                      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">

                        <div>

                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">
                            Fee
                          </p>

                          <p className={`text-2xl font-black ${test.is_free ? 'text-emerald-600' : 'text-slate-900'}`}>
                            {test.fee_text}
                          </p>

                        </div>

                        {/* Action Button */}
                        <button 
                          onClick={() => handleAction(test)}

                          className={`group/btn cursor-pointer flex items-center justify-center gap-2 h-14 px-8 rounded-2xl font-black text-sm transition-all active:scale-95

                            ${test.is_free

                              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100'

                              : test.enrollment_status == 1

                                ? isExpired
                                  ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-100'
                                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'

                                : test.enrollment_status == 2

                                  ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-100'

                                  : 'bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-200'
                            }`}>

                          {
                            test.is_free

                              ? 'Try Free'

                              : test.enrollment_status == 1

                                ? isExpired
                                  ? 'Renew'
                                  : 'Continue'

                                : test.enrollment_status == 2

                                  ? 'Pending'

                                  : 'Buy Now'
                          }

                          <ArrowRight 
                            size={18} 
                            className="group-hover/btn:translate-x-1 transition-transform" 
                          />

                        </button>

                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </div>

        {/* --- Help Section --- */}
        <div className="max-w-7xl mx-auto px-6 mt-24">

          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden">

            <div className="relative z-10 space-y-6">

              <h2 className="text-3xl md:text-4xl font-black">
                Facing trouble with payment?
              </h2>

              <p className="text-slate-400 font-medium max-w-xl mx-auto">
                Our support team is available 24/7 to help you unlock your exams.
              </p>

              <button className="px-10 py-4 cursor-pointer bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black transition-all">
                Contact Support
              </button>

            </div>

          </div>

        </div>

      </div>

    </UserLayout>

  );

};

export default AllTestPage;