import { initialEmails } from './initialEmails.js';
import { initialAccounts, initialClients } from './accounts.js';

class DataStore {
  constructor() {
    this.emails = JSON.parse(JSON.stringify(initialEmails));
    this.accounts = JSON.parse(JSON.stringify(initialAccounts));
    this.clients = JSON.parse(JSON.stringify(initialClients));
    this.notifications = [
      {
        id: 'notif-1',
        title: 'High-Stakes Decision Flagged',
        message: 'AI classified Series B Term Sheet Revisions as Client to Reply (98% confidence).',
        timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        read: false,
        type: 'client_reply',
        emailId: 'em-101'
      },
      {
        id: 'notif-2',
        title: 'Meeting Reschedule Requested',
        message: 'Claire Holloway requested shifting executive dinner from 7:00 PM to 8:30 PM.',
        timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
        read: false,
        type: 'meeting',
        emailId: 'em-102'
      },
      {
        id: 'notif-3',
        title: 'Client Delegated Task',
        message: 'Alexander delegated Valkyrie Term Sheet to Sarah Jenkins: "Negotiate collar up to $130M".',
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        read: true,
        type: 'delegated',
        emailId: 'em-101'
      },
      {
        id: 'notif-4',
        title: 'New Lead Investment Term Sheet',
        message: 'NeuroGenomics accepted Dr. Sophia Chen as lead investor for Series A round.',
        timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
        read: false,
        type: 'client_reply',
        emailId: 'em-111'
      }
    ];
  }

  getClients() {
    return this.clients.map(client => {
      const clientAccountIds = this.accounts.filter(a => a.clientId === client.id).map(a => a.id);
      const clientEmails = this.emails.filter(e => !e.isArchived && clientAccountIds.includes(e.accountId));
      const unreadCount = clientEmails.filter(e => !e.isRead).length;
      const clientActionCount = clientEmails.filter(e => e.classification?.category === 'client_reply' && !e.isHandled).length;
      return {
        ...client,
        accountCount: clientAccountIds.length,
        unreadCount,
        clientActionCount,
        totalEmails: clientEmails.length
      };
    });
  }

  getAccounts() {
    return this.accounts.map(acc => {
      const accountEmails = this.emails.filter(e => !e.isArchived && (acc.id === 'all' || e.accountId === acc.id));
      const unreadCount = accountEmails.filter(e => !e.isRead).length;
      return {
        ...acc,
        unreadCount,
        totalCount: accountEmails.length
      };
    });
  }

  getAccountById(id) {
    return this.accounts.find(a => a.id === id);
  }

  addAccount(account) {
    const newAccount = {
      id: `acc-${Date.now()}`,
      clientId: account.clientId || 'client-1',
      status: 'connected',
      syncStatus: 'synced',
      lastSyncedAt: new Date().toISOString(),
      unreadCount: 0,
      totalCount: 0,
      color: account.provider === 'google' ? '#ea4335' : '#0078d4',
      ...account
    };
    this.accounts.push(newAccount);
    return newAccount;
  }

  disconnectAccount(id) {
    const index = this.accounts.findIndex(a => a.id === id);
    if (index !== -1) {
      const removed = this.accounts.splice(index, 1)[0];
      return removed;
    }
    return null;
  }

  syncAccount(id) {
    const account = this.accounts.find(a => a.id === id);
    if (account) {
      account.syncStatus = 'synced';
      account.lastSyncedAt = new Date().toISOString();
      return account;
    }
    this.accounts.forEach(a => {
      a.syncStatus = 'synced';
      a.lastSyncedAt = new Date().toISOString();
    });
    return this.accounts;
  }

  getNotifications() {
    return this.notifications;
  }

  markNotificationRead(id) {
    if (id === 'all') {
      this.notifications.forEach(n => { n.read = true; });
      return this.notifications;
    }
    const n = this.notifications.find(item => item.id === id);
    if (n) n.read = true;
    return this.notifications;
  }

