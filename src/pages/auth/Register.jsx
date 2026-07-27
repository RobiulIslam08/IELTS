import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../assets/iletsVenture3.jpg';
import api from '../../api';


const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '12345678',
        password_confirmation: '12345678'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { name, email, password, password_confirmation } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // পাসওয়ার্ড ম্যাচিং চেক (Client-side validation)
        if (password !== password_confirmation) {
            return setError('Passwords do not match!');
        }

        setLoading(true);

        try {
            // Laravel Backend Register API
            
            const res = await api.post('/register', { name, email, password });
            
            if (res.data.status === 'success') {
                
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/user/user-profile'); 
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50 font-['Inter'] px-4 py-12">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg border border-slate-100">
                
                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-3 overflow-hidden border border-indigo-100">
                        <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">IELTS Venture</h2>
                    <p className="text-slate-500 text-sm mt-1">Start your journey to success today!</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm bg-slate-50/50 focus:bg-white"
                            placeholder="e.g. John Doe"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm bg-slate-50/50 focus:bg-white"
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    {/* Password Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm bg-slate-50/50 focus:bg-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Confirm</label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={password_confirmation}
                                onChange={onChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm bg-slate-50/50 focus:bg-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {/* Register Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-3.5 mt-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-8 text-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                    <span className="relative px-4 bg-white text-xs text-slate-400 uppercase font-medium">Or join with</span>
                </div>

                {/* Social Register */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex cursor-pointer items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-semibold text-slate-700">
                        <img src="https://developers.google.com/identity/images/g-logo.png" className="w-5" alt="G" />
                        Google
                    </button>
                    <button className="flex cursor-pointer items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-semibold text-slate-700">
                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" className="w-5" alt="F" />
                        Facebook
                    </button>
                </div>

                <p className="text-center mt-8 text-sm text-slate-500 font-medium">
                    Already have an account? <Link to="/user/login" className="text-indigo-600 font-bold hover:underline italic">Sign In here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;