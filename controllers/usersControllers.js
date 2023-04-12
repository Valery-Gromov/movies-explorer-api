const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ExistingDataError = require('../utills/ExistingDataError');
const ValidationError = require('../utills/ValidationError');

// POST /signup
const createUser = ((req, res, next) => {
  const { email, password, name } = req.body;
  console.log(req.body);
  bcrypt.hash(password, 10)
    .then((hash, err) => User.create({
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
        next(new ExistingDataError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError('Некорретные данные при создании пользователя'));
      }
      next(err);
    });
});

// POST /signin
const login = ((req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
  .then((user) => {
    // const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
    const token = jwt.sign({ _id: user._id }, 'dev-secret');
    res.send({ token });
  })
  .catch(next);
});

// GET /users/me
const getCurrentUser = (req, res, next) => {
  const id = req.user._id;

  return User.findById(id)
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.status(200).send(user))
    .catch(next);
}

// PATCH /users/me
const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ExistingDataError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError('Некорретные данные при создании пользователя'));
      }
      next(err);
    });
}

module.exports = { createUser, login, getCurrentUser, updateUserInfo };