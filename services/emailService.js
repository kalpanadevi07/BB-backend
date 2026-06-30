const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ==========================
// Admin Notification Email
// ==========================
const sendLeadNotification = async (lead) => {
  await transporter.sendMail({
    from: `"BrandingBeez Leads" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,

    subject: "🚀 New Lead Received",

    html: `
      <h2>New Lead Submission</h2>

      <p><strong>Name:</strong> ${lead.fullName}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>

      <p><strong>Roles:</strong></p>
      <ul>
        ${lead.roles.map(role => `<li>${role}</li>`).join("")}
      </ul>

      <p><strong>Work Types:</strong></p>
      <ul>
        ${lead.workTypes.map(type => `<li>${type}</li>`).join("")}
      </ul>

      <hr/>

      <p>
        Submitted from BrandingBeez website.
      </p>
    `,
  });

  console.log("✅ Admin notification sent");
};

// ==========================
// User Auto Reply
// ==========================
const sendAutoReply = async (lead) => {
  await transporter.sendMail({
    from: `"BrandingBeez" <${process.env.SMTP_USER}>`,
    to: lead.email,

    subject: "Thank you for contacting BrandingBeez",

    html: `
      <div style="font-family:Arial,sans-serif;">
        <h2>Hello ${lead.fullName},</h2>
<p>Phone number: ${lead.phone}</p>
        <p>
         Thank you for submitting your hiring requirements.
        </p>

        <p>
          We've successfully received your request and our team is currently reviewing the information provided.
        </p>

<p>
          Your Request Summary
        </p>

        <p>
          Roles Required: 
          <strong>${lead.roles.join(", ")}</strong>
        </p>

        <p>
          Work Type:
          <strong>${lead.workTypes.join(", ")}</strong>
        </p>

        <p>
        The next step is a brief consultation call to better understand your requirements, team structure, preferred skill set, and expectations. This helps us identify and recommend the most suitable candidates for your business.
</p>

<p>
One of our team members will contact you shortly to arrange a call.
If you'd prefer to schedule a time that works best for you, you can book a consultation directly using the link below:
</p>

<p>
Book a Call: 
<a href="https://calendly.com/raje-brandingbeez" target="_blank">Schedule Here</a>
</p>
<p>
We look forward to speaking with you and helping you build your team.
</p>
        <br/>

        <p>
          Kind Regards,<br/>
          BrandingBeez Team
        </p>
      </div>
    `,
  });

  console.log("✅ Auto reply sent");
};

module.exports = {
  sendLeadNotification,
  sendAutoReply,
};