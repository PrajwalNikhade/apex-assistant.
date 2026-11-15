import express from 'express';
import { datastore } from '../data/datastore.js';

const router = express.Router();

// GET stats
router.get('/', (req, res) => {
  try {
    const { accountId } = req.query;
    const stats = datastore.getStats(accountId || 'all');
    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET meetings extracted from emails
router.get('/meetings', (req, res) => {
  try {
    const { accountId } = req.query;
    const meetings = datastore.getMeetings(accountId || 'all');
    res.json({ success: true, count: meetings.length, meetings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
