import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Bell, 
  UserCheck, 
  GraduationCap, 
  Menu, 
  X, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  currentRole, 
  setCurrentRole, 
  activeTab, 
  setActiveTab, 
  userProfile,
  onOpenSearch
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Upcoming Session Tomorrow",
      desc: "React 19 Architecture with Sarah Jenkins at 6:30 PM IST",
      time: "2h ago",
      unread: true
    },
    {
      id: 2,
      title: "Goal Milestone Reached! 🎉",
      desc: "Completed 'Custom hooks for API caching' in React goal",
      time: "1d ago",
      unread: false
    },
    {
      id: 3,
      title: "Priya Sharma accepted your invite",
      desc: "Portfolio UI/UX Review scheduled for Friday",
      time: "2d ago",
      unread: false
    }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'explore', label: 'Explore Mentors' },
    { id: 'my-mentors', label: 'My Mentors' },
    { id: 'progress', label: 'Progress' },
    { id: 'skills', label: 'Skills' },
    { id: 'profile', label: 'Profile' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  SkillBridge
                </span>
                <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                  Volunteer Network
                </span>
              </div>
            </button>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search mentors, skills (React, Python, System Design)..." 
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                onClick={onOpenSearch}
                readOnly
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-xs">
                ⌘K
              </span>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Role Switcher Pill */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button 
                onClick={() => setCurrentRole('learner')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  currentRole === 'learner' 
                    ? 'bg-white text-indigo-700 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Learner View
              </button>
              <button 
                onClick={() => setCurrentRole('mentor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  currentRole === 'mentor' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                Mentor View
              </button>
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white"></span>
              </button>

              {/* Notifications Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">Notifications</span>
                    <span className="text-xs text-indigo-600 font-medium hover:underline cursor-pointer">
                      Mark all read
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {notifications.map(item => (
                      <div key={item.id} className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer ${item.unread ? 'bg-indigo-50/40' : ''}`}>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-slate-900">{item.title}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 pt-2 border-t border-slate-100 text-center">
                    <button 
                      onClick={() => { setShowNotifications(false); setActiveTab('progress'); }}
                      className="text-xs text-indigo-600 font-semibold hover:text-indigo-700"
                    >
                      View all learning activities →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Trigger */}
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl border transition-all ${
                activeTab === 'profile' 
                  ? 'border-indigo-400 ring-2 ring-indigo-100 bg-indigo-50/50' 
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200" 
              />
              <span className="hidden lg:inline-block text-xs font-semibold text-slate-800 text-left">
                {userProfile.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:inline-block" />
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl mb-3">
              <span className="text-xs font-medium text-slate-500">Mode:</span>
              <button 
                onClick={() => setCurrentRole('learner')} 
                className={`text-xs px-2.5 py-1 rounded-md font-semibold ${currentRole === 'learner' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
              >
                Learner
              </button>
              <button 
                onClick={() => setCurrentRole('mentor')} 
                className={`text-xs px-2.5 py-1 rounded-md font-semibold ${currentRole === 'mentor' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
              >
                Volunteer Mentor
              </button>
            </div>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

