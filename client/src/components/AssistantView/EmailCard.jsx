import React, { useState } from 'react';
import { 
  Star, 
  Archive, 
  CheckCircle, 
  Mail, 
  MailOpen, 
  MoreHorizontal, 
  ArrowRight,
  Sparkles,
  Calendar,
  AlertTriangle,
  UserCheck,
  Bot,
  BellOff
} from 'lucide-react';
import { ClassificationBadge, PriorityBadge } from '../common/Badge.jsx';
import { useEmail } from '../../context/EmailContext.jsx';

export default function EmailCard({ email, isSelected, onClick }) {
  const { handleClassificationOverride, handleStatusChange } = useEmail();
  const [showOverrideMenu, setShowOverrideMenu] = useState(false);

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      const diffMs = Date.now() - date.getTime();
      const diffMins = Math.floor(diffMs / (60 * 1000));
      const diffHours = Math.floor(diffMs / (3600 * 1000));
      const diffDays = Math.floor(diffMs / (86400 * 1000));

      if (diffMins < 60) return `${Math.max(1, diffMins)}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'Yesterday';
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (e) {
      return '';
    }
  };

  const handleOverride = (e, newCategory) => {
    e.stopPropagation();
    setShowOverrideMenu(false);
    handleClassificationOverride(email.id, newCategory, `Manually updated by Sarah Jenkins (Assistant)`);
  };

  const toggleStar = (e) => {
    e.stopPropagation();
    handleStatusChange(email.id, { isStarred: !email.isStarred });
  };

  const toggleArchive = (e) => {
    e.stopPropagation();
    handleStatusChange(email.id, { isArchived: !email.isArchived });
  };

  const toggleHandled = (e) => {
    e.stopPropagation();
    handleStatusChange(email.id, { isHandled: !email.isHandled });
  };

  return (
    <div
      onClick={onClick}
      className={`group relative rounded-xl border transition-all duration-150 cursor-pointer p-4 ${
        isSelected
          ? 'bg-indigo-50/40 border-indigo-300 ring-2 ring-indigo-500/20 shadow-soft'
          : !email.isRead
            ? 'bg-white border-slate-200/90 shadow-xs hover:border-indigo-200 hover:shadow-soft'
            : 'bg-slate-50/60 border-slate-200/60 opacity-90 hover:opacity-100 hover:bg-white hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        {/* Sender Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative">
            <img
              src={email.sender.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
              alt={email.sender.name}
              className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 flex-shrink-0"
            />
            {!email.isRead && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-indigo-600 rounded-full ring-2 ring-white" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={`text-sm truncate ${!email.isRead ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                {email.sender.name}
              </h3>
              {email.sender.company && (
                <span className="text-[11px] text-slate-400 font-normal truncate hidden sm:inline">
                  • {email.sender.company}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 truncate">{email.sender.email}</p>
          </div>
        </div>

        {/* Timestamp & Hover Quick Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-xs text-slate-400 group-hover:hidden">
            {formatTime(email.receivedAt)}
          </span>

          <div className="hidden group-hover:flex items-center gap-1 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-lg border border-slate-200 shadow-xs">
            <button
              onClick={toggleStar}
              title={email.isStarred ? "Unstar" : "Star email"}
              className={`p-1 rounded hover:bg-slate-100 transition-colors ${email.isStarred ? 'text-amber-500' : 'text-slate-400'}`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
            </button>
            <button
              onClick={toggleHandled}
              title={email.isHandled ? "Mark as unhandled" : "Mark as handled"}
              className={`p-1 rounded hover:bg-slate-100 transition-colors ${email.isHandled ? 'text-emerald-600' : 'text-slate-400'}`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={toggleArchive}
              title="Archive conversation"
              className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Archive className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Subject Line & Priority */}
      <div className="flex items-center gap-2 mb-1.5">
        <h4 className={`text-sm tracking-tight truncate ${!email.isRead ? 'font-semibold text-slate-900' : 'font-medium text-slate-800'}`}>
          {email.subject}
        </h4>
        <PriorityBadge priority={email.priority} />
        {email.extractedMeeting && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200/60">
            <Calendar className="w-3 h-3 text-emerald-600" />
            <span className="hidden sm:inline">Invite</span>
          </span>
        )}
      </div>

      {/* Snippet Preview */}
      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
        {email.snippet}
      </p>

      {/* AI Intelligence Footer: Category Badge, Confidence & AI Reason */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-100/80">
        <div className="flex items-center gap-2 flex-wrap">
          <ClassificationBadge
            category={email.classification?.category}
            confidence={email.classification?.confidence}
            needsReview={email.classification?.needsReview}
            size="sm"
          />

          {email.delegatedToAssistant && (
            <span className="text-[10px] font-medium bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
              Delegated by Client
            </span>
          )}

          {email.classification?.overriddenBy && (
            <span className="text-[10px] text-slate-400 italic">
              (Overridden by {email.classification.overriddenBy})
            </span>
          )}
        </div>

        {/* Change classification dropdown */}
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setShowOverrideMenu(!showOverrideMenu); }}
            className="text-[11px] text-slate-400 hover:text-indigo-600 font-medium px-2 py-0.5 rounded hover:bg-indigo-50/50 transition-colors flex items-center gap-1"
          >
            <span>Change</span>
            <MoreHorizontal className="w-3 h-3" />
          </button>

          {showOverrideMenu && (
            <>
              <div 
                className="fixed inset-0 z-20" 
                onClick={(e) => { e.stopPropagation(); setShowOverrideMenu(false); }} 
              />
              <div className="absolute right-0 bottom-full mb-1 w-52 bg-white rounded-xl shadow-elevated border border-slate-200 py-1 z-30">
                <div className="px-3 py-1 border-b border-slate-100">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Override Classification</p>
                </div>
                <button
                  onClick={(e) => handleOverride(e, 'assistant_reply')}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 text-left"
                >
                  <Bot className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Assistant to Reply</span>
                </button>
                <button
                  onClick={(e) => handleOverride(e, 'client_reply')}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-rose-50 hover:text-rose-700 text-left"
                >
                  <UserCheck className="w-3.5 h-3.5 text-rose-600" />
                  <span>Client to Reply</span>
                </button>
                <button
                  onClick={(e) => handleOverride(e, 'no_reply_needed')}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 text-left"
                >
                  <BellOff className="w-3.5 h-3.5 text-slate-500" />
                  <span>No Reply Needed</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* AI Rationale Summary Callout */}
      {email.classification?.reason && (
        <div className="mt-2 text-[11px] text-slate-600 bg-slate-50/80 rounded-lg p-2 border border-slate-200/50 flex items-start gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
          <p className="line-clamp-1 italic">
            <span className="font-medium text-slate-700 not-italic">AI Reasoning:</span> {email.classification.reason}
          </p>
        </div>
      )}
    </div>
  );
}
