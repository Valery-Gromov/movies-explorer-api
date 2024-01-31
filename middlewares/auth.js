const jwt = require('jsonwebtoken');
const AuthError = require('../utills/AuthError');
const { errorsMessages } = require('../constants/errorsMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // making sure that it exists or starts with Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(errorsMessages.authError);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    // try to verify the token
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // send an error if it didn't work out
    throw new AuthError(errorsMessages.authError);
  }

  req.user = payload; // writing the payload to the request object

  next(); // pass the request further
};

module.exports = auth;
