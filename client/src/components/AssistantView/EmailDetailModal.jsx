import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Archive, 
  CheckCircle, 
  Mail, 
  Sparkles, 
  Bot, 
  UserCheck, 
  BellOff, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  ExternalLink,
  ChevronRight,
  Shield,
  ArrowLeft,
  CheckSquare,
  Square
} from 'lucide-react';
import { ClassificationBadge, PriorityBadge } from '../common/Badge.jsx';
import ReplyComposer from './ReplyComposer.jsx';
import { useEmail } from '../../context/EmailContext.jsx';

export default function EmailDetailModal({ email, onClose }) {
  const { handleClassificationOverride, handleStatusChange, showToast } = useEmail();
  const [activeTab, setActiveTab] = useState('conversation'); // 'conversation' | 'composer'
  const [completedItems, setCompletedItems] = useState({});

  if (!email) return null;

  const toggleCheck = (idx) => {
    setCompletedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleOverride = (newCat) => {
    handleClassificationOverride(email.id, newCat, 'Manually reclassified by Sarah Jenkins (Assistant)');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div 
        className="bg-white w-full max-w-6xl max-h-[92vh] rounded-2xl shadow-elevated border border-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
              title="Close modal (Esc)"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                  {email.subject}
                </h2>
                <PriorityBadge priority={email.priority} />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span>From: <strong>{email.sender.name}</strong> ({email.sender.email})</span>
                <span>•</span>
                <span>To: Alexander Wright</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Header */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => handleStatusChange(email.id, { isStarred: !email.isStarred })}
              className={`p-2 rounded-lg border transition-colors ${
                email.isStarred 
                  ? 'bg-amber-50 text-amber-500 border-amber-200' 
                  : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600'
              }`}
              title={email.isStarred ? 'Starred' : 'Star this thread'}
            >
              <Star className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={() => handleStatusChange(email.id, { isHandled: !email.isHandled })}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border flex items-center gap-1.5 transition-colors ${
                email.isHandled 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{email.isHandled ? 'Handled' : 'Mark Handled'}</span>
            </button>

            <button
              onClick={() => { handleStatusChange(email.id, { isArchived: true }); onClose(); }}
              className="p-2 text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              title="Archive conversation"
            >
              <Archive className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Two Column Layout */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          
          {/* Main Column: Messages & Reply Composer (Cols 7 or 8) */}
          <div className="lg:col-span-7 xl:col-span-8 p-6 space-y-6 overflow-y-auto">
            
            {/* Conversation Thread Messages */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Conversation Thread ({email.messages?.length || 1} message{(email.messages?.length || 1) > 1 ? 's' : ''})
                </span>
                <span className="text-xs text-slate-400">
                  Received: {new Date(email.receivedAt).toLocaleString()}
                </span>
              </div>

              {email.messages?.map((msg, idx) => (
                <div key={msg.id || idx} className="rounded-xl border border-slate-200 bg-slate-50/40 p-5 shadow-xs">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 text-white font-semibold text-xs flex items-center justify-center">
                        {msg.senderName?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{msg.senderName}</h4>
                        <p className="text-xs text-slate-400">{msg.senderEmail}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">
                      {new Date(msg.receivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-line pl-11">
                    {msg.body}
                  </div>
                </div>
              ))}
            </div>

            {/* Smart Reply Composer Section */}
            <div className="pt-2">
              <ReplyComposer email={email} onReplySent={() => {}} />
            </div>

          </div>

          {/* Right Column: AI Intelligence & Insights Panel (Cols 5 or 4) */}
          <div className="lg:col-span-5 xl:col-span-4 p-6 bg-slate-50/50 space-y-5 overflow-y-auto">
            
            {/* Reply Responsibility Classification Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Reply Responsibility
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  AI Confidence: {Math.round((email.classification?.confidence || 0.9) * 100)}%
                </span>
              </div>

              <div className="mb-3">
                <ClassificationBadge
                  category={email.classification?.category}
                  confidence={email.classification?.confidence}
                  needsReview={email.classification?.needsReview}
                  size="md"
                />
              </div>

              {/* Confidence Bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    email.classification?.category === 'client_reply' 
                      ? 'bg-rose-500' 
                      : email.classification?.category === 'assistant_reply'
                        ? 'bg-indigo-600'
                        : 'bg-slate-400'
                  }`}
                  style={{ width: `${Math.round((email.classification?.confidence || 0.9) * 100)}%` }}
                />
              </div>

              {/* AI Rationale */}
              <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-3 border border-slate-200/60 mb-3">
                <p className="font-semibold text-slate-800 mb-1">Why this classification:</p>
                <p className="italic leading-relaxed">"{email.classification?.reason}"</p>
              </div>

              {/* Manual Override Controls */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] text-slate-400 mb-2 font-medium">Override AI Determination:</p>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => handleOverride('assistant_reply')}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded-lg border text-center transition-all ${
                      email.classification?.category === 'assistant_reply'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Assistant
                  </button>
                  <button
                    onClick={() => handleOverride('client_reply')}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded-lg border text-center transition-all ${
                      email.classification?.category === 'client_reply'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Client
                  </button>
                  <button
                    onClick={() => handleOverride('no_reply_needed')}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded-lg border text-center transition-all ${
                      email.classification?.category === 'no_reply_needed'
                        ? 'bg-slate-700 text-white border-slate-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    No Reply
                  </button>
                </div>
              </div>
            </div>

            {/* AI Executive TL;DR Summary */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-soft">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Executive TL;DR Summary
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {email.aiSummary?.tldr}
              </p>

              {email.aiSummary?.keyTakeaways?.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <h5 className="text-[11px] font-semibold text-slate-600 mb-2">Key Takeaways:</h5>
                  <ul className="space-y-1.5">
                    {email.aiSummary.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Extracted Action Items */}
            {email.aiSummary?.actionItems?.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-soft">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
                  Identified Action Items
                </h4>
                <div className="space-y-2">
                  {email.aiSummary.actionItems.map((item, idx) => {
                    const isDone = completedItems[idx] || item.completed;
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleCheck(idx)}
                        className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
                          isDone ? 'bg-slate-50 text-slate-400 line-through' : 'bg-slate-50/70 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="text-xs">
                          <p className="leading-snug">{item.text}</p>
                          <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded mt-1 inline-block ${
                            item.assignee === 'client' ? 'bg-rose-100 text-rose-800' : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            {item.assignee === 'client' ? 'Client' : 'Assistant'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Extracted Meeting / Appointment Widget */}
            {email.extractedMeeting && (
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 shadow-soft">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Extracted Calendar Event
                </div>
                <h5 className="text-xs font-bold text-slate-900 mb-1">
                  {email.extractedMeeting.title}
                </h5>
                <div className="text-xs text-slate-600 space-y-1 mb-3">
                  <p>📅 <strong>Date:</strong> {email.extractedMeeting.date}</p>
                  <p>⏰ <strong>Time:</strong> {email.extractedMeeting.time}</p>
                  <p>📍 <strong>Location:</strong> {email.extractedMeeting.location}</p>
                </div>
                <button
                  onClick={() => showToast('Calendar hold placed on Alexander’s schedule', 'success')}
                  className="w-full py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors border border-emerald-300"
                >
                  Place Calendar Hold
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
