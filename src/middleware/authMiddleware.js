const jwt = require("jsonwebtoken");

const UserModel = require("../models/user.model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

async function authorizationMiddleware(req, res, next) {
  const { url } = req;

  const token = req.cookies.access_token;

  if (url === "/startsession" && token === undefined)
    return res.sendStatus(202);

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

  jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.sendStatus(401);

      const isTokenValid = await UserModel.verifyRefreshToken({
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
          .cookie("access_token", access_token, {
            httpOnly: true,
          })
          .sendStatus(204);
      } else {
        return res.sendStatus(401);
      }
    }
  );
}

module.exports = {
  authorizationMiddleware,
  validateRefreshToken,
};
