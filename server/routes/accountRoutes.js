import express from 'express';
import { datastore } from '../data/datastore.js';

const router = express.Router();

// GET all connected accounts
router.get('/', (req, res) => {
  try {
    const accounts = datastore.getAccounts();
    res.json({ success: true, count: accounts.length, accounts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all clients managed by the assistant
router.get('/clients', (req, res) => {
  try {
    const clients = datastore.getClients();
    res.json({ success: true, count: clients.length, clients });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST connect a new account
router.post('/', (req, res) => {
  try {
    const { provider, email, name, clientId } = req.body;
    if (!provider || !email) {
      return res.status(400).json({ success: false, error: 'Provider and email are required' });
    }
    const newAccount = datastore.addAccount({ provider, email, name, clientId });
    res.status(201).json({ success: true, account: newAccount });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE disconnect account
router.delete('/:id', (req, res) => {
  try {
    const removed = datastore.disconnectAccount(req.params.id);
    if (!removed) {
      return res.status(404).json({ success: false, error: 'Account not found' });
    }
    res.json({ success: true, message: 'Account disconnected', account: removed });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST trigger account sync
router.post('/:id/sync', (req, res) => {
  try {
    const synced = datastore.syncAccount(req.params.id);
    res.json({ success: true, message: 'Account synchronized successfully', synced });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
