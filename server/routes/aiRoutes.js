import express from 'express';
import { askCopilot, generateSmartReply } from '../services/aiAssistant.js';
import { classifyEmail } from '../services/aiClassifier.js';
import { datastore } from '../data/datastore.js';

const router = express.Router();

// POST ask Copilot
router.post('/ask', async (req, res) => {
  try {
    const { query, emailId, persona, apiKey } = req.body;
    if (!query) {
      return res.status(400).json({ success: false, error: 'Query is required' });
    }
    const emails = datastore.getEmails();
    const activeEmail = emailId ? datastore.getEmailById(emailId) : null;

    const response = await askCopilot(query, { emails, activeEmail, persona, apiKey });
    res.json({ success: true, ...response });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST draft smart reply
router.post('/draft-reply', (req, res) => {
  try {
    const { emailId, tone, customInstructions, senderPersona } = req.body;
    if (!emailId) {
      return res.status(400).json({ success: false, error: 'emailId is required' });
    }
    const email = datastore.getEmailById(emailId);
    if (!email) {
      return res.status(404).json({ success: false, error: 'Email not found' });
    }
    const replyData = generateSmartReply({
      email,
      tone: tone || 'professional',
      customInstructions,
      senderPersona: senderPersona || 'assistant'
    });
    res.json({ success: true, ...replyData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST run AI classification on ad-hoc text
router.post('/classify', (req, res) => {
  try {
    const { subject, body, sender } = req.body;
    const result = classifyEmail({ subject, body, sender });
    res.json({ success: true, classification: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
