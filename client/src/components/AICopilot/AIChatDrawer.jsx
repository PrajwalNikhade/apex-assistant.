import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Send, 
  Sparkles, 
  CornerDownLeft, 
  RefreshCw, 
  UserCheck, 
  Calendar, 
  Clock, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { api } from '../../services/api.js';
import { useEmail } from '../../context/EmailContext.jsx';
import { useViewMode } from '../../context/ViewModeContext.jsx';

export default function AIChatDrawer({ isOpen, onClose }) {
  const { emails, selectedEmail, handleSelectEmail } = useEmail();
  const { viewMode } = useViewMode();
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello Sarah! I am your Executive Email Co-Pilot. I monitor all connected client inboxes, triage reply responsibility, and extract deadlines.

How can I help you manage Alexander's communications today?`,
      followUps: [
        'Which emails require the client’s attention?',
        'Show emails assigned to me (Assistant)',
        'What am I waiting for a response on?',
        'Show upcoming meetings this week'
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (queryText = inputQuery) => {
    const q = queryText.trim();
    if (!q || isLoading) return;

    // Add user query to conversation
    const userMsg = { id: `usr-${Date.now()}`, sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await api.askAI(q, selectedEmail?.id, viewMode);
      if (res.success) {
        const aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: res.answer,
          relevantEmailIds: res.relevantEmailIds || [],
          followUps: res.suggestedFollowUps || []
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { id: `err-${Date.now()}`, sender: 'ai', text: 'Sorry, I encountered an issue processing your query.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenRelevantEmail = (emailId) => {
    const email = emails.find(e => e.id === emailId);
    if (email) {
      handleSelectEmail(email);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">AI Inbox Co-Pilot</h3>
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Active
                </span>
              </div>
              <p className="text-xs text-indigo-200/80">Context-aware inbox intelligence</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                    : 'bg-slate-100/90 text-slate-800 rounded-bl-none border border-slate-200/60'
                }`}
              >
                <div className="whitespace-pre-line font-sans">
                  {msg.text}
                </div>

                {/* Relevant Email Link Pills */}
                {msg.relevantEmailIds && msg.relevantEmailIds.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Referenced Conversations:</p>
                    {msg.relevantEmailIds.map(eid => {
                      const emailObj = emails.find(e => e.id === eid);
                      if (!emailObj) return null;
                      return (
                        <button
                          key={eid}
                          onClick={() => handleOpenRelevantEmail(eid)}
                          className="w-full text-left text-[11px] font-semibold text-indigo-700 bg-white hover:bg-indigo-50 border border-slate-200 p-2 rounded-lg transition-colors flex items-center justify-between group"
                        >
                          <span className="truncate max-w-[240px]">
                            {emailObj.subject}
                          </span>
                          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 flex-shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Follow-up Prompts */}
              {msg.followUps && msg.followUps.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                  {msg.followUps.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(prompt)}
                      className="text-[11px] font-medium text-slate-600 bg-white hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 px-2.5 py-1 rounded-full transition-all text-left shadow-2xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-2xl rounded-bl-none text-xs text-slate-500 max-w-[70%]">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              <span>Analyzing inboxes and computing context...</span>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex-shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything about Alexander's emails..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow-soft transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
