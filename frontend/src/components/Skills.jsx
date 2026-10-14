import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Users, 
  UserCheck, 
  Plus, 
  Check, 
  HeartHandshake, 
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function Skills({ 
  skillsCatalog, 
  userProfile, 
  onExploreSkillMentors,
  onAddSkillToLearning,
  onAddSkillToMentoring
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'learning' | 'teaching'

  const [localCatalog, setLocalCatalog] = useState(skillsCatalog);

  const toggleLearnSkill = (categoryIdx, skillIdx) => {
    setLocalCatalog(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const s = copy[categoryIdx].skills[skillIdx];
      s.inLearningList = !s.inLearningList;
      return copy;
    });
  };

  const toggleMentorSkill = (categoryIdx, skillIdx) => {
    setLocalCatalog(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const s = copy[categoryIdx].skills[skillIdx];
      s.canMentor = !s.canMentor;
      return copy;
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2 border border-indigo-100">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Skill Catalog</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Skills & Topics Exchange</h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse skills to learn with volunteer guidance, or mark skills you can mentor to give back.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeFilter === 'all' 
                ? 'bg-white text-indigo-700 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Skills
          </button>
          <button
            onClick={() => setActiveFilter('learning')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeFilter === 'learning' 
                ? 'bg-white text-indigo-700 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            I'm Learning
          </button>
          <button
            onClick={() => setActiveFilter('teaching')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeFilter === 'teaching' 
                ? 'bg-white text-indigo-700 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            I Can Teach (Volunteer)
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. React, PostgreSQL, System Design, Figma)..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Categories and Skill Cards */}
      <div className="space-y-8">
        {localCatalog.map((categoryGroup, catIdx) => {
          const filteredSkills = categoryGroup.skills.filter(skill => {
            const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
            if (!matchesSearch) return false;

            if (activeFilter === 'learning') return skill.inLearningList;
            if (activeFilter === 'teaching') return skill.canMentor;
            return true;
          });

          if (filteredSkills.length === 0) return null;

          return (
            <div key={categoryGroup.category} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h2 className="text-base font-bold text-slate-900">{categoryGroup.category}</h2>
                <span className="text-xs text-slate-400 font-medium">{filteredSkills.length} skills</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSkills.map((skill, sIdx) => (
                  <div
                    key={skill.name}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-indigo-200 hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-slate-900 text-sm">{skill.name}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          skill.level === 'Hot' || skill.level === 'Trending'
                            ? 'bg-rose-50 text-rose-600 border border-rose-100'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                        }`}>
                          {skill.level}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>{skill.learners} learners</span>
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-emerald-600">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>{skill.mentorsAvailable} mentors</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleLearnSkill(catIdx, sIdx)}
                          className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                            skill.inLearningList
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {skill.inLearningList ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Learning</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Want to Learn</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => toggleMentorSkill(catIdx, sIdx)}
                          className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                            skill.canMentor
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {skill.canMentor ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Volunteering</span>
                            </>
                          ) : (
                            <>
                              <HeartHandshake className="w-3.5 h-3.5" />
                              <span>Can Mentor</span>
                            </>
                          )}
                        </button>
                      </div>

                      <button
                        onClick={() => onExploreSkillMentors(skill.name)}
                        className="w-full py-1 text-center text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1"
                      >
                        <span>Find {skill.mentorsAvailable} mentors for this skill</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

