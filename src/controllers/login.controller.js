const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

async function authenticateUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      status: "failed",
      message: "Required field missing",
    });
  }

  const user = await UserModel.getUser({ email });

  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  }

  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid Credential",
    });
  }

  const tokenPayload = {
    id: user._id,
    email: user.email,
  };

  const access_token = generateAccessToken(tokenPayload);

  const refresh_token = await generateRefreshToken(tokenPayload);

  if (access_token && refresh_token) {
    return res
      .cookie("access_token", access_token, {
        httpOnly: true,
      })
      .cookie("refresh_token", refresh_token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "Logged in successfully",
        user: {
          id: user._id,
          email: user.email,
        },
      });
  }

  return res.status(500).json({
    message: "Cannot login at the moment.",
  });
}

module.exports = {
  authenticateUser,
};
