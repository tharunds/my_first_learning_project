import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  Video, 
  ArrowRight, 
  GraduationCap, 
  Flame, 
  UserCheck, 
  CheckCircle2, 
  Star, 
  BookOpen,
  Plus,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function Dashboard({ 
  userProfile, 
  upcomingSessions, 
  learningGoals, 
  mentorsData, 
  setActiveTab, 
  onBookSession,
  onOpenAddGoal
}) {
  const nextSession = upcomingSessions[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-indigo-200 mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Welcome back, {userProfile.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Learn with Passion, Give Back with Mentorship.
          </h1>
          <p className="mt-2 text-indigo-100 text-sm sm:text-base leading-relaxed">
            You're currently connected with {userProfile.stats.mentorsConnected} volunteer mentors. Next up: your 1-on-1 session with <strong className="text-white">{nextSession?.mentorName}</strong> {nextSession?.date.toLowerCase()}!
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setActiveTab('explore')}
              className="px-5 py-2.5 bg-white text-indigo-900 font-bold text-xs sm:text-sm rounded-xl hover:bg-indigo-50 transition-colors shadow-md flex items-center gap-2"
            >
              <span>Explore Volunteer Mentors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveTab('progress')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl backdrop-blur-sm border border-white/10 transition-colors"
            >
              View Learning Milestones
            </button>
          </div>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Hours Learned</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{userProfile.stats.hoursLearned}h</span>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+6h this week</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Across 5 technical domains</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sessions Completed</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{userProfile.stats.sessionsCompleted}</span>
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">100% Free</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">With 6 industry volunteers</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mentors Connected</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{userProfile.stats.mentorsConnected}</span>
            <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">2 active</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Stripe, Figma Alumni & AWS</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Learning Streak</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{userProfile.stats.currentStreak} Days</span>
            <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Active</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Personal best record!</p>
        </div>

      </div>

      {/* Main Grid: Upcoming Session Card + Active Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Next Session Spotlight (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-ping"></span>
                <h2 className="text-base font-bold text-slate-900">Next Upcoming Mentorship Session</h2>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
                {nextSession?.status || 'Confirmed'}
              </span>
            </div>

            {nextSession ? (
              <div className="bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-2xl p-5 border border-slate-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                  <div className="flex items-center gap-3.5">
                    <img 
                      src={nextSession.mentorAvatar} 
                      alt={nextSession.mentorName} 
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-200 shadow-sm"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{nextSession.mentorName}</h3>
                      <p className="text-xs text-slate-500">{nextSession.mentorRole}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-full text-indigo-700">
                          {nextSession.sessionType}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-left sm:text-right bg-white p-3 rounded-xl border border-slate-200/70 sm:bg-transparent sm:border-0 sm:p-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{nextSession.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{nextSession.time}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Session Agenda</h4>
                  <p className="text-sm font-semibold text-slate-800 mt-1">{nextSession.topic}</p>
                  <p className="text-xs text-slate-500 mt-1 italic">"{nextSession.prepNotes}"</p>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href={nextSession.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Google Meet Room</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                  <button 
                    onClick={() => setActiveTab('my-mentors')}
                    className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors"
                  >
                    Send Message to Mentor
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-slate-500">No upcoming sessions scheduled yet.</p>
                <button 
                  onClick={() => setActiveTab('explore')}
                  className="mt-3 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
                >
                  Book with a Volunteer Mentor
                </button>
              </div>
            )}
          </div>

          {/* Quick Learning Goals Overview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Current Learning Goals</h2>
                <p className="text-xs text-slate-500">Track progress and get weekly mentor reviews</p>
              </div>
              <button 
                onClick={onOpenAddGoal}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Goal
              </button>
            </div>

            <div className="space-y-4">
              {learningGoals.slice(0, 3).map((goal) => (
                <div 
                  key={goal.id} 
                  className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/20 transition-all cursor-pointer"
                  onClick={() => setActiveTab('progress')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {goal.domain}
                    </span>
                    <span className="text-xs font-bold text-slate-700">{goal.progress}% Done</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">{goal.title}</h3>
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-2.5">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Mentor: <strong className="text-slate-700">{goal.mentor}</strong></span>
                    <span>Target: {goal.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setActiveTab('progress')}
              className="mt-4 w-full py-2.5 text-center text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1"
            >
              <span>View full progress breakdown & milestones</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Featured Volunteer Mentors */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Featured Volunteer Mentors</h2>
              <button 
                onClick={() => setActiveTab('explore')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                View all
              </button>
            </div>

            <div className="space-y-4">
              {mentorsData.slice(0, 3).map((mentor) => (
                <div key={mentor.id} className="p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-3">
                    <img 
                      src={mentor.avatar} 
                      alt={mentor.name} 
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs font-bold text-slate-900 truncate">{mentor.name}</h3>
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-semibold shrink-0">
                          Free
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{mentor.role}</p>
                      <div className="flex items-center gap-1 mt-0.5 text-[10px] text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{mentor.rating}</span>
                        <span className="text-slate-400 font-normal">({mentor.reviewsCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {mentor.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => onBookSession(mentor)}
                    className="mt-3 w-full py-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Book Free 1-on-1 Session
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick SkillBridge Community Notice */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-3xl p-5">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>SkillBridge Promise</span>
            </div>
            <p className="text-xs text-purple-900/80 leading-relaxed">
              Every mentor on SkillBridge commits to volunteering their time to guide curious minds without fees. Pay it forward whenever you can!
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

