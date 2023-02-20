const { Router } = require('express');
const { AuthController } = require('../controllers');

const { authorizationMiddleware } = require('../middleware/authMiddleware');
const {
  registerValidationMiddleware,
} = require('../middleware/registrationMiddleware');

const authRouter = Router();

authRouter.get('/logout', authorizationMiddleware, AuthController.logout);
authRouter.get('/validate-token', AuthController.validateToken);
authRouter.get(
  '/validate-session',
  authorizationMiddleware,
  AuthController.validateSession
);
authRouter.get('/verify-account', AuthController.verifyAccount);

authRouter.post(
  '/register',
  registerValidationMiddleware,
  AuthController.register
);
authRouter.post('/login', AuthController.login);

module.exports = authRouter;
