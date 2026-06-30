require('dotenv').config();

// ← ADD THESE IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
// Add any other imports you need (cors, routes, etc.)

const app = express();  // ← ADD THIS

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

// Middleware (if you need CORS, JSON parsing, etc.)
app.use(express.json());
// app.use(cors()); // uncomment if needed

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('✓ MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.log('✗ MongoDB error:', err);
});

// Setup SMTP/Nodemailer
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true, // SSL
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});