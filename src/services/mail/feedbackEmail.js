const path = require('path');
const ejs = require('ejs');
const { emailTransporter } = require('./emailTransporter');

async function feedbackEmail(email, message) {
  const templatePath = path.join(__dirname, '../../views/feedback.email.ejs');
  const data = await ejs.renderFile(templatePath, {
    message,
  });

  const mailOptions = {
    from: `User Feedback ${email}`,
    to: 'feedback@jhamghatkhajaghar.com',
    subject: 'User Feedback',
    html: data,
  };
  await emailTransporter.sendMail(mailOptions);
}

module.exports = feedbackEmail;
