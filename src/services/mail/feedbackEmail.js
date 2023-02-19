const path = require('path');
const ejs = require('ejs');
const { transporter } = require('./transporter');

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
  await transporter.sendMail(mailOptions);
}

module.exports = feedbackEmail;
