import axios from 'axios';

const api = axios.create({
    // আপনার Laravel ব্যাকএন্ডের বেস URL
    // baseURL: 'http://127.0.0.1:8000/api', 
    baseURL: 'https://backend.band9tests.com/api', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// রিকোয়েস্ট পাঠানোর আগে অটোমেটিক টোকেন যুক্ত করার জন্য ইন্টারসেপ্টর (Interceptor)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;