  getEmails(filters = {}) {
    let result = [...this.emails];

    // Filter by client if specified
    if (filters.clientId && filters.clientId !== 'all') {
      const clientAccountIds = this.accounts.filter(a => a.clientId === filters.clientId).map(a => a.id);
      result = result.filter(e => clientAccountIds.includes(e.accountId));
    }

    if (filters.accountId && filters.accountId !== 'all') {
      result = result.filter(e => e.accountId === filters.accountId);
    }

    if (filters.category) {
      if (filters.category === 'client_reply') {
        result = result.filter(e => e.classification?.category === 'client_reply');
      } else if (filters.category === 'assistant_reply') {
        result = result.filter(e => e.classification?.category === 'assistant_reply');
      } else if (filters.category === 'no_reply_needed') {
        result = result.filter(e => e.classification?.category === 'no_reply_needed');
      } else if (filters.category === 'needs_review') {
        result = result.filter(e => e.classification?.needsReview === true);
      } else if (filters.category === 'action_required') {
        result = result.filter(e => !e.isHandled && (e.classification?.category === 'assistant_reply' || e.classification?.category === 'client_reply'));
      } else if (filters.category === 'waiting') {
        result = result.filter(e => e.priority === 'urgent' || e.priority === 'high');
      } else if (filters.category === 'meetings') {
        result = result.filter(e => !!e.extractedMeeting);
      } else if (filters.category === 'starred') {
        result = result.filter(e => e.isStarred);
      } else if (filters.category === 'archived') {
        result = result.filter(e => e.isArchived);
      }
    }

    if (filters.category !== 'archived') {
      result = result.filter(e => !e.isArchived);
    }

    if (filters.isRead !== undefined) {
      result = result.filter(e => e.isRead === (filters.isRead === 'true' || filters.isRead === true));
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(e => 
        e.subject.toLowerCase().includes(q) ||
        e.snippet.toLowerCase().includes(q) ||
        e.sender.name.toLowerCase().includes(q) ||
        e.sender.email.toLowerCase().includes(q) ||
        e.aiSummary?.tldr.toLowerCase().includes(q) ||
        e.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    result.sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt));
    return result;
  }

  getEmailById(id) {
    return this.emails.find(e => e.id === id) || null;
  }

