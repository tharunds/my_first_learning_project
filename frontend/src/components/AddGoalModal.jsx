import React, { useState } from 'react';
import { X, Plus, Target, CheckCircle } from 'lucide-react';

export default function AddGoalModal({ onClose, onAddGoal }) {
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('Frontend');
  const [dueDate, setDueDate] = useState('Dec 15, 2026');
  const [milestones, setMilestones] = useState(['', '']);

  const handleMilestoneChange = (index, value) => {
    const updated = [...milestones];
    updated[index] = value;
    setMilestones(updated);
  };

  const addMilestoneField = () => {
    setMilestones([...milestones, '']);
  };

  const removeMilestoneField = (index) => {
    if (milestones.length <= 1) return;
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const validMilestones = milestones
      .filter(m => m.trim().length > 0)
      .map((text, idx) => ({
        id: idx + 1,
        text: text.trim(),
        done: false
      }));

    const newGoal = {
      id: `goal-${Date.now()}`,
      title: title.trim(),
      domain: domain,
      progress: 0,
      dueDate: dueDate,
      mentor: "Find a Mentor",
      milestones: validMilestones.length > 0 ? validMilestones : [
        { id: 1, text: "Read documentation & fundamentals", done: false },
        { id: 2, text: "Build proof of concept project", done: false }
      ]
    };

    onAddGoal(newGoal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600 rounded-xl">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Create New Learning Goal</h3>
              <p className="text-xs text-slate-400">Track milestones and pair with a volunteer mentor</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Goal Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master Docker & Containerization for Full Stack Apps"
              className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Domain
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="AI & Data">AI & Data</option>
                <option value="DevOps">DevOps & Cloud</option>
                <option value="Design">UI/UX Design</option>
                <option value="Career">Career & Interview</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Target Date
              </label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="e.g. Nov 30, 2026"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Milestones
              </label>
              <button
                type="button"
                onClick={addMilestoneField}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Milestone
              </button>
            </div>
            <div className="space-y-2">
              {milestones.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 w-4 text-center">{idx + 1}.</span>
                  <input
                    type="text"
                    value={m}
                    onChange={(e) => handleMilestoneChange(idx, e.target.value)}
                    placeholder={`Milestone ${idx + 1} (e.g. Understand Dockerfile layers)`}
                    className="flex-1 p-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                  {milestones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMilestoneField(idx)}
                      className="p-1 text-slate-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              Save Goal
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

