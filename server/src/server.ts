import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: 'Terlalu banyak request. Sinyal terputus sementara. Coba lagi nanti.' }
});
app.use('/api/', limiter);

// Basic routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Spider-Sense active & server connected.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[spider-server] Swing over to http://localhost:${PORT}`);
});
