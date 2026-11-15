import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  RefreshCw, 
  ChevronDown, 
  Check, 
  Sliders, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { api } from '../../services/api.js';
import { useEmail } from '../../context/EmailContext.jsx';

export default function ReplyComposer({ email, onReplySent }) {
  const { handleSendReply, showToast } = useEmail();
  const [tone, setTone] = useState('professional');
  const [customInstructions, setCustomInstructions] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [senderPersona, setSenderPersona] = useState('assistant');

  const tones = [
    { id: 'professional', label: 'Professional', desc: 'Balanced, courteous, executive tone' },
    { id: 'concise', label: 'Concise & Direct', desc: 'Short, clear, executive brevity' },
    { id: 'warm', label: 'Warm & Friendly', desc: 'Personable, collegial, appreciative' },
    { id: 'assertive', label: 'Assertive / Firm', desc: 'Direct commercial boundary setting' },
    { id: 'decline', label: 'Decline Politely', desc: 'Gracious non-commitment / regret' }
  ];

  const handleGenerateDraft = async (selectedTone = tone) => {
    try {
      setIsGenerating(true);
      const res = await api.generateDraft(
        email.id,
        selectedTone,
        customInstructions,
        senderPersona
      );
      if (res.success && res.draft) {
        setReplyBody(res.draft);
        showToast(`AI Draft generated with ${selectedTone} tone`, 'info');
      }
    } catch (err) {
      showToast('Failed to generate AI draft', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!replyBody.trim()) {
      showToast('Please draft a response before sending', 'error');
      return;
    }

    try {
      setIsSending(true);
      const senderName = senderPersona === 'assistant' 
        ? 'Sarah Jenkins (Office of Alexander Wright)' 
        : 'Alexander Wright';
      const senderEmail = senderPersona === 'assistant'
        ? 'sarah.jenkins@apexholdings.com'
        : 'alexander.wright@apexholdings.com';

      const success = await handleSendReply(email.id, {
        body: replyBody,
        senderName,
        senderEmail,
        tone
      });

      if (success) {
        setReplyBody('');
        setCustomInstructions('');
        if (onReplySent) onReplySent();
      }
    } catch (err) {
      showToast('Failed to send reply', 'error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-soft overflow-hidden">
      {/* Header with AI Draft Options */}
      <div className="p-4 bg-slate-50/80 border-b border-slate-200/70">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-800">AI Reply Generator</h4>
              <p className="text-[11px] text-slate-500">Draft context-aware replies reviewed by assistant before sending</p>
            </div>
          </div>

          {/* Tone Selector Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {tones.map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setTone(t.id);
                  handleGenerateDraft(t.id);
                }}
                disabled={isGenerating}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                  tone === t.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
                title={t.desc}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom guidance input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="Add specific instructions (e.g. 'Alexander is free Tuesday afternoon at 3pm')..."
            className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <button
            onClick={() => handleGenerateDraft(tone)}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors flex-shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating...' : 'Generate Draft'}</span>
          </button>
        </div>
      </div>

      {/* Reply Textarea */}
      <div className="p-4">
        <textarea
          rows={6}
          value={replyBody}
          onChange={(e) => setReplyBody(e.target.value)}
          placeholder={`Type your reply or click 'Generate Draft' above to generate an intelligent response for ${email.sender.name}...`}
          className="w-full text-xs font-mono text-slate-800 leading-relaxed p-3 rounded-lg border border-slate-200 bg-slate-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-y"
        />

        {/* Bottom Toolbar: Sender selection and Send Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Sending as:</span>
            <select
              value={senderPersona}
              onChange={(e) => setSenderPersona(e.target.value)}
              className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="assistant">Sarah Jenkins (Executive Assistant)</option>
              <option value="client">Alexander Wright (Directly)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            {replyBody && (
              <button
                onClick={() => setReplyBody('')}
                className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={handleSend}
              disabled={isSending || !replyBody.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSending ? 'Sending...' : 'Send Reply'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
