const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');

const { authorizationMiddleware } = require('./middleware/authMiddleware');
const { ALLOWED_ORIGINS } = require('./config');
const { orderRouter, emailRouter, authRouter } = require('./routes');

const app = express();

const staticPath = path.join(__dirname, '../public');
app.set('views', `${path.join(__dirname, './views')}`);
app.set('view engine', 'ejs');

//middlewares
app.use(express.static(staticPath));
app.use(helmet());
app.use(cors(ALLOWED_ORIGINS));
app.use(express.json());
app.use(cookieParser());

//routes

app.get('/dashboard', (req, res) => {
  return res.render('index');
});

app.use('/auth', authRouter);
app.use('/order', authorizationMiddleware, orderRouter);
app.use(emailRouter);

module.exports = app;
