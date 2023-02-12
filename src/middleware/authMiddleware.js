const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { getUser } = require("../models/user.model");

const ref = [];

async function authenticateMiddleware(req, res, next) {
  const { email, password } = req.body;

  const user = await getUser({ email });

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
  const jwtPayload = {
    id: user._id,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10s",
  });

  const refreshToken = jwt.sign(jwtPayload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  ref.push(refreshToken);

  if (accessToken) {
    return res
      .cookie("access_token", accessToken, {
        httpOnly: true,
      })
      .cookie("refresh_token", refreshToken, {
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

  next();
}

async function authorizationMiddleware(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.sendStatus(403);
      }
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
}
async function validateRefreshToken(req, res) {
  const refresh_token = req.cookies.refresh_token;
  if (!refresh_token) return res.sendStatus(401);
  if (!ref.includes(refresh_token)) return res.sendStatus(401);

  jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    const jwtPayload = {
      id: user.id,
      email: user.email,
    };

    const access_token = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });
    return res
      .cookie("access_token", access_token, {
        httpOnly: true,
      })
      .sendStatus(200);
  });
}

module.exports = {
  authenticateMiddleware,
  authorizationMiddleware,
  validateRefreshToken,
};
