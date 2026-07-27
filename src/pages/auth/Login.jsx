import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../assets/iletsVenture3.jpg';

import api from '../../api'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await api.post('/login', { email, password });
            
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/user/user-profile'); 
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid Credentials');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'https://backend.band9tests.com/api/auth/google';
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50 font-['Inter'] px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
                
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-3 overflow-hidden border border-indigo-100">
                        <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">IELTS Venture</h2>
                </div>

                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">Welcome Back</h3>
                    <p className="text-slate-500 text-sm mt-1">Enter your details to access your account</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6 text-center animate-pulse">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                            placeholder="example@mail.com"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-semibold text-slate-700">Password</label>
                            {/* এখানে text-xs কে className এর ভেতরে নিয়ে আসা হয়েছে */}
                            <Link to="/forgot-password" className="text-xs text-indigo-600 hover:underline font-medium">Forgot?</Link>
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className="relative my-8 text-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                    <span className="relative px-4 bg-white text-xs text-slate-400 uppercase font-medium">Or continue with</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={handleGoogleLogin}
                        className="flex items-center cursor-pointer justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700"
                    >
                        <img src="https://developers.google.com/identity/images/g-logo.png" className="w-5" alt="G" />
                        Google
                    </button>
                    <button className="flex cursor-pointer items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700">
                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" className="w-5" alt="F" />
                        Facebook
                    </button>
                </div>

                <p className="text-center mt-8 text-sm text-slate-500 font-medium">
                    Don't have an account? <Link to="/user/register" className="text-indigo-600 font-bold hover:underline">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;