import React, { useState, useEffect } from 'react';
import { X, Send, Paperclip, Smile, Video } from 'lucide-react';
import { api } from '../services/api';

export default function ChatModal({ mentor, initialMessages = [], onClose, onBookSession }) {
  const [messages, setMessages] = useState(
    initialMessages.length > 0
      ? initialMessages
      : [
          {
            sender: mentor.name,
            time: "Just now",
            text: `Hi there! Thanks for reaching out. How can I help you with your learning goals today?`
          }
        ]
  );
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    if (mentor?.id) {
      api.getMessages(mentor.id)
        .then(res => {
          if (res?.data && res.data.length > 0) {
            setMessages(res.data);
          }
        })
        .catch(() => {});
    }
  }, [mentor?.id]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    const userMsg = {
      sender: "You",
      time: "Just now",
      text: userText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    try {
      await api.sendMessage(mentor.id, userMsg);
    } catch (err) {
      // offline fallback
    }

    // Simulate mentor quick reply
    setTimeout(async () => {
      const mentorReply = {
        sender: mentor.name,
        time: "Just now",
        text: `Got your message! Let's schedule a session to walk through this together in real-time.`
      };
      setMessages(prev => [...prev, mentorReply]);

      try {
        await api.sendMessage(mentor.id, mentorReply);
      } catch (err) {
        // offline fallback
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[560px]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={mentor.avatar} 
                alt={mentor.name} 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500" 
              />
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute bottom-0 right-0 ring-2 ring-slate-900"></span>
            </div>
            <div>
              <h4 className="font-bold text-sm leading-tight">{mentor.name}</h4>
              <p className="text-[11px] text-slate-400">{mentor.role} • <span className="text-emerald-400">Online</span></p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                if (onBookSession) onBookSession(mentor);
              }}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Video className="w-3.5 h-3.5" />
              Book Meet
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
          <div className="text-center my-2">
            <span className="text-[10px] bg-slate-200/70 text-slate-600 font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Mentorship Chat
            </span>
          </div>

          {messages.map((m, idx) => {
            const isUser = m.sender === "You" || m.sender === "Tharun D S";
            return (
              <div 
                key={idx} 
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[11px] font-semibold text-slate-700">
                    {m.sender}
                  </span>
                  <span className="text-[9px] text-slate-400">{m.time}</span>
                </div>
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs shadow-xs leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-br-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={`Message ${mentor.name.split(' ')[0]}...`}
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}

