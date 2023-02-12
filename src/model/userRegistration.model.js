const users = require("./userRegistration.mongo");

async function registerUser(data) {
  const createUser = await users.create(data);
  return createUser;
}
async function loginUser(data) {
  const isUSer = await users.findOne(data.firstName);
  return isUSer;
}
module.exports = {
  registerUser,
  loginUser,
};
