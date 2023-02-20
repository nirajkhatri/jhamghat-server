const { Router } = require('express');

const { EmailController } = require('../controllers');

const emailRouter = Router();

emailRouter.post(
  '/verification-email',
  EmailController.sendAcountVerificationEmail
);
emailRouter.post('/feedback', EmailController.sendFeedbackEmail);
emailRouter.post('/contact', EmailController.sendContactEmail);

module.exports = emailRouter;
