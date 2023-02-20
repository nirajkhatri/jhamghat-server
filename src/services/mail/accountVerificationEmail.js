const path = require('path');
const ejs = require('ejs');
const { emailTransporter } = require('./emailTransporter');
const { generateEmailVerificationToken } = require('../../utils/generateToken');
const { BASE_URL } = require('../../config');

async function accountVerificationEmail(email, id) {
  const email_verification_token = generateEmailVerificationToken({
    email,
    id,
  });
  const templatePath = path.join(
    __dirname,
    '../../views/account.verification.email.ejs'
  );
  const data = await ejs.renderFile(templatePath, {
    verifyLink: `${BASE_URL}/auth/verify-account?token=${email_verification_token}`,
  });

  const mailOptions = {
    from: 'Jhamghat Khajaghar noreply@jhamghatkhajaghar.com',
    to: email,
    subject: 'Email Verification',
    html: data,
  };
  await emailTransporter.sendMail(mailOptions);
}

module.exports = accountVerificationEmail;
