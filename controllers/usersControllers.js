const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ExistingDataError = require('../utills/ExistingDataError');
const ValidationError = require('../utills/ValidationError');
const NotFoundError = require('../utills/NotFoundError');
const { errorsMessages } = require('../constants/errorsMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

// POST /signup
const createUser = ((req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ExistingDataError(errorsMessages.userExistingDataError));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError(errorsMessages.userValidationError));
      }
      next(err);
    });
});

// POST /signin
const login = ((req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
});

// GET /users/me
const getCurrentUser = (req, res, next) => {
  const id = req.user._id;

  return User.findById(id)
    .orFail(() => { throw new NotFoundError(errorsMessages.userNotFoundError); })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

// PATCH /users/me
const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorsMessages.userNotFoundError);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ExistingDataError(errorsMessages.userExistingDataError));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError(errorsMessages.userValidationError));
      }
      next(err);
    });
};

module.exports = {
  createUser, login, getCurrentUser, updateUserInfo,
};
