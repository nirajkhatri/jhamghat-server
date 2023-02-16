const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("./config");

function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

async function generateRefreshToken(payload) {
  const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  const tokenSaved = await UserModel.createRefreshToken({
    email: payload.email,
    token: [refresh_token],
  });

  if (!tokenSaved) return null;

  return refresh_token;
}
module.exports = { generateAccessToken, generateRefreshToken };
