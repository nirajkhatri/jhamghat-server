const path = require('path');
const ejs = require('ejs');
const { emailTransporter } = require('./emailTransporter');

async function contactEmail(email, message) {
  const templatePath = path.join(__dirname, '../../views/contact.email.ejs');
  const data = await ejs.renderFile(templatePath, {
    message,
  });

  const mailOptions = {
    from: `User Feedback ${email}`,
    to: 'contact@jhamghatkhajaghar.com',
    subject: 'User Feedback',
    html: data,
  };
  await emailTransporter.sendMail(mailOptions);
}

module.exports = contactEmail;
