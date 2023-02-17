const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');
const { REFRESH_TOKEN_SECRET } = require('../config');
const { generateAccessToken } = require('../utils/generateToken');

async function validateRefreshToken(req, res) {
  const refresh_token = req.cookies.refresh_token;
  if (!refresh_token) return res.sendStatus(401);

  jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, async (err, user) => {
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
  validateRefreshToken,
};
