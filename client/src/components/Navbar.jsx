import React, { useState } from 'react';
import { 
  Mail, 
  RefreshCw, 
  Sparkles, 
  PlusCircle, 
  Bot, 
  User, 
  ChevronDown, 
  SlidersHorizontal,
  CheckCircle2,
  Inbox,
  ShieldCheck,
  SendHorizontal,
  Zap,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { useEmail } from '../context/EmailContext.jsx';
import { useViewMode } from '../context/ViewModeContext.jsx';

export default function Navbar({ onOpenConnect, onOpenSimulate, onOpenAIChat, onOpenTour }) {
  const { 
    accounts, 
    selectedAccountId, 
    setSelectedAccountId, 
    isSyncing, 
    handleSyncNow,
    handleResetData
  } = useEmail();
  
  const { viewMode, setViewMode, persona } = useViewMode();
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const activeAccount = accounts.find(a => a.id === selectedAccountId);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Brand & Mailbox Selector */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-soft">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 tracking-tight text-lg">Apex Assistant</span>
                  <span className="text-[10px] font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    AI Prototype
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">Intelligent Inbox & Reply Responsibility</p>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />

            {/* Account Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 px-3 py-1.5 rounded-lg transition-colors border border-slate-200/60"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="truncate max-w-[170px]">
                  {selectedAccountId === 'all' ? 'All Inboxes (2 connected)' : activeAccount?.name || 'Mailbox'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {showAccountDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowAccountDropdown(false)} 
                  />
                  <div className="absolute left-0 mt-1.5 w-72 bg-white rounded-xl shadow-elevated border border-slate-200 py-1.5 z-20">
                    <div className="px-3 py-1.5 border-b border-slate-100">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Connected Client Inboxes</p>
                    </div>
                    <button
                      onClick={() => { setSelectedAccountId('all'); setShowAccountDropdown(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-50 ${
                        selectedAccountId === 'all' ? 'font-semibold text-indigo-600 bg-indigo-50/50' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Inbox className="w-4 h-4 text-slate-400" />
                        <span>All Connected Inboxes</span>
                      </div>
                      <span className="text-[11px] text-slate-400">Merged</span>
                    </button>
                    {accounts.map(acc => (
                      <button
                        key={acc.id}
                        onClick={() => { setSelectedAccountId(acc.id); setShowAccountDropdown(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-50 ${
                          selectedAccountId === acc.id ? 'font-semibold text-indigo-600 bg-indigo-50/50' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span 
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: acc.color }}
                          />
                          <div className="truncate">
                            <p className="truncate font-medium">{acc.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{acc.email}</p>
                          </div>
                        </div>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          {acc.provider === 'microsoft' ? 'Outlook' : 'Gmail'}
                        </span>
                      </button>
                    ))}
                    <div className="border-t border-slate-100 mt-1 pt-1 px-2">
                      <button
                        onClick={() => { setShowAccountDropdown(false); onOpenConnect(); }}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-medium hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Connect Another Email Account</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sync Status Button */}
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              title="Sync emails now"
              className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors px-2 py-1 rounded-md hover:bg-slate-100"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-indigo-600' : 'text-slate-400'}`} />
              <span className="text-[11px]">
                {isSyncing ? 'Syncing...' : 'Synced 2m ago'}
              </span>
            </button>
          </div>

          {/* Right: Actions, AI Copilot, View Switcher & Persona */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Guide & Tour Button */}
            <button
              onClick={onOpenTour}
              title="View Interactive Guide & Prototype Tour"
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Simulate Incoming Email (Demo Feature) */}
            <button
              onClick={onOpenSimulate}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/70 px-3 py-1.5 rounded-lg transition-all shadow-xs"
              title="Test real-time AI classification on a new incoming email"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span className="hidden sm:inline">Simulate Incoming Email</span>
              <span className="sm:hidden">Simulate</span>
            </button>

            {/* AI Copilot Button */}
            <button
              onClick={onOpenAIChat}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 px-3 py-1.5 rounded-lg transition-all shadow-soft"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask AI Copilot</span>
            </button>

            {/* Dual Role Switcher (Assistant vs Client) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 shadow-xs">
              <button
                onClick={() => setViewMode('assistant')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  viewMode === 'assistant'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Full inbox command center for the Executive Assistant"
              >
                <Bot className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Assistant</span>
                <span className="text-[10px] text-slate-400 font-normal hidden lg:inline">(Sarah)</span>
              </button>

              <button
                onClick={() => setViewMode('client')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  viewMode === 'client'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Minimalist view for Alexander Wright showing only items needing client decision"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Client</span>
                <span className="text-[10px] text-rose-200 font-normal hidden lg:inline">(Alexander)</span>
              </button>
            </div>

            {/* Reset sample data */}
            <button
              onClick={handleResetData}
              title="Reset sample emails to initial state"
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors hidden sm:block"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
