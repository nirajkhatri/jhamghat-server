const UserSchema = require('./user.mongo');

async function getUser(email) {
  return await UserSchema.findOne(email, {
    __v: 0,
  });
}

async function createNewUser(data) {
  return await UserSchema.create(data);
}

async function updateShippingAddress(email, shippingAddress) {
  return await UserSchema.findOneAndUpdate(email, {
    $set: {
      address: {
        shipping_address: shippingAddress,
      },
    },
  });
}

async function updateUser(email) {
  return await UserSchema.findOneAndUpdate(email, {
    $set: { emailVerified: true },
  });
}

module.exports = {
  createNewUser,
  getUser,
  updateUser,
  updateShippingAddress,
};
