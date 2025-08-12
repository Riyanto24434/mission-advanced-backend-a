const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Kirim email verifikasi
 * @param {string} email Tujuan email
 * @param {string} verificationToken Token verifikasi unik
 */
const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `${process.env.BASE_URL}/api/auth/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification - EduCourse App",
    html: `
      <h2>Welcome to EduCourse App!</h2>
      <p>Click the link below to verify your email address:</p>
      <p><a href="${verificationUrl}" target="_blank" style="color: blue;">Verify Email</a></p>
      <br/>
      <small>This link will expire in 24 hours.</small>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send verification email:", error.message);
    throw new Error("Email sending failed");
  }
};

module.exports = { sendVerificationEmail };
