import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Mail, 
  Sparkles,
  Server,
  KeyRound
} from 'lucide-react';
import { api } from '../../services/api.js';
import { useEmail } from '../../context/EmailContext.jsx';

export default function ConnectAccountModal({ isOpen, onClose }) {
  const { loadData, showToast } = useEmail();
  const [step, setStep] = useState(1); // 1: Choose provider, 2: OAuth Consent, 3: Syncing, 4: Complete
  const [selectedProvider, setSelectedProvider] = useState('google');
  const [accountEmail, setAccountEmail] = useState('');
  const [accountName, setAccountName] = useState('');
  const [syncProgress, setSyncProgress] = useState(0);

  if (!isOpen) return null;

  const handleStartOAuth = (provider) => {
    setSelectedProvider(provider);
    if (provider === 'google') {
      setAccountEmail('alex.ventures@gmail.com');
      setAccountName('Alexander Wright (Ventures)');
    } else {
      setAccountEmail('alexander@apexboard.org');
      setAccountName('Alexander Wright (Board Advisory)');
    }
    setStep(2);
  };

  const handleGrantConsent = async () => {
    setStep(3);
    setSyncProgress(15);

    // Simulate OAuth handshake & mailbox folder sync
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          finishConnection();
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const finishConnection = async () => {
    try {
      await api.connectAccount({
        provider: selectedProvider,
        email: accountEmail,
        name: accountName
      });
      await loadData();
      setStep(4);
      showToast(`Connected ${accountEmail} successfully!`, 'success');
    } catch (err) {
      showToast('Failed to connect email account', 'error');
    }
  };

  const handleClose = () => {
    setStep(1);
    setSyncProgress(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-elevated border border-slate-200 overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Connect Client Email</h3>
              <p className="text-xs text-slate-500">Secure OAuth 2.0 authorization & AI sync</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          
          {/* STEP 1: Select Provider */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect your client's email accounts so the AI assistant can monitor incoming conversations, classify reply responsibility, and draft responses.
              </p>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {/* Google Workspace */}
                <button
                  onClick={() => handleStartOAuth('google')}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-left group shadow-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
                      G
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        Google Workspace / Gmail
                      </h4>
                      <p className="text-xs text-slate-400">OAuth 2.0 with restricted read & send access</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Microsoft 365 */}
                <button
                  onClick={() => handleStartOAuth('microsoft')}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-left group shadow-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                      M
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        Microsoft 365 / Outlook
                      </h4>
                      <p className="text-xs text-slate-400">Microsoft Graph API enterprise authentication</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-normal">
                  Zero retention of raw email credentials. Messages are processed through encrypted end-to-end channels compliant with SOC2 and GDPR.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Simulated OAuth Consent Screen */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <KeyRound className="w-4 h-4 text-indigo-600" />
                  <span>Simulated {selectedProvider === 'google' ? 'Google' : 'Microsoft'} OAuth 2.0 Consent</span>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">Connecting Account</label>
                  <input
                    type="text"
                    value={accountEmail}
                    onChange={(e) => setAccountEmail(e.target.value)}
                    className="w-full text-xs font-mono p-2 rounded-lg border border-slate-200 bg-white"
                  />
                </div>

                <div className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <p className="font-semibold text-slate-800">Permissions requested:</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Read message metadata and thread history for classification</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Send replies on client's behalf upon assistant approval</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Sync calendar events and meeting appointments</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleGrantConsent}
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-soft transition-all"
                >
                  Authorize & Begin Sync
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Real-Time Synchronization Progress */}
          {step === 3 && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center mx-auto text-indigo-600">
                <RefreshCw className="w-8 h-8 animate-spin text-indigo-600" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Synchronizing Mailbox & Running AI Triage
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Connecting to {accountEmail}, fetching recent threads, and computing reply responsibilities...
                </p>
              </div>

              <div className="max-w-xs mx-auto">
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-1.5">
                  <div 
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${syncProgress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-indigo-600">{syncProgress}%</span>
              </div>
            </div>
          )}

          {/* STEP 4: Success & Ready */}
          {step === 4 && (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  Account Successfully Connected!
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  <strong>{accountEmail}</strong> is now linked. All incoming threads are automatically organized into Assistant and Client queues.
                </p>
              </div>

              <button
                onClick={handleClose}
                className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-soft transition-all"
              >
                Go to Inbox Dashboard
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
