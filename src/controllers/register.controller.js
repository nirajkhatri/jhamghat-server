const UserModel = require("../models/user.model");

const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { password, confirmPassword, ...userData } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userRegistered = await UserModel.createNewUser({
    ...userData,
    password: hashedPassword,
  });

  if (userRegistered) {
    return res.status(201).json({
      message: "Registration successfull",
    });
  }

  return res
    .status(500)
    .json({ message: "Cannot register user at the moment." });
}

module.exports = { registerUser };
