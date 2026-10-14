import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Clock, 
  Globe, 
  Edit3, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Plus, 
  X,
  Save
} from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.54a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
  </svg>
);

export default function Profile({ userProfile, onUpdateProfile, currentRole, setCurrentRole }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userProfile });

  const [activeProfileTab, setActiveProfileTab] = useState('learner'); // 'learner' | 'volunteer'

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleToggleVolunteer = () => {
    const updated = {
      ...formData,
      isVolunteerMentor: !formData.isVolunteerMentor
    };
    setFormData(updated);
    onUpdateProfile(updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Profile Banner & Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        {/* Banner Cover */}
        <div className="h-36 sm:h-48 bg-gradient-to-r from-indigo-800 via-indigo-600 to-purple-800 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute right-4 top-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-white/90 hover:bg-white text-slate-800 text-xs font-bold rounded-xl shadow-md backdrop-blur-xs flex items-center gap-1.5 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Close Editing' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
              <img 
                src={formData.avatar} 
                alt={formData.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white shadow-xl bg-white" 
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl font-black text-slate-900">{formData.name}</h1>
                  {formData.isVolunteerMentor && (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <HeartHandshake className="w-3.5 h-3.5" />
                      Community Mentor
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-indigo-600">{formData.role}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {formData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {formData.timezone}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center sm:justify-end gap-2 pt-2">
              <a 
                href={formData.github} 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href={formData.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href={formData.website} 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Portfolio Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bio text */}
          <p className="mt-5 text-sm text-slate-600 leading-relaxed max-w-3xl">
            {formData.bio}
          </p>
        </div>

      </div>

      {/* Edit Form Modal (if isEditing is active) */}
      {isEditing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-3xl border-2 border-indigo-200 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">Edit Your Public Profile</h3>
            <span className="text-xs text-slate-400">All members can view this</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Headline / Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              About Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Timezone
              </label>
              <input
                type="text"
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                GitHub URL
              </label>
              <input
                type="text"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* Role Tabs: Learner Profile vs Volunteer Mentor Settings */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveProfileTab('learner')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeProfileTab === 'learner' 
              ? 'bg-white text-indigo-700 shadow-xs' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Learner Identity & Goals</span>
        </button>
        <button
          onClick={() => setActiveProfileTab('volunteer')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeProfileTab === 'volunteer' 
              ? 'bg-white text-emerald-700 shadow-xs' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-emerald-600" />
          <span>Volunteer Mentor Setup</span>
        </button>
      </div>

      {/* Tab 1: Learner Identity */}
      {activeProfileTab === 'learner' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Target Roles & Learning Skills */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Target Engineering Roles</h3>
            <div className="flex flex-wrap gap-2">
              {formData.targetRoles.map(role => (
                <span key={role} className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold rounded-xl">
                  {role}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm mb-3">Skills Actively In Progress</h4>
              <div className="space-y-3">
                {formData.learningSkills.map(skill => (
                  <div key={skill.name} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-800">{skill.name}</span>
                      <span className="text-slate-500 font-medium">{skill.completedHours} / {skill.goalHours} hrs</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${Math.round((skill.completedHours / skill.goalHours) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Stats & Badges Earned */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <h3 className="font-bold text-slate-900 text-base">Learning Engagement Stats</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-center">
                <span className="text-2xl font-black text-indigo-700">{formData.stats.hoursLearned}</span>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">Hours Studied</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-center">
                <span className="text-2xl font-black text-emerald-700">{formData.stats.sessionsCompleted}</span>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">Mentor Calls</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Study Availability
              </h4>
              <p className="text-xs text-slate-600">
                Weekday evenings after 6:00 PM IST & Weekend mornings.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Volunteer Mentor Setup */}
      {activeProfileTab === 'volunteer' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">Community Volunteer Mentorship</h3>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                SkillBridge thrives on community goodwill. Even if you're learning advanced topics, you can volunteer 30 minutes a week to help an absolute beginner get unstuck!
              </p>
            </div>

            <button
              onClick={handleToggleVolunteer}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                formData.isVolunteerMentor 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              {formData.isVolunteerMentor ? '✓ Volunteer Mode Active' : 'Enable Volunteer Mentor'}
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Skills You Can Volunteer to Teach</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formData.mentorSkills.map(skill => (
                <div key={skill.name} className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-800 text-xs">{skill.name}</h5>
                    <span className="text-[10px] text-slate-400">Level: {skill.level}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Open for 1-on-1s
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Your Volunteer Mentor Pitch
              </h4>
              <p className="text-xs text-slate-600 italic bg-slate-50 p-4 rounded-2xl border border-slate-200">
                "{formData.volunteerBio}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-2xl font-black text-slate-900">{formData.stats.volunteerHoursGiven}h</span>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Volunteer Hours Given</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-2xl font-black text-slate-900">{formData.stats.learnersHelped}</span>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Junior Learners Guided</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
