import express from 'express';
import { datastore } from '../data/datastore.js';

const router = express.Router();

// GET stats
router.get('/', (req, res) => {
  try {
    const { accountId, clientId } = req.query;
    const stats = datastore.getStats({ accountId: accountId || 'all', clientId: clientId || 'all' });
    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET meetings extracted from emails
router.get('/meetings', (req, res) => {
  try {
    const { accountId, clientId } = req.query;
    const meetings = datastore.getMeetings({ accountId: accountId || 'all', clientId: clientId || 'all' });
    res.json({ success: true, count: meetings.length, meetings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET notifications
router.get('/notifications', (req, res) => {
  try {
    const notifications = datastore.getNotifications();
    res.json({ success: true, count: notifications.length, notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST mark notification as read
router.post('/notifications/:id/read', (req, res) => {
  try {
    const updated = datastore.markNotificationRead(req.params.id);
    res.json({ success: true, notifications: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
