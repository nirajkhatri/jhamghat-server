const UserModel = require("../models/user.model");

async function registerValidationMiddleware(req, res, next) {
  const userRegisterationData = req.body;

  const isAnyInputEmpty = Object.values(userRegisterationData).some(
    (value) => value == null || value == ""
  );

  if (isAnyInputEmpty) {
    return res.status(422).json({
      status: "failed",
      message: "Please check input values",
    });
  }

  const { email, password, confirmPassword } = userRegisterationData;

  if (password !== confirmPassword)
    return res.status(422).json({
      message: "Confirm password doesnot matched",
    });

  const userAlreadyExist = await UserModel.getUser({ email });

  if (userAlreadyExist) {
    return res.status(409).json({
      message: "User already exist",
    });
  }

  next();
}

module.exports = {
  registerValidationMiddleware,
};
