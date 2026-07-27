import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SocialCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        // ইউআরএল থেকে টোকেনটি নেওয়া হচ্ছে
        const token = searchParams.get('token');

        if (token) {
            // ১. টোকেনটি LocalStorage-এ সেভ করা
            localStorage.setItem('token', token);

            // ২. ড্যাশবোর্ড বা প্রোফাইলে পাঠিয়ে দেওয়া
            // আপনি চাইলে এখানে একটি API কল করে ইউজারের ডাটাও নিয়ে আসতে পারেন
            navigate('/user/user-profile');
        } else {
            // টোকেন না থাকলে লগইন পেজে ফেরত পাঠানো
            navigate('/user/login?error=social_login_failed');
        }
    }, [navigate, searchParams]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-slate-600 font-medium">Finalizing your login...</p>
        </div>
    );
};

export default SocialCallback;