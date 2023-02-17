const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = require('../config');

async function authorizationMiddleware(req, res, next) {
  const { url } = req;

  const token = req.cookies.access_token;

  if (url === '/startsession' && token === undefined)
    return res.sendStatus(202);

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.sendStatus(403);
      }
      return res.sendStatus(401);
    }

    req.user = user;

    next();
  });
}

module.exports = {
  authorizationMiddleware,
};
