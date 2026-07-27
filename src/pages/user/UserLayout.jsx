import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/iletsVenture3.jpg';
import api from '../../api';

const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ড্রপডাউনের বাইরে ক্লিক করলে বন্ধ করার লজিক
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goToProfile = () => {
    setIsProfileOpen(false);
    navigate('/user/user-profile');
  };

  const handleLogout = async () => {
    try {
        
        await api.post('/logout'); 
    } catch (error) {
        console.error("Logout error:", error);
    } finally {
        // ২. LocalStorage থেকে সব ডেটা মুছে ফেলা
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // ৩. ড্রপডাউন বন্ধ করা
        setIsProfileOpen(false);

        // ৪. লগইন পেজে পাঠিয়ে দেওয়া
        window.location.href = '/user/login'; 
        
    }
};

  return (
    <div className="flex h-screen w-full bg-slate-50 font-['Inter'] overflow-hidden">
      
      {/* --- Sidebar --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent italic">
              IELTS Venture
            </h1>
          </div>

          <nav className="flex-1 px-4 space-y-1">
  {/* ড্যাশবোর্ড সাধারণত /user/dashboard হয় */}
  <SidebarLink icon="🏠" text="Dashboard" to="/user/user-profile" /> 
  
  {/* My Courses এর জন্য আপনার কাঙ্ক্ষিত রুট */}
  <SidebarLink icon="📖" text="My Courses" to="/user/courses" /> 
  
  <SidebarLink icon="📝" text="Mock Tests" to="/user/AllTestPage" />
  <SidebarLink icon="📊" text="Performance" to="/" />
  <SidebarLink icon="⚙️" text="Settings" to="/" />
  <SidebarLink icon="📊" text="Test History" to="/user/test-history" />
</nav>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-40 shadow-sm">
          
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor text-bold">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <h2 className="hidden sm:block text-sm font-semibold text-slate-400 uppercase tracking-widest italic">Student Dashboard</h2>
          </div>
          
          {/* Right: User Profile Section with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center gap-4 pl-2 group cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="text-right hidden xs:block">
                <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight">John Doe</p>
                <p className="text-[11px] font-medium text-slate-400 uppercase">Student Account</p>
              </div>

              <div className={`w-11 h-11 rounded-full border-2 transition-all duration-300 overflow-hidden shadow-sm ${isProfileOpen ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-slate-100 group-hover:border-indigo-400'}`}>
                <img src={Logo} alt="User" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* --- Dropdown Menu --- */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                <div className="px-4 py-3 border-b border-slate-50 mb-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider italic">Manage Account</p>
                </div>
                
                <button 
                  onClick={goToProfile}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                >
                  <span className="text-base">👤</span> View Profile
                </button>
                
                <button 
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                >
                  <span className="text-base">💳</span> Subscription
                </button>

                <div className="h-px bg-slate-100 my-1 mx-2"></div>

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                >
                  <span className="text-base">🚪</span> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Page Content */}
       
<main className="flex-1 overflow-y-auto bg-slate-50/50">
  {/* এখানে max-w-7xl বাদ দিয়ে w-full এবং px দিন */}
  <div className="p-4 md:p-6 w-full mx-auto min-h-full">
    {children}
  </div>
</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

const SidebarLink = ({ text, icon, to }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => `
      w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200
      ${isActive 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
        : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'}
    `}
  >
    <span className="text-lg">{icon}</span>
    {text}
  </NavLink>
);

export default UserLayout;