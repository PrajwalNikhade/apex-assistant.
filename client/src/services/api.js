const API_BASE = '/api';

export const api = {
  async fetchEmails(filters = {}) {
    const params = new URLSearchParams();
    if (filters.clientId && filters.clientId !== 'all') params.append('clientId', filters.clientId);
    if (filters.accountId && filters.accountId !== 'all') params.append('accountId', filters.accountId);
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.isRead !== undefined) params.append('isRead', filters.isRead);
    if (filters.search) params.append('search', filters.search);

    const res = await fetch(`${API_BASE}/emails?${params.toString()}`);
    return res.json();
  },

  async fetchEmailById(id) {
    const res = await fetch(`${API_BASE}/emails/${id}`);
    return res.json();
  },

  async updateClassification(id, { category, reason, overriddenBy = 'assistant' }) {
    const res = await fetch(`${API_BASE}/emails/${id}/classification`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, reason, overriddenBy })
    });
    return res.json();
  },

  async updateStatus(id, updates) {
    const res = await fetch(`${API_BASE}/emails/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return res.json();
  },

  async delegateToAssistant(id, { clientNotes }) {
    const res = await fetch(`${API_BASE}/emails/${id}/delegate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientNotes })
    });
    return res.json();
  },

  async sendReply(id, { body, senderName, senderEmail, tone }) {
    const res = await fetch(`${API_BASE}/emails/${id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body, senderName, senderEmail, tone })
    });
    return res.json();
  },

  async simulateIncoming(data) {
    const res = await fetch(`${API_BASE}/emails/simulate-incoming`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async fetchAccounts() {
    const res = await fetch(`${API_BASE}/accounts`);
    return res.json();
  },

  async fetchClients() {
    const res = await fetch(`${API_BASE}/accounts/clients`);
    return res.json();
  },

  async connectAccount(data) {
    const res = await fetch(`${API_BASE}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async disconnectAccount(id) {
    const res = await fetch(`${API_BASE}/accounts/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  async syncAccount(id = 'all') {
    const res = await fetch(`${API_BASE}/accounts/${id}/sync`, {
      method: 'POST'
    });
    return res.json();
  },

  async fetchStats(filters = {}) {
    const params = new URLSearchParams();
    if (filters.accountId && filters.accountId !== 'all') params.append('accountId', filters.accountId);
    if (filters.clientId && filters.clientId !== 'all') params.append('clientId', filters.clientId);
    const res = await fetch(`${API_BASE}/stats?${params.toString()}`);
    return res.json();
  },

  async fetchMeetings(filters = {}) {
    const params = new URLSearchParams();
    if (filters.accountId && filters.accountId !== 'all') params.append('accountId', filters.accountId);
    if (filters.clientId && filters.clientId !== 'all') params.append('clientId', filters.clientId);
    const res = await fetch(`${API_BASE}/stats/meetings?${params.toString()}`);
    return res.json();
  },

  async fetchNotifications() {
    const res = await fetch(`${API_BASE}/stats/notifications`);
    return res.json();
  },

  async markNotificationRead(id) {
    const res = await fetch(`${API_BASE}/stats/notifications/${id}/read`, {
      method: 'POST'
    });
    return res.json();
  },

  async askAI(query, emailId = null, persona = 'assistant', apiKey = '') {
    const res = await fetch(`${API_BASE}/ai/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, emailId, persona, apiKey })
    });
    return res.json();
  },

  async generateDraft(emailId, tone = 'professional', customInstructions = '', senderPersona = 'assistant') {
    const res = await fetch(`${API_BASE}/ai/draft-reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailId, tone, customInstructions, senderPersona })
    });
    return res.json();
  },

  async resetData() {
    const res = await fetch(`${API_BASE}/emails/reset`, {
      method: 'POST'
    });
    return res.json();
  }
};
