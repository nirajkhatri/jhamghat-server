const nodemailer = require('nodemailer');
const { smtpConfig } = require('../../config/mail.config');

const transporter = nodemailer.createTransport(smtpConfig);

module.exports = { transporter };
