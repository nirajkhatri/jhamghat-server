const { Router } = require('express');

const RefreshTokenController = require('../controllers/refreshtoken.controller');

const refreshTokenRouter = Router();

refreshTokenRouter.post(
  '/refresh_token',
  RefreshTokenController.validateRefreshToken
);

module.exports = refreshTokenRouter;
