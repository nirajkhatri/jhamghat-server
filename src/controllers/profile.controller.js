const UserModel = require('../models/user/user.model');

async function getUser(req, res) {
  const { email } = req.user;
  const user = await UserModel.getUser({ email });
  return res.json({
    profile: user,
  });
}

async function updateUser(req, res) {
  const shippingAddress = req.body;
  const { email } = req.user;
  const user = await UserModel.updateShippingAddress(email, shippingAddress);
  if (user) {
    return res.json({
      message: 'Shipping address added',
    });
  }
}

module.exports = {
  getUser,
  updateUser,
};