  updateEmailClassification(id, { category, reason, overriddenBy }) {
    const email = this.getEmailById(id);
    if (!email) return null;

    email.classification = {
      ...email.classification,
      category,
      confidence: 1.0,
      reason: reason || `Manually reclassified as ${category.replace('_', ' ')} by ${overriddenBy || 'Assistant'}.`,
      needsReview: false,
      overriddenBy: overriddenBy || 'assistant',
      overriddenAt: new Date().toISOString()
    };

    // Add notification
    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'Classification Overridden',
      message: `"${email.subject.slice(0, 40)}..." was reclassified as ${category.replace('_', ' ')}.`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'override',
      emailId: email.id
    });

    return email;
  }

  updateEmailStatus(id, updates) {
    const email = this.getEmailById(id);
    if (!email) return null;

    if (updates.isRead !== undefined) email.isRead = updates.isRead;
    if (updates.isStarred !== undefined) email.isStarred = updates.isStarred;
    if (updates.isArchived !== undefined) email.isArchived = updates.isArchived;
    if (updates.isHandled !== undefined) email.isHandled = updates.isHandled;

    return email;
  }

  delegateEmailToAssistant(id, { clientNotes }) {
    const email = this.getEmailById(id);
    if (!email) return null;

    email.classification = {
      ...email.classification,
      category: 'assistant_reply',
      confidence: 1.0,
      reason: `Delegated by Client with instructions: "${clientNotes || 'Please handle this.'}"`,
      needsReview: false,
      overriddenBy: 'client',
      overriddenAt: new Date().toISOString()
    };
    email.clientNotes = clientNotes;
    email.delegatedToAssistant = true;

    // Add notification for assistant
    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'New Client Delegation',
      message: `Client delegated "${email.subject.slice(0, 35)}..." with notes: "${clientNotes || 'Handle this'}"`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'delegated',
      emailId: email.id
    });

    return email;
  }

  addReplyToEmail(id, { body, senderName, senderEmail, tone }) {
    const email = this.getEmailById(id);
    if (!email) return null;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderName: senderName || 'Sarah Jenkins (Executive Assistant)',
      senderEmail: senderEmail || 'sarah.jenkins@apexholdings.com',
      receivedAt: new Date().toISOString(),
      body: body
    };

    email.messages.push(newMsg);
    email.isHandled = true;
    email.isRead = true;
    email.draftReply = {
      body,
      tone: tone || 'professional',
      generatedAt: new Date().toISOString(),
      approved: true
    };

    email.classification.reason = 'Response sent by Executive Assistant. Awaiting recipient follow-up.';

    return { email, message: newMsg };
  }

  injectIncomingEmail(emailData) {
    const newEmail = {
      id: `em-${Date.now()}`,
      accountId: emailData.accountId || 'acc-1',
      accountEmail: emailData.accountEmail || 'alexander.wright@apexholdings.com',
      subject: emailData.subject || 'New Inbound Message',
      snippet: emailData.snippet || (emailData.body ? emailData.body.slice(0, 120) + '...' : 'New incoming conversation...'),
      sender: emailData.sender || {
        name: 'Inbound Contact',
        email: 'contact@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        role: 'External Contact',
        company: 'Partner Co'
      },
      recipients: [
        { name: 'Alexander Wright', email: 'alexander.wright@apexholdings.com' },
        { name: 'Sarah Jenkins', email: 'sarah.jenkins@apexholdings.com' }
      ],
      receivedAt: new Date().toISOString(),
      isRead: false,
      isStarred: false,
      isArchived: false,
      isHandled: false,
      tags: emailData.tags || ['Inbound'],
      priority: emailData.priority || 'normal',
      classification: emailData.classification,
      aiSummary: emailData.aiSummary,
      extractedMeeting: emailData.extractedMeeting || null,
      messages: [
        {
          id: `msg-${Date.now()}-1`,
          senderName: emailData.sender?.name || 'Inbound Contact',
          senderEmail: emailData.sender?.email || 'contact@example.com',
          receivedAt: new Date().toISOString(),
          body: emailData.body || 'No message content'
        }
      ]
    };

    this.emails.unshift(newEmail);

    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'New Inbound Email Classified',
      message: `"${newEmail.subject.slice(0, 35)}..." classified as ${newEmail.classification.category.replace('_', ' ')} (${Math.round(newEmail.classification.confidence * 100)}%).`,
      timestamp: new Date().toISOString(),
      read: false,
      type: newEmail.classification.category,
      emailId: newEmail.id
    });

    return newEmail;
  }

  getStats(filters = {}) {
    let pool = this.emails.filter(e => !e.isArchived);

    if (filters.clientId && filters.clientId !== 'all') {
      const clientAccountIds = this.accounts.filter(a => a.clientId === filters.clientId).map(a => a.id);
      pool = pool.filter(e => clientAccountIds.includes(e.accountId));
    }

    if (filters.accountId && filters.accountId !== 'all') {
      pool = pool.filter(e => e.accountId === filters.accountId);
    }

    const total = pool.length;
    const unread = pool.filter(e => !e.isRead).length;
    const assistantToReply = pool.filter(e => e.classification?.category === 'assistant_reply' && !e.isHandled).length;
    const clientToReply = pool.filter(e => e.classification?.category === 'client_reply' && !e.isHandled).length;
    const noReplyNeeded = pool.filter(e => e.classification?.category === 'no_reply_needed').length;
    const needsReview = pool.filter(e => e.classification?.needsReview === true).length;
    const actionRequired = pool.filter(e => !e.isHandled && (e.classification?.category === 'assistant_reply' || e.classification?.category === 'client_reply')).length;
    const meetings = pool.filter(e => !!e.extractedMeeting).length;
    const starred = pool.filter(e => e.isStarred).length;

    return {
      total,
      unread,
      assistantToReply,
      clientToReply,
      noReplyNeeded,
      needsReview,
      actionRequired,
      meetings,
      starred
    };
  }

  getMeetings(filters = {}) {
    let pool = this.emails.filter(e => !e.isArchived && !!e.extractedMeeting);

    if (filters.clientId && filters.clientId !== 'all') {
      const clientAccountIds = this.accounts.filter(a => a.clientId === filters.clientId).map(a => a.id);
      pool = pool.filter(e => clientAccountIds.includes(e.accountId));
    }

    if (filters.accountId && filters.accountId !== 'all') {
      pool = pool.filter(e => e.accountId === filters.accountId);
    }

    return pool.map(e => ({
      emailId: e.id,
      subject: e.subject,
      sender: e.sender,
      ...e.extractedMeeting
    }));
  }

  resetToInitial() {
    this.emails = JSON.parse(JSON.stringify(initialEmails));
    this.accounts = JSON.parse(JSON.stringify(initialAccounts));
    this.clients = JSON.parse(JSON.stringify(initialClients));
    return true;
  }
}

export const datastore = new DataStore();
