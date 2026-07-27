import React, { useState, useEffect } from 'react';
import UserLayout from '../user/UserLayout'; 
import Logo from '../../assets/iletsVenture3.jpg';
import api from '../../api'; // আপনার তৈরি করা axios instance

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [updatingTestType, setUpdatingTestType] = useState(false); // Loader for radio button change
  
  // Initial state configuration
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: 'IELTS Enthusiast',
    location: 'Not set',
    phone: 'Not set',
    profile_url: null,
    test_type: 'Academic', // Default value
    account_type: 'Free User'
  });

useEffect(() => {
  const fetchUserData = async () => {
    try {
      // LocalStorage থেকে লগড-ইন ইউজারের ডাটা নেওয়া হচ্ছে
      const localUser = JSON.parse(localStorage.getItem('user'));
      const userId = localUser?.id;

      if (!userId) {
        throw new Error("User ID missing in localStorage");
      }

      // টোকেন ছাড়া নতুন পাবলিক রাউটে user_id পাঠিয়ে ডাটা আনা হচ্ছে
      const res = await api.get(`/userProfileData?user_id=${userId}`); 
      
      setUser({
        ...res.data,
        bio: res.data.bio,
        location: res.data.location,
        phone: res.data.phone,
        test_type: res.data.test_type,
      });

      // লোকাল স্টোরেজ আপডেট করে রাখা
      localStorage.setItem('user', JSON.stringify({ ...localUser, ...res.data }));

    } catch (error) {
      console.error("Error fetching user data:", error);
      // এপিআই ফেইল করলে লোকাল স্টোরেজ থেকে ব্যাকআপ ডাটা লোড হবে
      const localUser = JSON.parse(localStorage.getItem('user'));
      if (localUser) setUser(prev => ({ ...prev, ...localUser }));
    } finally {
      setLoading(false);
    }
  };

  fetchUserData();
}, []);

  // Radio button change handler & API call
