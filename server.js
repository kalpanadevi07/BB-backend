require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

app.use(express.json());

// Connect to MongoDB (no deprecated options)
mongoose.connect(MONGO_URI)
  .then(() => console.log('✓ MongoDB connected'))
  .catch((err) => console.log('✗ MongoDB error:', err.message));

// Setup SMTP/Nodemailer
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});