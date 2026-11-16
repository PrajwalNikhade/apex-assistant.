import React, { useState } from 'react';
import { 
  UserCheck, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Bot,
  Calendar,
  Clock,
  Layers,
  ChevronDown
} from 'lucide-react';
import ClientEmailCard from './ClientEmailCard.jsx';
import EmailDetailModal from '../AssistantView/EmailDetailModal.jsx';
import { useEmail } from '../../context/EmailContext.jsx';
import { useViewMode } from '../../context/ViewModeContext.jsx';

export default function ClientDashboard() {
  const { emails, stats, clients, selectedClientId, setSelectedClientId } = useEmail();
  const { setViewMode } = useViewMode();
  const [selectedThread, setSelectedThread] = useState(null);
  const [showClientPicker, setShowClientPicker] = useState(false);

  // Active client object
  const activeClient = clients.find(c => c.id === selectedClientId) || clients[0] || {
    name: 'Alexander Wright',
    role: 'Founder & CEO, Apex Holdings',
    email: 'alexander.wright@apexholdings.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    company: 'Apex Holdings'
  };

  // Filter ONLY items requiring client decision and not yet marked handled
  const clientEmails = emails.filter(
    e => e.classification?.category === 'client_reply' && !e.isHandled && !e.isArchived
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Executive Clean Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          
          {/* Profile with multi-client picker */}
          <div className="flex items-center gap-3 relative">
            <img
              src={activeClient.avatar}
              alt={activeClient.name}
              className="w-12 h-12 rounded-full ring-2 ring-rose-500/20 object-cover shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {activeClient.name}
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                  Client View
                </span>
                {clients.length > 1 && (
                  <button
                    onClick={() => setShowClientPicker(!showClientPicker)}
                    className="text-xs text-slate-400 hover:text-slate-600 p-1"
                    title="Switch client profile"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500">{activeClient.role} • {activeClient.email}</p>

              {/* Client Picker Dropdown */}
              {showClientPicker && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowClientPicker(false)} />
                  <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-elevated border border-slate-200 py-1.5 z-20 animate-scale-up">
                    <div className="px-3 py-1.5 border-b border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Executive Persona</p>
                    </div>
                    {clients.map(c => (
                      <button
                        key={c.id}
                        onClick={() => { setSelectedClientId(c.id); setShowClientPicker(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-50 ${
                          activeClient.id === c.id ? 'font-semibold text-rose-600 bg-rose-50/50' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <img src={c.avatar} alt={c.name} className="w-6 h-6 rounded-full object-cover" />
                          <div className="truncate">
                            <p className="font-semibold text-slate-900 truncate">{c.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{c.company}</p>
                          </div>
                        </div>
                        <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded-full font-bold">
                          {c.clientActionCount} action
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => setViewMode('assistant')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 px-3 py-2 rounded-xl border border-slate-200 transition-colors self-start sm:self-auto shadow-2xs"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-600" />
            <span>Switch to Assistant View (Sarah)</span>
          </button>
        </div>

        {/* Status Callout */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">
              {clientEmails.length > 0 
                ? `You have ${clientEmails.length} high-priority email${clientEmails.length === 1 ? '' : 's'} requiring your direct decision`
                : 'All clear — Zero emails require your personal decision'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              AI automatically filters out routine scheduling, vendor invoices, and informational newsletters, routing them to Sarah Jenkins so you only see what truly matters.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="px-3.5 py-1.5 bg-indigo-50 border border-indigo-200/80 rounded-xl text-center">
              <p className="text-xs font-semibold text-indigo-900">{stats.assistantToReply} with Sarah</p>
              <p className="text-[10px] text-indigo-600 font-medium">Assistant Handling</p>
            </div>
            <div className="px-3.5 py-1.5 bg-rose-50 border border-rose-200/80 rounded-xl text-center">
              <p className="text-xs font-semibold text-rose-900">{clientEmails.length} for You</p>
              <p className="text-[10px] text-rose-600 font-medium">Action Required</p>
            </div>
          </div>
        </div>
      </div>

      {/* Client Inbox List */}
      {clientEmails.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Your Executive Inbox is Clear!</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
            There are no high-stakes decisions, valuation approvals, or executive authorizations pending your review. Sarah Jenkins is handling routine communications.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setViewMode('assistant')}
              className="text-xs font-semibold px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-soft hover:bg-indigo-700 transition-colors"
            >
              Open Assistant Command Center
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {clientEmails.map(email => (
            <ClientEmailCard
              key={email.id}
              email={email}
              onOpenReader={() => setSelectedThread(email)}
            />
          ))}
        </div>
      )}

      {/* Reader Modal */}
      {selectedThread && (
        <EmailDetailModal
          email={selectedThread}
          onClose={() => setSelectedThread(null)}
        />
      )}

    </div>
  );
}
