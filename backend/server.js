import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';
import reviewRoutes from './routes/reviews.js';

dotenv.config();
const app = express();
app.use(cors({
  origin: [
    "http://localhost:8000",                // local dev
    "https://book-verse-lilac.vercel.app/"      // your actual Vercel URL
  ],
  credentials: true
}));
app.use(express.json());

connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);


app.get('/', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'dev' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

