import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api.js';

const EmailContext = createContext();

export function EmailProvider({ children }) {
  const [emails, setEmails] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    assistantToReply: 0,
    clientToReply: 0,
    noReplyNeeded: 0,
    needsReview: 0,
    actionRequired: 0,
    meetings: 0,
    starred: 0
  });
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 4000);
  }, []);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [emailRes, statsRes, accRes] = await Promise.all([
        api.fetchEmails({
          accountId: selectedAccountId,
          category: selectedCategory,
          search: searchQuery
        }),
        api.fetchStats(selectedAccountId),
        api.fetchAccounts()
      ]);

      if (emailRes.success) setEmails(emailRes.emails);
      if (statsRes.success) setStats(statsRes.stats);
      if (accRes.success) setAccounts(accRes.accounts);
    } catch (err) {
      console.error('Failed to load email data:', err);
      showToast('Error connecting to server. Retrying...', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [selectedAccountId, selectedCategory, searchQuery, showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refreshStats = useCallback(async () => {
    const statsRes = await api.fetchStats(selectedAccountId);
    if (statsRes.success) setStats(statsRes.stats);
    const accRes = await api.fetchAccounts();
    if (accRes.success) setAccounts(accRes.accounts);
  }, [selectedAccountId]);

  const handleSelectEmail = useCallback(async (email) => {
    if (!email) {
      setSelectedEmail(null);
      return;
    }
    setSelectedEmail(email);
    // Mark read optimistically if unread
    if (!email.isRead) {
      setEmails(prev => prev.map(e => e.id === email.id ? { ...e, isRead: true } : e));
      await api.updateStatus(email.id, { isRead: true });
      refreshStats();
    }
  }, [refreshStats]);

  const handleClassificationOverride = useCallback(async (emailId, category, reason) => {
    try {
      const res = await api.updateClassification(emailId, { category, reason, overriddenBy: 'assistant' });
      if (res.success) {
        setEmails(prev => prev.map(e => e.id === emailId ? res.email : e));
        if (selectedEmail?.id === emailId) {
          setSelectedEmail(res.email);
        }
        refreshStats();
        showToast(`Classification updated to "${category.replace('_', ' ').toUpperCase()}"`, 'success');
      }
    } catch (err) {
      showToast('Failed to update classification', 'error');
    }
  }, [selectedEmail, refreshStats, showToast]);

  const handleStatusChange = useCallback(async (emailId, updates) => {
    try {
      const res = await api.updateStatus(emailId, updates);
      if (res.success) {
        setEmails(prev => prev.map(e => e.id === emailId ? res.email : e));
        if (selectedEmail?.id === emailId) {
          setSelectedEmail(res.email);
        }
        refreshStats();
        if (updates.isArchived) showToast('Conversation archived', 'info');
        else if (updates.isStarred !== undefined) showToast(updates.isStarred ? 'Starred' : 'Unstarred', 'info');
        else if (updates.isHandled) showToast('Marked as handled', 'success');
      }
    } catch (err) {
      showToast('Failed to update email status', 'error');
    }
  }, [selectedEmail, refreshStats, showToast]);

  const handleDelegate = useCallback(async (emailId, clientNotes) => {
    try {
      const res = await api.delegateToAssistant(emailId, { clientNotes });
      if (res.success) {
        setEmails(prev => prev.map(e => e.id === emailId ? res.email : e));
        if (selectedEmail?.id === emailId) {
          setSelectedEmail(res.email);
        }
        refreshStats();
        showToast('Delegated to Sarah Jenkins (Assistant) with your notes', 'success');
      }
    } catch (err) {
      showToast('Failed to delegate email', 'error');
    }
  }, [selectedEmail, refreshStats, showToast]);

  const handleSendReply = useCallback(async (emailId, replyPayload) => {
    try {
      const res = await api.sendReply(emailId, replyPayload);
      if (res.success) {
        setEmails(prev => prev.map(e => e.id === emailId ? res.email : e));
        setSelectedEmail(res.email);
        refreshStats();
        showToast('Reply sent successfully and logged in thread', 'success');
        return true;
      }
    } catch (err) {
      showToast('Failed to send reply', 'error');
      return false;
    }
  }, [refreshStats, showToast]);

  const handleSyncNow = useCallback(async () => {
    try {
      setIsSyncing(true);
      await api.syncAccount(selectedAccountId);
      await loadData();
      showToast('All connected mailboxes synchronized', 'success');
    } catch (err) {
      showToast('Sync failed', 'error');
    } finally {
      setIsSyncing(false);
    }
  }, [selectedAccountId, loadData, showToast]);

  const handleSimulateInbound = useCallback(async (emailData) => {
    try {
      const res = await api.simulateIncoming(emailData);
      if (res.success) {
        setEmails(prev => [res.email, ...prev]);
        refreshStats();
        showToast(`New email received & classified as "${res.aiAnalysis.category.replace('_', ' ').toUpperCase()}"`, 'success');
        return res.email;
      }
    } catch (err) {
      showToast('Failed to simulate incoming email', 'error');
      return null;
    }
  }, [refreshStats, showToast]);

  const handleResetData = useCallback(async () => {
    await api.resetData();
    await loadData();
    setSelectedEmail(null);
    showToast('Prototype data reset to initial state', 'info');
  }, [loadData, showToast]);

  return (
    <EmailContext.Provider
      value={{
        emails,
        stats,
        accounts,
        selectedAccountId,
        setSelectedAccountId,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedEmail,
        setSelectedEmail,
        isLoading,
        isSyncing,
        toast,
        showToast,
        loadData,
        handleSelectEmail,
        handleClassificationOverride,
        handleStatusChange,
        handleDelegate,
        handleSendReply,
        handleSyncNow,
        handleSimulateInbound,
        handleResetData
      }}
    >
      {children}
    </EmailContext.Provider>
  );
}

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) throw new Error('useEmail must be used within an EmailProvider');
  return context;
};
