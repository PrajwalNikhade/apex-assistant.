import express from 'express';
import { datastore } from '../data/datastore.js';
import { classifyEmail } from '../services/aiClassifier.js';

const router = express.Router();

// GET all emails with filters
router.get('/', (req, res) => {
  try {
    const filters = {
      accountId: req.query.accountId,
      category: req.query.category,
      isRead: req.query.isRead,
      search: req.query.search
    };
    const emails = datastore.getEmails(filters);
    res.json({ success: true, count: emails.length, emails });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single email by ID
router.get('/:id', (req, res) => {
  try {
    const email = datastore.getEmailById(req.params.id);
    if (!email) {
      return res.status(404).json({ success: false, error: 'Email not found' });
    }
    res.json({ success: true, email });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH manual override of classification
router.patch('/:id/classification', (req, res) => {
  try {
    const { category, reason, overriddenBy } = req.body;
    if (!category) {
      return res.status(400).json({ success: false, error: 'Category is required' });
    }
    const updated = datastore.updateEmailClassification(req.params.id, {
      category,
      reason,
      overriddenBy: overriddenBy || 'assistant'
    });
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Email not found' });
    }
    res.json({ success: true, email: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH status (isRead, isStarred, isArchived, isHandled)
router.patch('/:id/status', (req, res) => {
  try {
    const updated = datastore.updateEmailStatus(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Email not found' });
    }
    res.json({ success: true, email: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST delegate from Client to Assistant
router.post('/:id/delegate', (req, res) => {
  try {
    const { clientNotes } = req.body;
    const updated = datastore.delegateEmailToAssistant(req.params.id, { clientNotes });
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Email not found' });
    }
    res.json({ success: true, email: updated, message: 'Email delegated to Assistant' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST add reply to email thread
router.post('/:id/reply', (req, res) => {
  try {
    const { body, senderName, senderEmail, tone } = req.body;
    if (!body) {
      return res.status(400).json({ success: false, error: 'Reply body is required' });
    }
    const result = datastore.addReplyToEmail(req.params.id, { body, senderName, senderEmail, tone });
    if (!result) {
      return res.status(404).json({ success: false, error: 'Email not found' });
    }
    res.json({ success: true, email: result.email, message: result.message });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST simulate incoming email with live AI classification
router.post('/simulate-incoming', (req, res) => {
  try {
    const { subject, body, sender, accountId, priority, tags } = req.body;
    
    // Run AI classification
    const aiAnalysis = classifyEmail({
      subject: subject || 'Urgent Board Strategy Update',
      body: body || 'Please review the updated governance bylaws.',
      sender: sender || { name: 'Board Member', email: 'director@apex.com' }
    });

    const newEmail = datastore.injectIncomingEmail({
      subject,
      body,
      sender,
      accountId: accountId || 'acc-1',
      priority: priority || (aiAnalysis.category === 'client_reply' ? 'urgent' : 'normal'),
      tags: tags || ['Live Inbound', aiAnalysis.category.replace('_', ' ')],
      classification: {
        category: aiAnalysis.category,
        confidence: aiAnalysis.confidence,
        reason: aiAnalysis.reason,
        suggestedAction: aiAnalysis.suggestedAction,
        needsReview: aiAnalysis.needsReview,
        originalCategory: aiAnalysis.category,
        overriddenBy: null,
        overriddenAt: null
      },
      aiSummary: aiAnalysis.aiSummary,
      extractedMeeting: aiAnalysis.extractedMeeting
    });

    res.json({ success: true, email: newEmail, aiAnalysis });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST reset datastore
router.post('/reset', (req, res) => {
  try {
    datastore.resetToInitial();
    res.json({ success: true, message: 'Datastore reset to initial sample dataset' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
