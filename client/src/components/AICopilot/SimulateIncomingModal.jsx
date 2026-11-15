import React, { useState } from 'react';
import { 
  X, 
  Zap, 
  Sparkles, 
  Bot, 
  UserCheck, 
  BellOff, 
  AlertTriangle, 
  Send,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { useEmail } from '../../context/EmailContext.jsx';

export default function SimulateIncomingModal({ isOpen, onClose }) {
  const { handleSimulateInbound, handleSelectEmail } = useEmail();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [analyzedEmail, setAnalyzedEmail] = useState(null);

  if (!isOpen) return null;

  const presets = [
    {
      title: "Client to Reply (Term Sheet Sign-off)",
      type: "client",
      badge: "CEO Decision",
      subject: "Urgent: Benchmark Capital Term Sheet Sign-off for $15M Tranche",
      body: "Alexander,\n\nOur partnership met this morning and we are ready to lead the $15M tranche at a $135M valuation cap. We need your direct written approval on the attached governance rider before 5:00 PM today so we can issue wire instructions.\n\nPlease confirm.\n\nPeter Fenton\nBenchmark Capital",
      senderName: "Peter Fenton",
      senderEmail: "pfenton@benchmark.com"
    },
    {
      title: "Assistant to Reply (Interview Scheduling)",
      type: "assistant",
      badge: "Scheduling",
      subject: "TechCrunch Interview Request: 30-min Zoom next Wednesday",
      body: "Hi Alexander and team,\n\nI'm writing a feature on next-gen executive AI assistants and would love to interview you for 20-30 minutes next Wednesday afternoon between 2:00 PM and 4:30 PM EST.\n\nCould Sarah let me know if there is an open slot on your calendar?\n\nBest,\nAlex Wilhelm\nTechCrunch",
      senderName: "Alex Wilhelm",
      senderEmail: "alex.wilhelm@techcrunch.com"
    },
    {
      title: "No Reply Needed (Automated Digest)",
      type: "no_reply",
      badge: "Automated",
      subject: "GitHub Security Advisory: Dependabot Alert (Low Severity)",
      body: "This is an automated notification from GitHub Security.\n\nOne low-severity dependency in apex-core repository was automatically patched in PR #412.\n\nNo manual response or action is required from your team.",
      senderName: "GitHub Security Team",
      senderEmail: "notifications@github.com"
    },
    {
      title: "Flagged for Review (Ambiguous Intent)",
      type: "review",
      badge: "Ambiguous",
      subject: "Dinner next week? Also wanted your thoughts on the secondary offer",
      body: "Hey Alex,\n\nAre you free for dinner in Tribeca next Tuesday or Wednesday? Also wanted to ask whether you think we should accept the secondary tender offer from Tiger at $95/share. Let me know what you think.\n\nCheers,\nDave",
      senderName: "Dave Morin",
      senderEmail: "dave@offline.vc"
    }
  ];

  const applyPreset = (preset) => {
    setSubject(preset.subject);
    setBody(preset.body);
    setSenderName(preset.senderName);
    setSenderEmail(preset.senderEmail);
    setAnalyzedEmail(null);
  };

  const handleSimulate = async () => {
    if (!subject.trim() || !body.trim()) return;

    try {
      setIsSimulating(true);
      const email = await handleSimulateInbound({
        subject,
        body,
        sender: {
          name: senderName || 'External Executive',
          email: senderEmail || 'contact@partner.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          role: 'External Contact'
        }
      });
      if (email) {
        setAnalyzedEmail(email);
      }
    } finally {
      setIsSimulating(false);
    }
  };

  const handleViewInInbox = () => {
    if (analyzedEmail) {
      handleSelectEmail(analyzedEmail);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-xl rounded-3xl shadow-elevated border border-slate-200 overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Zap className="w-4 h-4 text-indigo-600 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Simulate Inbound Email</h3>
              <p className="text-xs text-slate-500">Inject an email to see real-time AI triage and reply classification</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {/* Quick Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select a Test Scenario Preset:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-left transition-all"
                >
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.2 rounded mb-1 inline-block ${
                    p.type === 'client' ? 'bg-rose-100 text-rose-800' :
                    p.type === 'assistant' ? 'bg-indigo-100 text-indigo-800' :
                    p.type === 'review' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {p.badge}
                  </span>
                  <p className="text-xs font-bold text-slate-800 line-clamp-1">{p.title}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3 pt-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">Sender Name</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Peter Fenton"
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">Sender Email</label>
                <input
                  type="text"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="e.g. pfenton@benchmark.com"
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject line..."
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">Email Body</label>
              <textarea
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Full conversation body content..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white font-mono leading-relaxed"
              />
            </div>
          </div>

          {/* Result after simulation */}
          {analyzedEmail && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 animate-fade-in space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Classified as: {analyzedEmail.classification?.category?.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700">
                  Confidence: {Math.round((analyzedEmail.classification?.confidence || 0.9) * 100)}%
                </span>
              </div>
              <p className="text-xs text-emerald-950 font-medium">
                "{analyzedEmail.classification?.reason}"
              </p>
              <button
                onClick={handleViewInInbox}
                className="w-full mt-2 py-1.5 text-xs font-bold text-emerald-900 bg-emerald-200/80 hover:bg-emerald-300 rounded-lg transition-colors"
              >
                Open & Review in Dashboard
              </button>
            </div>
          )}

          {/* Submit Button */}
          {!analyzedEmail && (
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSimulate}
                disabled={isSimulating || !subject || !body}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-soft transition-all flex items-center gap-1.5"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>{isSimulating ? 'Running AI Engine...' : 'Inject & Classify Email'}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
