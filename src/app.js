const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { authorizationMiddleware } = require('./middleware/authMiddleware');

const { ALLOWED_ORIGINS } = require('./config');

const {
  registerRouter,
  loginRouter,
  refreshTokenRouter,
  orderRouter,
} = require('./routes');

const app = express();

//middlewares

app.use(helmet());
app.use(cors(ALLOWED_ORIGINS));
app.use(express.json());
app.use(cookieParser());

//routes

app.get('/', (req, res) => {
  return res.json({
    status: 'ok',
    message: 'Server running',
  });
});

app.use(registerRouter);
app.use(loginRouter);
app.use(refreshTokenRouter);
app.use(orderRouter);

app.get('/startsession', authorizationMiddleware, (req, res) => {
  return res.status(200).json({
    id: req.user.id,
    email: req.user.email,
  });
});

app.get('/logout', authorizationMiddleware, (req, res) => {
  return res.clearCookie('access_token').clearCookie('refresh_token').json({
    message: 'Logout successfull',
  });
});

module.exports = app;
