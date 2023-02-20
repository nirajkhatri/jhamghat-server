const UserModel = require('../models/user/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const accountVerificationEmail = require('../services/mail/accountVerificationEmail');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/generateToken');
const { REFRESH_TOKEN_SECRET } = require('../config');
const { EMAIL_VERIFICATION_SECRET, CLIENT_URL } = require('../config');

const TokenModel = require('../models/token/token.model');

async function validateSession(req, res) {
  return res.status(200).json({ id: req.user.id, email: req.user.email });
}

async function register(req, res) {
  const { password, confirmPassword, ...userData } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userRegistered = await UserModel.createNewUser({
    ...userData,
    password: hashedPassword,
  });

  if (userRegistered) {
    accountVerificationEmail(userRegistered.email, userRegistered._id);
    return res.status(201).json({
      message: 'Registration successfull',
    });
  }

  return res
    .status(500)
    .json({ message: 'Cannot register user at the moment.' });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      status: 'failed',
      message: 'Required field missing',
    });
  }

  const user = await UserModel.getUser({ email });

  if (!user) {
    return res.status(404).json({
      status: 'failed',
      message: 'User not found',
    });
  }

  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword) {
    return res.status(401).json({
      status: 'failed',
      message: 'Invalid Credential',
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
      .cookie('access_token', access_token, {
        httpOnly: true,
      })
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: 'Logged in successfully',
        user: {
          id: user._id,
          email: user.email,
        },
      });
  }

  return res.status(500).json({
    message: 'Cannot login at the moment.',
  });
}
async function logout(req, res) {
  return res.clearCookie('access_token').clearCookie('refresh_token').json({
    message: 'Logout successfull',
  });
}

async function verifyAccount(req, res) {
  const { token } = req.query;

  jwt.verify(token, EMAIL_VERIFICATION_SECRET, async (err, user) => {
    if (err)
      return res.status(404).json({
        message: 'Verification link expired',
      });

    const userVerified = await UserModel.updateUser({ email: user.email });

    if (userVerified) {
      return res.redirect(`${CLIENT_URL}/login`);
    }
    return res.redirect(`${CLIENT_URL}/register`);
  });
}

async function validateToken(req, res) {
  const refresh_token = req.cookies.refresh_token;

  if (!refresh_token) return res.sendStatus(401);

  jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(401);

    const isTokenValid = await TokenModel.verifyRefreshToken({
      email: user.email,
      refresh_token,
    });

    if (isTokenValid) {
      const tokenPayload = {
        id: user.id,
        email: user.email,
      };

      const access_token = generateAccessToken(tokenPayload);

      return res
        .cookie('access_token', access_token, {
          httpOnly: true,
        })
        .sendStatus(204);
    } else {
      return res.sendStatus(401);
    }
  });
}

module.exports = {
  validateSession,
  register,
  login,
  logout,
  validateToken,
  verifyAccount,
};
