import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, Video, MessageSquare } from 'lucide-react';

export default function BookSessionModal({ mentor, onClose, onBookingConfirmed }) {
  const [sessionType, setSessionType] = useState('1-on-1 Code Review & Architecture');
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('6:30 PM IST');
  const [topic, setTopic] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!mentor) return null;

  const dates = [
    { label: 'Tomorrow', day: 'Wed, Oct 15' },
    { label: 'Thu, Oct 16', day: 'Thursday' },
    { label: 'Fri, Oct 17', day: 'Friday' },
    { label: 'Sat, Oct 18', day: 'Saturday' },
    { label: 'Sun, Oct 19', day: 'Sunday' },
  ];

  const timeSlots = [
    '10:00 AM IST',
    '2:30 PM IST',
    '5:00 PM IST',
    '6:30 PM IST',
    '8:00 PM IST'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      const newSession = {
        id: `sess-${Date.now()}`,
        mentorId: mentor.id,
        mentorName: mentor.name,
        mentorAvatar: mentor.avatar,
        mentorRole: `${mentor.role} @ ${mentor.company}`,
        topic: topic || 'General Mentorship & Code Guidance',
        date: selectedDate,
        time: selectedTime,
        status: 'Confirmed',
        sessionType: sessionType,
        meetLink: 'https://meet.google.com/skillbridge-session',
        prepNotes: topic ? `Focus: ${topic}` : 'General Q&A'
      };

      if (onBookingConfirmed) {
        onBookingConfirmed(newSession);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4">
            <img 
              src={mentor.avatar} 
              alt={mentor.name} 
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/30 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{mentor.name}</h3>
                <span className="bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  100% Free Volunteer
                </span>
              </div>
              <p className="text-indigo-100 text-xs mt-0.5">{mentor.role} • {mentor.company}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900">Session Booked Successfully!</h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your volunteer session with <strong className="text-slate-800">{mentor.name}</strong> is confirmed for <strong className="text-indigo-600">{selectedDate} at {selectedTime}</strong>.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left max-w-md mx-auto space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Video className="w-4 h-4 text-indigo-600" />
                Google Meet link has been added to your dashboard.
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                A calendar invite and preparation notes have been prepared.
              </div>
            </div>
            <div className="pt-2">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Session Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Mentorship Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  '1-on-1 Code Review & Architecture',
                  'Concept & Algorithm Breakdown',
                  'Career & Resume Guidance',
                  'Mock Technical Interview'
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSessionType(type)}
                    className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all ${
                      sessionType === type
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Date selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Date
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {dates.map((d) => (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => setSelectedDate(d.label)}
                    className={`px-3.5 py-2 shrink-0 rounded-xl border text-xs font-semibold transition-all text-center ${
                      selectedDate === d.label
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="text-[11px] font-bold">{d.label}</div>
                    <div className={`text-[10px] ${selectedDate === d.label ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {d.day}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Time Slot (IST)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-2 text-center rounded-xl border text-xs font-semibold transition-all ${
                      selectedTime === time
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic & Objectives */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                What would you like help with?
              </label>
              <textarea
                rows={3}
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. I am building a React app and struggling with state sharing between sibling components..."
                className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400"
              />
            </div>

            {/* Optional Project / Repo URL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                GitHub Repo or Demo Link (Optional)
              </label>
              <input
                type="url"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                placeholder="https://github.com/your-username/your-project"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Reserving Free Slot...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Confirm Free Session</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