// Radio button change handler & API call
  const handleTestTypeChange = async (e) => {
    const selectedType = e.target.value;
    
    // Optimistic UI update
    setUser(prev => ({ ...prev, test_type: selectedType }));
    setUpdatingTestType(true);

    try {
      // LocalStorage অথবা স্টেট থেকে user_id নেওয়া হচ্ছে
      const userData = JSON.parse(localStorage.getItem('user'));
      const userId = userData?.id || user.id; 

      // পেলোডে test_type এর সাথে user_id পাঠানো হলো
      await api.post('/userUpdateTestType', { 
        user_id: userId,
        test_type: selectedType 
      });

      // LocalStorage আপডেট
      const localUser = JSON.parse(localStorage.getItem('user')) || {};
      localStorage.setItem('user', JSON.stringify({ ...localUser, test_type: selectedType }));
      
    } catch (error) {
      console.error("Error updating test type:", error);
      alert("Failed to update test type. Please try again.");
      // ফেইল করলে আগের অবস্থায় ব্যাক করার জন্য (অপশনাল):
      // fetchUserData(); 
    } finally {
      setUpdatingTestType(false);
    }
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
      <div className="w-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* 1. Header Section */}
        <div className="relative mb-20">
          <div className="h-56 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 w-full"></div>
          
          <div className="absolute -bottom-14 left-10 flex items-end gap-6">
            <div className="w-36 h-36 rounded-full border-8 border-white bg-white shadow-lg overflow-hidden">
              <img 
                src={user.profile_url || Logo} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="mb-4">
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">{user.name}</h2>
              <p className="text-base text-slate-500 font-semibold flex items-center gap-2 mt-1">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                {user.bio}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Stats & Test Type Bar */}
        <div className="flex flex-col md:flex-row justify-around items-center py-8 border-b border-slate-50 bg-slate-50/30 px-10 gap-6 md:gap-0">
          <StatBox value="8.5" label="Target Band" />
          <div className="hidden md:block w-px h-12 bg-slate-200"></div>
          
          <StatBox value="12" label="Mock Tests" />
          <div className="hidden md:block w-px h-12 bg-slate-200"></div>
          
          {/* Account Status & Radio Buttons */}
          <div className="text-center flex flex-col items-center">
            <span className="px-5 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold shadow-sm">
              {user.account_type || 'Free User'}
            </span>
            <span className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 mt-2 mb-3">Account Status</span>
            
            {/* IELTS Test Type Options (Radio Buttons) */}
            <div className="flex items-center gap-4 bg-white border border-slate-200 p-1.5 rounded-xl relative shadow-sm">
              {updatingTestType && (
                <div className="absolute inset-0 bg-white/60 rounded-xl flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                </div>
              )}
              <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${user.test_type === 'Academic' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}>
                <input 
                  type="radio" 
                  name="test_type" 
                  value="Academic"
                  checked={user.test_type === 'Academic'}
                  onChange={handleTestTypeChange}
                  className="accent-indigo-600 cursor-pointer h-3.5 w-3.5"
                />
                Academic
              </label>
              
              <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${user.test_type === 'General' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}>
                <input 
                  type="radio" 
                  name="test_type" 
                  value="General"
                  checked={user.test_type === 'General'}
                  onChange={handleTestTypeChange}
                  className="accent-indigo-600 cursor-pointer h-3.5 w-3.5"
                />
                General
              </label>
            </div>
          </div>
        </div>

        {/* 3. Navigation Tabs */}
        <div className="flex px-10 border-b border-slate-100 bg-white">
          {['profile', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-6 px-10 text-sm font-bold transition-all border-b-2 capitalize relative ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'profile' ? 'General Info' : 'Account Settings'}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.4)]"></span>
              )}
            </button>
          ))}
        </div>

        {/* 4. Content Area */}
        <div className="p-10">
          {activeTab === 'profile' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-16 gap-y-10">
              <InfoField label="Full Name" value={user.name} icon="👤" />
              <InfoField label="Email Address" value={user.email} icon="📧" />
              <InfoField label="Phone Number" value={user.phone} icon="📞" />
              {/* এখানে পূর্বের user.id পরিবর্তন করে user.location করা হয়েছে */}
              <InfoField label="Location" value={user.location} icon="📍" /> 
            </div>
          ) : (
            <div className="space-y-6 max-w-lg">
              <h3 className="text-slate-800 font-bold text-lg mb-4">Security & Access Settings</h3>
              <SettingsButton text="Edit Profile Info" color="indigo" />
              <SettingsButton text="Change Password" color="indigo" />
              <SettingsButton text="Notification Preferences" color="indigo" />
              <div className="pt-6 mt-6 border-t border-slate-100">
                <SettingsButton text="Deactivate Account" color="red" />
              </div>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

// --- Reusable Sub-components ---
const StatBox = ({ value, label }) => (
  <div className="text-center group cursor-default">
    <span className="block text-3xl font-black text-indigo-600 tracking-tight group-hover:scale-110 transition-transform">{value}</span>
    <span className="text-[12px] uppercase tracking-widest font-bold text-slate-400">{label}</span>
  </div>
);

const InfoField = ({ label, value, icon }) => (
  <div className="group w-full">
    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1">
      {label}
    </span>
    <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 group-hover:border-indigo-300 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
      <span className="text-xl bg-white w-10 h-10 flex items-center justify-center rounded-xl shadow-sm group-hover:bg-indigo-50 transition-colors">{icon}</span>
      <span className="text-slate-700 font-bold text-lg">{value}</span>
    </div>
  </div>
);

const SettingsButton = ({ text, color }) => {
  const styles = color === 'red' 
    ? "bg-red-50 text-red-600 hover:bg-red-100 border-red-100" 
    : "bg-white text-slate-700 hover:bg-indigo-50 border-slate-200 hover:border-indigo-200 hover:shadow-sm";
    
  return (
    <button className={`w-full py-4 px-6 border rounded-2xl text-base font-bold transition-all duration-200 text-left flex justify-between items-center group ${styles}`}>
      {text}
      <span className="text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">→</span>
    </button>
  );
};

export default UserProfile;