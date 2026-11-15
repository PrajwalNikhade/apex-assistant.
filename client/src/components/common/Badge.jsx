import React from 'react';
import { Bot, UserCheck, BellOff, AlertTriangle, Clock, Calendar, CheckCircle2 } from 'lucide-react';

export function ClassificationBadge({ category, confidence, needsReview, size = 'md', showConfidence = true }) {
  const isSmall = size === 'sm';

  if (category === 'client_reply') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${
        isSmall ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      } bg-rose-50 text-rose-700 border border-rose-200/80 shadow-sm`}>
        <UserCheck className={isSmall ? "w-3 h-3 text-rose-600" : "w-3.5 h-3.5 text-rose-600"} />
        <span>Client to Reply</span>
        {showConfidence && confidence && (
          <span className="text-[10px] bg-rose-100/70 text-rose-800 px-1.5 py-0.2 rounded-full font-semibold">
            {Math.round(confidence * 100)}%
          </span>
        )}
      </span>
    );
  }

  if (category === 'assistant_reply') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${
        isSmall ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      } bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-sm`}>
        <Bot className={isSmall ? "w-3 h-3 text-indigo-600" : "w-3.5 h-3.5 text-indigo-600"} />
        <span>Assistant to Reply</span>
        {showConfidence && confidence && (
          <span className="text-[10px] bg-indigo-100/70 text-indigo-800 px-1.5 py-0.2 rounded-full font-semibold">
            {Math.round(confidence * 100)}%
          </span>
        )}
      </span>
    );
  }

  if (category === 'no_reply_needed') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${
        isSmall ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      } bg-slate-100 text-slate-600 border border-slate-200 shadow-sm`}>
        <BellOff className={isSmall ? "w-3 h-3 text-slate-500" : "w-3.5 h-3.5 text-slate-500"} />
        <span>No Reply Needed</span>
      </span>
    );
  }

  if (needsReview) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${
        isSmall ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      } bg-amber-50 text-amber-800 border border-amber-300 shadow-sm animate-pulse`}>
        <AlertTriangle className={isSmall ? "w-3 h-3 text-amber-600" : "w-3.5 h-3.5 text-amber-600"} />
        <span>Needs Review</span>
      </span>
    );
  }

  return null;
}

export function PriorityBadge({ priority }) {
  if (priority === 'urgent') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded bg-red-100 text-red-800 border border-red-200">
        URGENT
      </span>
    );
  }
  if (priority === 'high') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded bg-amber-100 text-amber-800 border border-amber-200">
        High
      </span>
    );
  }
  return null;
}
