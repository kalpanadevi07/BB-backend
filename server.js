require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});