const UserModel = require('../models/user/user.model');
const accountVerificationEmail = require('../services/mail/accountVerificationEmail');
const contactEmail = require('../services/mail/contactEmail');
const feedbackEmail = require('../services/mail/feedbackEmail');

async function sendAcountVerificationEmail(req, res) {
  const { email } = req.body;

  const userExist = await UserModel.getUser({ email });

  if (userExist) {
    if (userExist.emailVerified) {
      return res.status(409).json({
        message: 'Email already verified',
      });
    }
    accountVerificationEmail(userExist.email, userExist.id);
    return res.json({
      message: 'Verification Sent succcessfully',
    });
  }
  return res.status(404).json({
    message: 'User not found',
  });
}

async function sendFeedbackEmail(req, res) {
  const { email, message } = req.body;
  feedbackEmail(email, message);
  return res.json({
    message: 'Feedback Sent succcessfully',
  });
}
async function sendContactEmail(req, res) {
  const { email, message } = req.body;
  contactEmail(email, message);
  return res.json({
    message: 'We will contact you soon',
  });
}

module.exports = {
  sendAcountVerificationEmail,
  sendFeedbackEmail,
  sendContactEmail,
};
