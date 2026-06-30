require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

app.use(
  cors({
    origin: [
      "https://hire-ind-talents-frontend.onrender.com",
      "https://idr.brandingbeez.co.uk",
      "http://localhost:5173", // Local development
    ],
    credentials: true,
  })
);

const leadRoutes = require("./routes/leadRoutes");

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

app.use("/api", leadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});