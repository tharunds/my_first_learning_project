import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  UserCheck, 
  TrendingUp, 
  Zap, 
  User, 
  Flame,
  Award,
  Calendar,
  HeartHandshake
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, currentRole, streakCount, onOpenBooking }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'explore', label: 'Explore Mentors', icon: Compass, badge: '60+ Active' },
    { id: 'my-mentors', label: 'My Mentors', icon: UserCheck, count: 2 },
    { id: 'progress', label: 'Progress & Goals', icon: TrendingUp },
    { id: 'skills', label: 'Skills Catalog', icon: Zap },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:block">
      <div className="sticky top-20 space-y-6">
        
        {/* Navigation list */}
        <nav className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-100 font-bold'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.count && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Streak & Motivation Card */}
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-2xl p-4 text-white shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-200">Weekly Streak</span>
            <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full text-xs font-bold border border-amber-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {streakCount} Days
            </div>
          </div>
          <p className="text-xs text-indigo-100 leading-relaxed mb-3">
            You're on fire! 2 more days to earn the <strong className="text-white">Consistency Ace</strong> badge.
          </p>
          <div className="w-full bg-indigo-950/60 rounded-full h-2 mb-3">
            <div 
              className="bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full transition-all duration-500" 
              style={{ width: '80%' }}
            ></div>
          </div>
          <button 
            onClick={() => setActiveTab('explore')}
            className="w-full py-2 px-3 text-xs font-bold text-center bg-white text-indigo-950 rounded-xl hover:bg-indigo-50 transition-colors shadow-xs"
          >
            Find a Mentor for Today
          </button>
        </div>

        {/* Community Volunteer Callout */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-950">
          <div className="flex items-center gap-2 mb-2 text-emerald-800">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Volunteer Spirit</h4>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed mb-3">
            SkillBridge is 100% free. Learn what you need today, and teach a beginner tomorrow.
          </p>
          <button 
            onClick={() => setActiveTab('profile')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1"
          >
            Manage volunteer skills →
          </button>
        </div>

      </div>
    </aside>
  );
}

