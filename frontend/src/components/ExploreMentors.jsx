import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  HeartHandshake, 
  Sparkles,
  MapPin,
  Globe,
  SlidersHorizontal
} from 'lucide-react';

export default function ExploreMentors({ mentors, onBookSession, onStartChat }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'sessions'

  const categories = [
    'All',
    'Frontend',
    'Backend',
    'AI & Data',
    'DevOps',
    'UI/UX',
    'Career Guidance'
  ];

  const filteredMentors = useMemo(() => {
    return mentors.filter(mentor => {
      // Category filter
      const matchesCategory = 
        selectedCategory === 'All' || 
        mentor.categories.some(c => c.toLowerCase().includes(selectedCategory.toLowerCase())) ||
        mentor.skills.some(s => s.toLowerCase().includes(selectedCategory.toLowerCase()));

      // Search query filter
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        mentor.name.toLowerCase().includes(q) ||
        mentor.role.toLowerCase().includes(q) ||
        mentor.company.toLowerCase().includes(q) ||
        mentor.bio.toLowerCase().includes(q) ||
        mentor.skills.some(s => s.toLowerCase().includes(q));

      // Language filter
      const matchesLanguage = 
        selectedLanguage === 'All' || 
        mentor.languages.includes(selectedLanguage);

      return matchesCategory && matchesSearch && matchesLanguage;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'sessions') return b.sessionsCount - a.sessionsCount;
      return 0;
    });
  }, [mentors, searchQuery, selectedCategory, selectedLanguage, sortBy]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2 border border-emerald-100">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>100% Free Volunteer Network</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Explore Volunteer Mentors</h1>
          <p className="text-sm text-slate-500 mt-1">
            Connect with seasoned professionals who donate their time to teach, review code, and provide career guidance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="block text-2xl font-black text-indigo-600">{mentors.length}+</span>
            <span className="text-xs text-slate-400 font-medium">Verified Mentors</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        
        {/* Search Input Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by mentor name, skill (e.g. React, Docker, Python), or company..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-indigo-600 focus:outline-none cursor-pointer"
              >
                <option value="rating">Highest Rated</option>
                <option value="sessions">Most Sessions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Mentors Grid */}
      {filteredMentors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div 
              key={mentor.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                
                {/* Header with Avatar & Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <img 
                        src={mentor.avatar} 
                        alt={mentor.name} 
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-indigo-200 transition-all"
                      />
                      <span className="w-3 h-3 bg-emerald-500 rounded-full absolute -top-1 -right-1 ring-2 ring-white"></span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-base">{mentor.name}</h3>
                        {mentor.verified && (
                          <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{mentor.role}</p>
                      <p className="text-xs font-semibold text-indigo-600">{mentor.company}</p>
                    </div>
                  </div>
                </div>

                {/* Rating & Stats Strip */}
                <div className="mt-4 flex items-center justify-between py-2 px-3 bg-slate-50 rounded-xl text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{mentor.rating}</span>
                    <span className="text-slate-400 font-normal">({mentor.reviewsCount})</span>
                  </div>
                  <div className="text-slate-500 font-medium">
                    <strong className="text-slate-700">{mentor.sessionsCount}</strong> sessions
                  </div>
                  <div className="text-emerald-700 font-bold bg-emerald-100/60 px-2 py-0.5 rounded-md text-[10px]">
                    Free Volunteer
                  </div>
                </div>

                {/* Bio */}
                <p className="mt-3.5 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {mentor.bio}
                </p>

                {/* Skills tags */}
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="text-[11px] font-semibold bg-indigo-50/70 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Logistics Info */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Available: <strong className="text-slate-700">{mentor.availability}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Replies in {mentor.responseTime}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onStartChat(mentor)}
                  className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-colors"
                  title="Message mentor"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onBookSession(mentor)}
                  className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-indigo-100 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book Free Session</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No mentors match your filters</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or clearing your category filters to see more volunteers.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}

