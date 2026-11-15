import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronRight, Check } from 'lucide-react';
import { api } from '../../services/api.js';
import { useEmail } from '../../context/EmailContext.jsx';

export default function UpcomingMeetings() {
  const { selectedAccountId, showToast, handleSelectEmail, emails } = useEmail();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMeetings() {
      try {
        setLoading(true);
        const res = await api.fetchMeetings(selectedAccountId);
        if (res.success) {
          setMeetings(res.meetings);
        }
      } catch (e) {
        console.error('Failed to load meetings:', e);
      } finally {
        setLoading(false);
      }
    }
    loadMeetings();
  }, [selectedAccountId, emails]);

  if (meetings.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Upcoming Calendar Commitments</h3>
            <p className="text-xs text-slate-500">Identified and cross-referenced from incoming emails</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          {meetings.length} commitments detected
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {meetings.map((m, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-indigo-300 hover:shadow-soft transition-all duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{m.title}</h4>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {m.status?.replace('_', ' ') || 'Confirmed'}
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-600 mb-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{m.date} • {m.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{m.location}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const targetEmail = emails.find(e => e.id === m.emailId);
                if (targetEmail) handleSelectEmail(targetEmail);
              }}
              className="w-full mt-2 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <span>View Source Thread</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
