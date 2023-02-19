const TokenSchema = require('./token.mongo');

async function createRefreshToken(data) {
  const { email, token } = data;

  return await TokenSchema.findOneAndUpdate(
    { email },
    {
      $push: { token },
    },
    {
      new: true,
      upsert: true,
    }
  );
}

async function getRefreshToken(email) {
  return await TokenSchema.findOne(email, {
    token: 1,
    _id: 0,
  });
}

async function verifyRefreshToken(data) {
  const { email, refresh_token } = data;
  const userRefreshTokens = await getRefreshToken({ email });
  if (userRefreshTokens) {
    const { token } = userRefreshTokens;
    return token.some((item) => item === refresh_token);
  }
}

module.exports = {
  createRefreshToken,
  getRefreshToken,
  verifyRefreshToken,
};
