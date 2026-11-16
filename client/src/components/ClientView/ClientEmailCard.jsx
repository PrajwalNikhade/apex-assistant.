import React, { useState } from 'react';
import { 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  SendHorizontal, 
  Sparkles, 
  MessageSquare, 
  FileText,
  CornerDownRight,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Mic,
  Volume2
} from 'lucide-react';
import { PriorityBadge } from '../common/Badge.jsx';
import { useEmail } from '../../context/EmailContext.jsx';

export default function ClientEmailCard({ email, onOpenReader }) {
  const { handleDelegate, handleStatusChange, showToast } = useEmail();
  const [showDelegateInput, setShowDelegateInput] = useState(false);
  const [delegateNotes, setDelegateNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDictating, setIsDictating] = useState(false);

  const handleQuickDelegate = async () => {
    try {
      setIsSubmitting(true);
      await handleDelegate(email.id, delegateNotes || 'Sarah, please take care of this.');
      setShowDelegateInput(false);
      setDelegateNotes('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSimulateDictation = () => {
    setIsDictating(true);
    let note = "Sarah, please approve the valuation terms and tell them I'll sign the final closing documents Friday.";
    if (email.subject.includes('David Lin') || email.subject.includes('Product')) {
      note = "Sarah, tell Elena to proceed with the $320k offer and lock David Lin before Datadog's deadline.";
    } else if (email.subject.includes('NeuroGenomics')) {
      note = "Sarah, confirm the 20% option pool allocation and have outside counsel send signature pages.";
    }
    
    setTimeout(() => {
      setDelegateNotes(note);
      setIsDictating(false);
      showToast('Voice memo transcribed successfully', 'info');
    }, 600);
  };

  const handleMarkHandled = async () => {
    await handleStatusChange(email.id, { isHandled: true });
    showToast('Marked as handled and archived from your attention queue', 'success');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-soft transition-all duration-200">
      
      {/* Top Header: Sender & Date */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={email.sender.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"}
            alt={email.sender.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 flex-shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 truncate">{email.sender.name}</h3>
              {email.sender.company && (
                <span className="text-xs text-slate-400 font-medium truncate">({email.sender.company})</span>
              )}
            </div>
            <p className="text-xs text-slate-400 truncate">{email.sender.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <PriorityBadge priority={email.priority} />
          <span className="text-xs text-slate-400">
            {new Date(email.receivedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Subject Line */}
      <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-3">
        {email.subject}
      </h2>

      {/* Primary Highlight Box: Why Your Attention is Needed */}
      <div className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-3.5 sm:p-4 mb-4">
        <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider mb-1">
          <UserCheck className="w-4 h-4 text-rose-600" />
          <span>Why your attention is needed</span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-rose-950 leading-relaxed">
          {email.classification?.reason}
        </p>
      </div>

      {/* Short AI Summary */}
      <div className="bg-slate-50/80 rounded-2xl p-3.5 mb-5 border border-slate-200/60">
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>AI Executive Summary</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-sans">
          {email.aiSummary?.tldr || email.snippet}
        </p>
      </div>

      {/* Quick Delegation Input (When toggled) */}
      {showDelegateInput && (
        <div className="mb-4 p-4 bg-indigo-50/60 rounded-2xl border border-indigo-200/80 animate-fade-in space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-indigo-950">
              Instructions for Sarah (Executive Assistant):
            </label>
            <button
              onClick={handleSimulateDictation}
              disabled={isDictating}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-white hover:bg-indigo-100 border border-indigo-200 px-2 py-0.5 rounded-lg transition-colors"
            >
              <Mic className={`w-3 h-3 text-indigo-600 ${isDictating ? 'animate-bounce' : ''}`} />
              <span>{isDictating ? 'Transcribing...' : '🎙️ Dictate Voice Memo'}</span>
            </button>
          </div>

          <textarea
            rows={2}
            value={delegateNotes}
            onChange={(e) => setDelegateNotes(e.target.value)}
            placeholder="e.g. 'Sarah, approve the $130M collar and push for 2 founder board seats'..."
            className="w-full text-xs p-2.5 rounded-xl border border-indigo-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={() => setShowDelegateInput(false)}
              className="text-xs text-slate-500 hover:text-slate-700 px-3 py-1 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleQuickDelegate}
              disabled={isSubmitting}
              className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <SendHorizontal className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Delegating...' : 'Hand Over to Sarah'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Executive Action Bar: 3 Simple Options */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <button
          onClick={onOpenReader}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 py-1.5 px-3 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
          <span>Read Full Thread</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Hand over to Assistant */}
          <button
            onClick={() => setShowDelegateInput(!showDelegateInput)}
            className="px-3.5 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 rounded-xl transition-all shadow-2xs flex items-center gap-1.5"
          >
            <CornerDownRight className="w-3.5 h-3.5" />
            <span>Hand Over to Assistant</span>
          </button>

          {/* Mark as Handled */}
          <button
            onClick={handleMarkHandled}
            className="px-3.5 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-all shadow-2xs flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Mark Handled</span>
          </button>
        </div>
      </div>

    </div>
  );
}
