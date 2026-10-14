import React, { useState } from 'react';
import { api } from '../services/api';
import { 
  TrendingUp, 
  Target, 
  Award, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Clock, 
  Flame, 
  Sparkles, 
  Calendar,
  Share2,
  GraduationCap
} from 'lucide-react';

export default function Progress({ 
  goals, 
  setGoals, 
  badges, 
  userProfile, 
  onOpenAddGoal 
}) {
  const [selectedDomain, setSelectedDomain] = useState('All');

  const toggleMilestone = async (goalId, milestoneId) => {
    // Optimistic UI update
    setGoals(prevGoals => {
      return prevGoals.map(goal => {
        if (goal.id !== goalId) return goal;

        const updatedMilestones = goal.milestones.map(m => {
          if (m.id === milestoneId) {
            return { ...m, done: !m.done };
          }
          return m;
        });

        const completedCount = updatedMilestones.filter(m => m.done).length;
        const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);

        return {
          ...goal,
          milestones: updatedMilestones,
          progress: newProgress
        };
      });
    });

    try {
      await api.toggleMilestone(goalId, milestoneId);
    } catch (e) {
      // offline fallback
    }
  };

  const totalMilestones = goals.reduce((acc, g) => acc + g.milestones.length, 0);
  const completedMilestones = goals.reduce((acc, g) => acc + g.milestones.filter(m => m.done).length, 0);

  const filteredGoals = selectedDomain === 'All' 
    ? goals 
    : goals.filter(g => g.domain.toLowerCase() === selectedDomain.toLowerCase());

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2 border border-indigo-100">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Learning Milestones & Growth</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Your Learning Journey</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track goals, check off completed milestones with your mentors, and unlock community badges.
          </p>
        </div>

        <button
          onClick={onOpenAddGoal}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 transition-all flex items-center gap-2 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Set New Goal</span>
        </button>
      </div>

      {/* Progress Metric Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Milestones</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {completedMilestones}/{totalMilestones}
            </span>
            <span className="text-xs font-bold text-emerald-600">
              {Math.round((completedMilestones / totalMilestones) * 100)}%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Checked off with mentors</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Goals</span>
            <Target className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{goals.length}</span>
            <span className="text-xs font-semibold text-indigo-600">In Progress</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Target dates up to Jan 2027</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Learning Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{userProfile.stats.currentStreak} Days</span>
            <span className="text-xs font-bold text-amber-600">Active</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Consistency pays off</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Badges Earned</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {badges.filter(b => b.unlocked).length}/{badges.length}
            </span>
            <span className="text-xs font-semibold text-purple-600">Community Rank</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Level 3 Knowledge Seeker</p>
        </div>

      </div>

      {/* Interactive Goals List with Checkable Milestones */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-slate-900">Active Learning Roadmaps</h2>
          <span className="text-xs text-slate-500">Click any milestone checkbox to mark completion</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGoals.map((goal) => (
            <div 
              key={goal.id} 
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md">
                    {goal.domain}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{goal.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-indigo-600">{goal.progress}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>

              {/* Milestone checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Milestones ({goal.milestones.filter(m => m.done).length}/{goal.milestones.length})
                </span>
                {goal.milestones.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => toggleMilestone(goal.id, m.id)}
                    className={`flex items-start gap-2.5 p-2 rounded-xl cursor-pointer transition-colors ${
                      m.done ? 'bg-emerald-50/60 text-slate-500' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <button type="button" className="shrink-0 mt-0.5">
                      {m.done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 hover:text-indigo-600" />
                      )}
                    </button>
                    <span className={`text-xs select-none ${m.done ? 'line-through text-slate-400' : 'font-medium'}`}>
                      {m.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Goal Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Target: {goal.dueDate}</span>
                </div>
                <div>
                  Mentor: <strong className="text-slate-700">{goal.mentor}</strong>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Badges & Recognition */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Community Badges & Honors</h2>
            <p className="text-xs text-slate-500">Earn recognition for learning commitment and volunteer mentoring</p>
          </div>
          <button 
            onClick={() => alert("Progress link copied to clipboard!")}
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Badges</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all ${
                badge.unlocked 
                  ? 'border-indigo-100 bg-gradient-to-br from-white to-indigo-50/20 shadow-xs' 
                  : 'border-slate-200/60 bg-slate-50/50 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-tr ${badge.color} shadow-sm`}>
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{badge.title}</h3>
                    {badge.unlocked && (
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        Unlocked
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{badge.description}</p>
                </div>
              </div>
              {badge.unlockedDate && (
                <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                  Earned {badge.unlockedDate}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

