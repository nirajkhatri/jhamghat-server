const { SMTP_HOST, SMTP_PORT, SMTP_USER_EMAIL, SMTP_USER_PASSWORD } =
  process.env;

const smtpConfig = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER_EMAIL,
    pass: SMTP_USER_PASSWORD,
  },
};

module.exports = {
  smtpConfig,
};
