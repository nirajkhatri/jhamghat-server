const nodemailer = require('nodemailer');
const { smtpConfig } = require('../../config/mail.config');

const emailTransporter = nodemailer.createTransport(smtpConfig);

module.exports = { emailTransporter };
