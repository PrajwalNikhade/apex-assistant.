import React, { useState } from 'react';
import { 
  Inbox, 
  Bot, 
  UserCheck, 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  Sparkles,
  Search,
  Send,
  Zap,
  Users
} from 'lucide-react';
import EmailList from './EmailList.jsx';
import UpcomingMeetings from './UpcomingMeetings.jsx';
import EmailDetailModal from './EmailDetailModal.jsx';
import { useEmail } from '../../context/EmailContext.jsx';
import { api } from '../../services/api.js';

export default function AssistantDashboard({ onOpenAIChat }) {
  const { 
    stats, 
    clients,
    selectedClientId,
    setSelectedClientId,
    selectedCategory, 
    setSelectedCategory, 
    selectedEmail, 
    setSelectedEmail,
    groqApiKey,
    showToast
  } = useEmail();

  const [aiQuery, setAiQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState(null);
  const [isQuerying, setIsQuerying] = useState(false);

  const activeClient = clients.find(c => c.id === selectedClientId);

  const quickQueries = [
    "Which emails require the client's decision?",
    "Show tasks assigned to me (Assistant)",
    "What am I waiting on?",
    "Summarize upcoming meetings this week"
  ];

  const handleRunAiQuery = async (queryText = aiQuery) => {
    const q = (queryText || '').trim();
    if (!q || isQuerying) return;

    try {
      setIsQuerying(true);
      const res = await api.askAI(q, null, 'assistant', groqApiKey);
      if (res.success) {
        setAiAnswer({
          query: q,
          text: res.answer,
          modelUsed: res.modelUsed || 'Apex Neural Engine'
        });
      }
    } catch (e) {
      showToast('Error querying AI', 'error');
    } finally {
      setIsQuerying(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner / Triage Snapshot */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 sm:p-7 text-white shadow-elevated relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 px-2.5 py-0.5 rounded-full border border-indigo-400/20">
                Executive Assistant Hub
              </span>
              <span className="text-xs text-indigo-300 font-medium">
                Active Client: <strong className="text-white">{selectedClientId === 'all' ? 'All Clients (Merged)' : activeClient?.name}</strong>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
              Welcome back, Sarah
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/90 max-w-2xl leading-relaxed">
              AI classified <strong className="text-white">{stats.assistantToReply} emails</strong> for you to handle, while <strong className="text-white">{stats.clientToReply} critical approvals</strong> are waiting in client review queues.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setSelectedCategory('assistant_reply')}
              className="px-4 py-2 text-xs font-bold text-indigo-950 bg-white hover:bg-indigo-50 rounded-xl transition-all shadow-soft flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>Assistant Queue ({stats.assistantToReply})</span>
            </button>
            <button
              onClick={() => setSelectedCategory('client_reply')}
              className="px-4 py-2 text-xs font-bold text-rose-100 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 rounded-xl transition-all flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-rose-300" />
              <span>Client Queue ({stats.clientToReply})</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Assistant to Reply */}
        <div
          onClick={() => setSelectedCategory('assistant_reply')}
          className={`p-4 rounded-2xl border transition-all duration-150 cursor-pointer ${
            selectedCategory === 'assistant_reply'
              ? 'bg-indigo-50/80 border-indigo-400 shadow-soft ring-2 ring-indigo-500/20'
              : 'bg-white border-slate-200/80 hover:border-indigo-300 hover:shadow-soft'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 flex items-center">
              Actionable
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">{stats.assistantToReply}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Assistant to Reply</p>
          <p className="text-[11px] text-slate-400 mt-1">Scheduling, logistics & vendor contracts</p>
        </div>

        {/* Card 2: Client to Reply */}
        <div
          onClick={() => setSelectedCategory('client_reply')}
          className={`p-4 rounded-2xl border transition-all duration-150 cursor-pointer ${
            selectedCategory === 'client_reply'
              ? 'bg-rose-50/80 border-rose-400 shadow-soft ring-2 ring-rose-500/20'
              : 'bg-white border-slate-200/80 hover:border-rose-300 hover:shadow-soft'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-rose-600 flex items-center">
              Executive
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">{stats.clientToReply}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Client to Reply</p>
          <p className="text-[11px] text-slate-400 mt-1">Term sheets, compensation & board approvals</p>
        </div>

        {/* Card 3: Needs Review */}
        <div
          onClick={() => setSelectedCategory('needs_review')}
          className={`p-4 rounded-2xl border transition-all duration-150 cursor-pointer ${
            selectedCategory === 'needs_review'
              ? 'bg-amber-50/80 border-amber-400 shadow-soft ring-2 ring-amber-500/20'
              : 'bg-white border-slate-200/80 hover:border-amber-300 hover:shadow-soft'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-amber-600 flex items-center">
              Flagged
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">{stats.needsReview}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Flagged for Review</p>
          <p className="text-[11px] text-slate-400 mt-1">Low AI confidence or ambiguous intent</p>
        </div>

        {/* Card 4: Upcoming Meetings */}
        <div
          onClick={() => setSelectedCategory('meetings')}
          className={`p-4 rounded-2xl border transition-all duration-150 cursor-pointer ${
            selectedCategory === 'meetings'
              ? 'bg-emerald-50/80 border-emerald-400 shadow-soft ring-2 ring-emerald-500/20'
              : 'bg-white border-slate-200/80 hover:border-emerald-300 hover:shadow-soft'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center">
              Calendar
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">{stats.meetings}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Meetings & Invites</p>
          <p className="text-[11px] text-slate-400 mt-1">Calendar commitments extracted from emails</p>
        </div>

      </div>

      {/* Instant AI Email Query Box (Highlighting the AI Querying requirement from Loom video) */}
      <div className="bg-white rounded-2xl border border-indigo-100 shadow-soft p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                AI Email Query Engine
              </h3>
              <p className="text-[11px] text-slate-400">
                Ask anything about connected emails, reply responsibilities, or obligations
              </p>
            </div>
          </div>
          {groqApiKey && (
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
              Live Groq LLM Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunAiQuery()}
              placeholder="e.g. 'Which emails need executive input today?' or 'Summarize Bloomberg dinner reschedule'..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={() => handleRunAiQuery()}
            disabled={isQuerying || !aiQuery.trim()}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-soft transition-all flex items-center gap-1.5 flex-shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isQuerying ? 'Querying...' : 'Ask AI'}</span>
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
          <span className="text-[10px] text-slate-400 font-medium">Quick queries:</span>
          {quickQueries.map((q, i) => (
            <button
              key={i}
              onClick={() => { setAiQuery(q); handleRunAiQuery(q); }}
              className="text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 px-2.5 py-1 rounded-full transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* AI Answer Display */}
        {aiAnswer && (
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-indigo-100 animate-fade-in relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                <Bot className="w-3.5 h-3.5" />
                <span>AI Response ({aiAnswer.modelUsed})</span>
              </span>
              <button
                onClick={() => setAiAnswer(null)}
                className="text-[11px] text-slate-400 hover:text-slate-600"
              >
                Dismiss
              </button>
            </div>
            <div className="text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-line">
              {aiAnswer.text}
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Meetings Calendar Section */}
      <UpcomingMeetings />

      {/* Main Email Stream */}
      <EmailList />

      {/* Email Thread Detail Modal */}
      {selectedEmail && (
        <EmailDetailModal
          email={selectedEmail}
          onClose={() => setSelectedEmail(null)}
        />
      )}

    </div>
  );
}
