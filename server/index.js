import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import emailRoutes from './routes/emailRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/emails', emailRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Personal Assistant Email AI Service',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend static files from client/dist if built
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Fallback to index.html for client-side routing
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(clientDistPath, 'index.html'));
  }
  next();
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ success: false, error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Executive Email Assistant Backend running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`💻 Web Application: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
