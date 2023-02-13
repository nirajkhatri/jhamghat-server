const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10s",
  });
}

async function generateRefreshToken(payload) {
  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
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
