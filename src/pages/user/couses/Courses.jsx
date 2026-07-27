import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../UserLayout';
// import api from '../../../api'; // আপনার API পাথ অনুযায়ী এটি ঠিক করে নিন

const Courses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const dummyCourses = [
        {
            id: 101,
            title: 'IELTS Academic Mastery',
            instructor: 'Dr. Sarah Wilson',
            duration: '12 Weeks',
            students: '1.2k',
            rating: '4.9',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop',
            category: 'Academic',
            price: 50, 
            isUnlocked: false,
        },
        {
            id: 102,
            title: 'Speaking & Writing Workshop',
            instructor: 'Prof. James Bond',
            duration: '8 Weeks',
            students: '850',
            rating: '4.8',
            image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&auto=format&fit=crop',
            category: 'Skills',
            price: 99,
            isUnlocked: true,
        },
        {
            id: 103,
            title: 'Vocabulary Boost for 8.0+',
            instructor: 'Emma Watson',
            duration: '4 Weeks',
            students: '2.5k',
            rating: '5.0',
            image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop',
            category: 'Vocabulary',
            price: 0,
            isUnlocked: true,
        }
    ];

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // আসল API কল করার সময় নিচের লাইনটি আনকমেন্ট করুন
                // const res = await api.get('/courses');
                // setCourses(res.data);
                setCourses(dummyCourses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // Enroll বা View Class হ্যান্ডলার
    const handleCourseAction = (course) => {
        if (course.isUnlocked || course.price === 0) {
            navigate(`/user/courses/${course.id}/lessons`);
        } else {
            // পেমেন্ট পেজে ডাটা পাঠানোর সময় কী-ওয়ার্ডগুলো আপডেট করা হয়েছে
            navigate('/user/payment', { 
                state: { 
                    itemId: course.id,       // Payment.jsx এ এটি 'itemId' হিসেবে রিসিভ হবে
                    itemName: course.title,  // Payment.jsx এ এটি 'itemName' হিসেবে রিসিভ হবে
                    amount: course.price,
                    buyType: 'Course',       // এটি 'Course' নাকি 'Test' তা নিশ্চিত করবে
                    currency: 'SAR'
                } 
            });
        }
    };

    if (loading) {
        return (
            <UserLayout>
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            <div className="w-full pb-10 px-4 md:px-0">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Available Courses</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage your learning journey and unlock new skills.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course.id} className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 flex flex-col relative">
                            
                            {/* Course Image & Lock Overlay */}
                            <div className="relative h-56 overflow-hidden">
                                <img 
                                    src={course.image} 
                                    alt={course.title} 
                                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!course.isUnlocked && course.price > 0 ? 'grayscale-[0.3] brightness-90' : ''}`}
                                />
                                
                                {!course.isUnlocked && course.price > 0 && (
                                    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px] flex items-center justify-center">
                                        <div className="bg-white/90 p-4 rounded-3xl shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                                            <span className="text-2xl">🔒</span>
                                        </div>
                                    </div>
                                )}

                                <div className="absolute top-5 left-5">
                                    <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-indigo-600 text-xs font-black rounded-xl shadow-lg uppercase tracking-wider">
                                        {course.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex-grow flex flex-col">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                                        <span className="text-amber-500 text-xs mr-1">⭐</span>
                                        <span className="text-xs font-black text-amber-700">{course.rating}</span>
                                    </div>
                                    <span className="text-slate-400 text-xs font-bold uppercase tracking-tight">{course.students} Students</span>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                                <p className="text-slate-500 text-sm font-medium mb-6">by {course.instructor}</p>
                                
                                <div className="mt-auto">
                                    <div className="flex items-center justify-between py-5 border-t border-slate-50">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Duration</span>
                                            <span className="text-sm font-bold text-slate-700">{course.duration}</span>
                                        </div>
                                        <div className="text-2xl font-black text-indigo-600 tracking-tighter">
                                            {course.price > 0 ? `${course.price} SAR` : 'FREE'}
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => handleCourseAction(course)}
                                        className={`w-full py-4 rounded-2xl font-black text-sm transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl ${
                                            course.isUnlocked || course.price === 0
                                            ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-100' 
                                            : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-slate-200'
                                        }`}
                                    >
                                        {course.isUnlocked || course.price === 0 ? (
                                            <>Continue Learning 📖</>
                                        ) : (
                                            <>Unlock Full Course 💳</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </UserLayout>
    );
};

export default Courses;