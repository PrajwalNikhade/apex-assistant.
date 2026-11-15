import React from 'react';
import { 
  Inbox, 
  Bot, 
  UserCheck, 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import EmailList from './EmailList.jsx';
import UpcomingMeetings from './UpcomingMeetings.jsx';
import EmailDetailModal from './EmailDetailModal.jsx';
import { useEmail } from '../../context/EmailContext.jsx';

export default function AssistantDashboard() {
  const { 
    stats, 
    selectedCategory, 
    setSelectedCategory, 
    selectedEmail, 
    setSelectedEmail 
  } = useEmail();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner / Triage Snapshot */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-elevated relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 px-2.5 py-0.5 rounded-full border border-indigo-400/20">
                Executive Command Center
              </span>
              <span className="text-xs text-indigo-300">
                Managing: Alexander Wright's Communications
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
              Welcome back, Sarah
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/90 max-w-2xl leading-relaxed">
              AI classified <strong className="text-white">{stats.assistantToReply} emails</strong> for you to handle today, while <strong className="text-white">{stats.clientToReply} critical approvals</strong> are waiting in Alexander's executive queue.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedCategory('assistant_reply')}
              className="px-4 py-2 text-xs font-bold text-indigo-950 bg-white hover:bg-indigo-50 rounded-xl transition-all shadow-soft flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>Handle My Queue ({stats.assistantToReply})</span>
            </button>
            <button
              onClick={() => setSelectedCategory('client_reply')}
              className="px-4 py-2 text-xs font-bold text-rose-100 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 rounded-xl transition-all flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-rose-300" />
              <span>Client Review ({stats.clientToReply})</span>
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
          <p className="text-[11px] text-slate-400 mt-1">Scheduling, logistics & routine follow-ups</p>
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
          <p className="text-[11px] text-slate-400 mt-1">Valuation, board & high-stakes sign-offs</p>
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
              Triage Flag
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
          <p className="text-[11px] text-slate-400 mt-1">Calendar events extracted from emails</p>
        </div>

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
