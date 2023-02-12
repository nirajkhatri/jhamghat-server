const users = require("./user.mongo");

async function getUser(email) {
  return await users.findOne(email);
}

async function registerUser(data) {
  const createUser = await users.create(data);
  return createUser;
}

module.exports = {
  registerUser,
  getUser,
};
