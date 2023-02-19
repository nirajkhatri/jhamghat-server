const { Router } = require('express');
const { AuthController } = require('../controllers');

const { authorizationMiddleware } = require('../middleware/authMiddleware');
const {
  registerValidationMiddleware,
} = require('../middleware/registrationMiddleware');

const authRouter = Router();

authRouter.get('/logout', authorizationMiddleware, AuthController.logout);
authRouter.get('/validate_token', AuthController.validateToken);
authRouter.get(
  '/validate_session',
  authorizationMiddleware,
  AuthController.validateSession
);
authRouter.get('/verify_account', AuthController.verifyAccount);

authRouter.post(
  '/register',
  registerValidationMiddleware,
  AuthController.register
);
authRouter.post('/login', AuthController.login);

module.exports = authRouter;
