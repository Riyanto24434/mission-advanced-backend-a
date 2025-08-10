const nodemailer = require('nodemailer');

async function sendMail(to, token) {
  // create test account (ethereal) - only for dev/testing
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  const verifyUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;

  const info = await transporter.sendMail({
    from: '"EduCourse" <no-reply@educourse.app>',
    to,
    subject: 'Verify your EduCourse account',
    html: `
      <p>Terima kasih sudah mendaftar di EduCourse.</p>
      <p>Silakan klik link berikut untuk verifikasi email:</p>
      <p><a href="${verifyUrl}">${verifyUrl}</a></p>
      <p>Link ini berlaku sementara (development).</p>
    `
  });

  // IMPORTANT: in development, nodemailer provides a preview URL
  const previewUrl = nodemailer.getTestMessageUrl(info);
  console.log('Email sent. Preview URL:', previewUrl);
  return previewUrl;
}

module.exports = sendMail;
