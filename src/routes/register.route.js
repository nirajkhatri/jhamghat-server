const { Router } = require('express');

const RegisterController = require('../controllers/register.controller');
const {
  registerValidationMiddleware,
} = require('../middleware/registrationMiddleware');

const registerRouter = Router();

registerRouter.post(
  '/register',
  registerValidationMiddleware,
  RegisterController.registerUser
);

module.exports = registerRouter;
