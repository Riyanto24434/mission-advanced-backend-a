// sendTestEmail.js - run with `npm run test-email`
const sendMail = require('../utils/sendMail');

(async () => {
  try {
    const previewUrl = await sendMail('test@example.com', 'dummy-token-for-preview');
    console.log('Preview URL:', previewUrl);
  } catch (err) {
    console.error('Error sending test email', err);
  }
})();
