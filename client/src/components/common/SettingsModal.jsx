import React, { useState } from 'react';
import { X, Sparkles, Key, Check, ShieldCheck, Cpu, Zap, ExternalLink } from 'lucide-react';
import { useEmail } from '../../context/EmailContext.jsx';

export default function SettingsModal({ isOpen, onClose }) {
  const { groqApiKey, setGroqApiKey, showToast } = useEmail();
  const [inputKey, setInputKey] = useState(groqApiKey);

  if (!isOpen) return null;

  const handleSave = () => {
    setGroqApiKey(inputKey.trim());
    showToast(inputKey.trim() ? 'Groq API Key saved for live LLM querying' : 'Switched to Built-in Neural Triage Engine', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-elevated border border-slate-200 overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">AI Intelligence Settings</h3>
              <p className="text-xs text-slate-500">Configure LLM querying and classification backend</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80">
            <div className="flex items-center gap-2 mb-1 text-xs font-bold text-indigo-900">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>Hybrid AI Architecture</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Apex Assistant runs on a dual-engine architecture:
            </p>
            <ul className="text-xs text-slate-600 space-y-1 mt-2 list-disc list-inside">
              <li><strong>Default Engine:</strong> Built-in zero-latency semantic classification engine (works 100% offline with zero setup).</li>
              <li><strong>Optional Live LLM:</strong> Connect your free <strong>Groq API key</strong> to power live Llama-3.1 natural language querying and smart drafts!</li>
            </ul>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Groq API Key (Optional):
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="gsk_..."
                className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <span>Get a free instantaneous API key at</span>
              <a 
                href="https://console.groq.com/keys" 
                target="_blank" 
                rel="noreferrer" 
                className="text-indigo-600 font-medium hover:underline inline-flex items-center gap-0.5"
              >
                console.groq.com <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 leading-normal">
              Keys are stored locally in your browser session. Never transmitted to third parties or logged to disk.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-soft transition-all"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
