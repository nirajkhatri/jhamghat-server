const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token/token.model');

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  EMAIL_VERIFICATION_SECRET,
} = require('../config');

function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
}

async function generateRefreshToken(payload) {
  const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  });

  const tokenSaved = await TokenModel.createRefreshToken({
    email: payload.email,
    token: [refresh_token],
  });

  if (!tokenSaved) return null;

  return refresh_token;
}

function generateEmailVerificationToken(payload) {
  return jwt.sign(payload, EMAIL_VERIFICATION_SECRET, {
    expiresIn: '15m',
  });
}
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateEmailVerificationToken,
};
