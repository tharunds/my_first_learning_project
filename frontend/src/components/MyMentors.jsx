import React, { useState } from 'react';
import { 
  UserCheck, 
  Video, 
  MessageSquare, 
  Calendar, 
  Clock, 
  Star, 
  FileText, 
  Sparkles, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function MyMentors({ 
  upcomingSessions, 
  pastSessions, 
  mentorsData, 
  onBookSession, 
  onStartChat 
}) {
  const [activeSubTab, setActiveSubTab] = useState('upcoming'); // 'upcoming' | 'past' | 'all-connected'

  // Connected mentors: Sarah Jenkins, Priya Sharma, David Chen, Alex Rivera
  const connectedMentorIds = ['m-1', 'm-2', 'm-3', 'm-4'];
  const connectedMentors = mentorsData.filter(m => connectedMentorIds.includes(m.id));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Mentors & Sessions</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your scheduled 1-on-1 calls, mentor message threads, and review past feedback.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab('upcoming')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'upcoming' 
                ? 'bg-white text-indigo-700 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upcoming Calls ({upcomingSessions.length})
          </button>
          <button
            onClick={() => setActiveSubTab('all-connected')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'all-connected' 
                ? 'bg-white text-indigo-700 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Connected ({connectedMentors.length})
          </button>
          <button
            onClick={() => setActiveSubTab('past')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'past' 
                ? 'bg-white text-indigo-700 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Past Feedback ({pastSessions.length})
          </button>
        </div>
      </div>

      {/* Content based on sub-tab */}
      {activeSubTab === 'upcoming' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Scheduled Volunteer Sessions</h2>
            <span className="text-xs text-slate-500">Google Meet links activate 10 minutes prior</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingSessions.map((session) => (
              <div 
                key={session.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={session.mentorAvatar} 
                        alt={session.mentorName} 
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-100"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{session.mentorName}</h3>
                        <p className="text-xs text-slate-500">{session.mentorRole}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {session.status}
                    </span>
                  </div>

                  <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{session.date} • {session.time}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      {session.topic}
                    </div>
                    {session.prepNotes && (
                      <p className="text-[11px] text-slate-500 italic">
                        Notes: {session.prepNotes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={session.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Room</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                  <button
                    onClick={() => {
                      const m = mentorsData.find(item => item.id === session.mentorId) || mentorsData[0];
                      onStartChat(m);
                    }}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                    title="Send message"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'all-connected' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connectedMentors.map((mentor) => (
            <div 
              key={mentor.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={mentor.avatar} 
                      alt={mentor.name} 
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{mentor.name}</h3>
                      <p className="text-xs text-slate-500">{mentor.role} • {mentor.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{mentor.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2">
                  {mentor.bio}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {mentor.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onStartChat(mentor)}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>
                <button
                  onClick={() => onBookSession(mentor)}
                  className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book Next Session</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === 'past' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Completed Sessions & Notes</h2>
            <span className="text-xs text-slate-500">All sessions are recorded in your learning log</span>
          </div>

          <div className="space-y-4">
            {pastSessions.map((session) => (
              <div 
                key={session.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={session.mentorAvatar} 
                      alt={session.mentorName} 
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{session.mentorName}</h3>
                      <p className="text-xs text-slate-400">{session.date} • {session.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>Rated {session.ratingGiven}.0 / 5.0</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                    Topic Covered: {session.topic}
                  </span>
                  <div className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span><strong>Mentor Feedback:</strong> "{session.feedback}"</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

