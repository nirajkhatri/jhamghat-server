const UserSchema = require("./user.mongo");
const TokenSchema = require("./token.model");

async function getUser(email) {
  return await UserSchema.findOne(email, {
    __v: 0,
  });
}

async function createNewUser(data) {
  return (await UserSchema.create(data)) ? true : false;
}

async function createRefreshToken(data) {
  const { email, token } = data;

  return await TokenSchema.findOneAndUpdate(
    { email },
    {
      $push: { token },
    },
    {
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
  createNewUser,
  getUser,
  createRefreshToken,
  verifyRefreshToken,
};
