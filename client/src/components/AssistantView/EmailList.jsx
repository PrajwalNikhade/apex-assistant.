import React from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  Bot, 
  UserCheck, 
  BellOff, 
  AlertTriangle, 
  CheckCircle2, 
  Star, 
  Calendar,
  X,
  SlidersHorizontal
} from 'lucide-react';
import EmailCard from './EmailCard.jsx';
import { useEmail } from '../../context/EmailContext.jsx';

export default function EmailList() {
  const { 
    emails, 
    stats, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    selectedEmail,
    handleSelectEmail,
    isLoading
  } = useEmail();

  const segments = [
    { id: 'all', label: 'All Inboxes', count: stats.total, icon: Inbox },
    { id: 'assistant_reply', label: 'Assistant to Reply', count: stats.assistantToReply, icon: Bot, color: 'text-indigo-600' },
    { id: 'client_reply', label: 'Client to Reply', count: stats.clientToReply, icon: UserCheck, color: 'text-rose-600' },
    { id: 'no_reply_needed', label: 'No Reply Needed', count: stats.noReplyNeeded, icon: BellOff, color: 'text-slate-500' },
    { id: 'needs_review', label: 'Needs Review', count: stats.needsReview, icon: AlertTriangle, color: 'text-amber-500' },
    { id: 'action_required', label: 'Action Required', count: stats.actionRequired, icon: CheckCircle2, color: 'text-emerald-600' },
    { id: 'meetings', label: 'Meetings', count: stats.meetings, icon: Calendar, color: 'text-teal-600' },
    { id: 'starred', label: 'Starred', count: stats.starred, icon: Star, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar & Filter Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-4 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search emails by sender, subject, keywords or AI tags..."
            className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-slate-400 font-medium">
            Showing {emails.length} conversation{emails.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Horizontal Segmentation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {segments.map((seg) => {
          const Icon = seg.icon;
          const isActive = selectedCategory === seg.id;
          return (
            <button
              key={seg.id}
              onClick={() => setSelectedCategory(seg.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-soft ring-1 ring-indigo-500'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 shadow-xs'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : seg.color || 'text-slate-500'}`} />
              <span>{seg.label}</span>
              <span className={`px-1.5 py-0.2 text-[11px] rounded-full font-bold ${
                isActive ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {seg.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Email Card Stream */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 animate-pulse space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-200" />
                <div className="space-y-1.5 flex-1">
                  <div className="w-32 h-3.5 bg-slate-200 rounded" />
                  <div className="w-48 h-2.5 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="w-3/4 h-3 bg-slate-200 rounded" />
              <div className="w-full h-2.5 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      ) : emails.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
            <Inbox className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 mb-1">No conversations found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            No emails match the active filter or search criteria. Try switching segments or reset the search query.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 px-3 py-1.5 bg-indigo-50 rounded-lg transition-colors"
          >
            Clear Filters & View All
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {emails.map((email) => (
            <EmailCard
              key={email.id}
              email={email}
              isSelected={selectedEmail?.id === email.id}
              onClick={() => handleSelectEmail(email)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
