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
  RotateCcw,
  Bell,
  Users,
  Settings,
  Calendar,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { useEmail } from '../context/EmailContext.jsx';
import { useViewMode } from '../context/ViewModeContext.jsx';

export default function Navbar({ onOpenConnect, onOpenSimulate, onOpenAIChat, onOpenTour, onOpenSettings }) {
  const { 
    accounts, 
    clients,
    selectedClientId,
    setSelectedClientId,
    selectedAccountId, 
    setSelectedAccountId, 
    notifications,
    handleMarkNotificationRead,
    isSyncing, 
    handleSyncNow,
    handleResetData,
    handleSelectEmail,
    emails
  } = useEmail();
  
  const { viewMode, setViewMode } = useViewMode();
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const activeAccount = accounts.find(a => a.id === selectedAccountId);
  const activeClient = clients.find(c => c.id === selectedClientId);

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notif) => {
    handleMarkNotificationRead(notif.id);
    if (notif.emailId) {
      const email = emails.find(e => e.id === notif.emailId);
      if (email) handleSelectEmail(email);
    }
    setShowNotificationDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          
          {/* Left: Brand & Selectors */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Logo */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center text-white shadow-soft">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">Apex Assistant</span>
                  <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    AI Dashboard
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Executive Inbox & Reply Responsibility</p>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-slate-200 hidden lg:block" />

            {/* Client Filter Selector (Multi-Client support for Assistant) */}
            {viewMode === 'assistant' && (
              <div className="relative hidden md:block">
                <button
                  onClick={() => { setShowClientDropdown(!showClientDropdown); setShowAccountDropdown(false); setShowNotificationDropdown(false); }}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100/90 hover:bg-slate-200/70 px-3 py-1.5 rounded-xl transition-all border border-slate-200/70 shadow-2xs"
                  title="Filter by managed client"
                >
                  <Users className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="truncate max-w-[130px]">
                    {selectedClientId === 'all' ? 'All Clients (2)' : activeClient?.name}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showClientDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowClientDropdown(false)} />
                    <div className="absolute left-0 mt-1.5 w-64 bg-white rounded-2xl shadow-elevated border border-slate-200 py-1.5 z-20 animate-scale-up">
                      <div className="px-3 py-1.5 border-b border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Managed Clients</p>
                      </div>
                      <button
                        onClick={() => { setSelectedClientId('all'); setShowClientDropdown(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-50 ${
                          selectedClientId === 'all' ? 'font-semibold text-indigo-600 bg-indigo-50/50' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span>All Clients (Merged)</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">Full Roster</span>
                      </button>
                      {clients.map(c => (
                        <button
                          key={c.id}
                          onClick={() => { setSelectedClientId(c.id); setShowClientDropdown(false); }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-50 ${
                            selectedClientId === c.id ? 'font-semibold text-indigo-600 bg-indigo-50/50' : 'text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <img src={c.avatar} alt={c.name} className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200" />
                            <div className="truncate">
                              <p className="font-semibold text-slate-900 truncate">{c.name}</p>
                              <p className="text-[10px] text-slate-400 truncate">{c.company}</p>
                            </div>
                          </div>
                          <span className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded-full font-bold">
                            {c.clientActionCount} action
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Account Switcher */}
            <div className="relative">
              <button
                onClick={() => { setShowAccountDropdown(!showAccountDropdown); setShowClientDropdown(false); setShowNotificationDropdown(false); }}
                className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors border border-slate-200/60 shadow-2xs"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="truncate max-w-[120px] sm:max-w-[160px]">
                  {selectedAccountId === 'all' ? 'All Inboxes' : activeAccount?.name || 'Mailbox'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {showAccountDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowAccountDropdown(false)} />
                  <div className="absolute left-0 mt-1.5 w-72 bg-white rounded-2xl shadow-elevated border border-slate-200 py-1.5 z-20 animate-scale-up">
                    <div className="px-3 py-1.5 border-b border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Connected Mailboxes</p>
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
                      <span className="text-[10px] text-slate-400">Merged</span>
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
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                          {acc.provider === 'microsoft' ? 'Outlook' : 'Gmail'}
                        </span>
                      </button>
                    ))}
                    <div className="border-t border-slate-100 mt-1 pt-1 px-2">
                      <button
                        onClick={() => { setShowAccountDropdown(false); onOpenConnect(); }}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-semibold hover:bg-indigo-50 rounded-xl transition-colors"
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
              title="Sync all mailboxes now"
              className="hidden xl:flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-indigo-600' : 'text-slate-400'}`} />
              <span className="text-[11px]">
                {isSyncing ? 'Syncing...' : 'Synced 2m ago'}
              </span>
            </button>
          </div>

          {/* Right: Notifications, Actions, AI Copilot, View Switcher & Settings */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* Live Notifications Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setShowNotificationDropdown(!showNotificationDropdown); setShowAccountDropdown(false); setShowClientDropdown(false); }}
                className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                title="Activity & AI Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </button>

              {showNotificationDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotificationDropdown(false)} />
                  <div className="absolute right-0 mt-1.5 w-80 sm:w-96 bg-white rounded-2xl shadow-elevated border border-slate-200 py-2 z-20 animate-scale-up">
                    <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800">Inbox Activity & AI Alerts</span>
                        {unreadNotifsCount > 0 && (
                          <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded-full">
                            {unreadNotifsCount} new
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleMarkNotificationRead('all')}
                        className="text-[11px] text-indigo-600 hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-xs text-slate-400">No notifications</div>
                      ) : (
                        notifications.map(n => (
                          <div
                            key={n.id}
                            onClick={() => handleNotificationClick(n)}
                            className={`p-3 text-left hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-2.5 ${
                              !n.read ? 'bg-indigo-50/30' : ''
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-800">{n.title}</p>
                              <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{n.message}</p>
                              <span className="text-[10px] text-slate-400 mt-1 block">
                                {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* AI Settings Modal button */}
            <button
              onClick={onOpenSettings}
              title="Configure AI & Groq API Settings"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Tour Guide Button */}
            <button
              onClick={onOpenTour}
              title="Interactive Platform Tour"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors hidden sm:block"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Simulate Inbound Email */}
            <button
              onClick={onOpenSimulate}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 px-2.5 sm:px-3 py-1.5 rounded-xl transition-all shadow-2xs"
              title="Test real-time AI classification on an incoming email"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span className="hidden sm:inline">Simulate Email</span>
            </button>

            {/* Ask AI Copilot Button */}
            <button
              onClick={onOpenAIChat}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 px-3 py-1.5 rounded-xl transition-all shadow-soft"
            >
              <Bot className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask AI Copilot</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* Dual Role Switcher (Sarah Assistant vs Client) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setViewMode('assistant')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-xl transition-all ${
                  viewMode === 'assistant'
                    ? 'bg-white text-indigo-700 shadow-soft ring-1 ring-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Executive Assistant Command Center"
              >
                <Bot className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Assistant</span>
              </button>

              <button
                onClick={() => setViewMode('client')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-xl transition-all ${
                  viewMode === 'client'
                    ? 'bg-rose-600 text-white shadow-soft'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Minimalist Client-Facing View"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Client</span>
              </button>
            </div>

            {/* Reset data to initial state */}
            <button
              onClick={handleResetData}
              title="Reset sample data"
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors hidden xl:block"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
