const { celebrate, Joi } = require('celebrate');

const createUserDataValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(/^\S+@\S+\.\S+$/),
    password: Joi.string().required(),
  }),
});

const loginUserDataValidator = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(/^\S+@\S+\.\S+$/),
    password: Joi.string().required(),
  }),
});

const patchUserDataValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(/^\S+@\S+\.\S+$/),
  }),
});

const createMovieDataValidator = () => celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
    trailerLink: Joi.string().required().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
    thumbnail: Joi.string().required().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieDataValidator = () => celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  createUserDataValidator,
  loginUserDataValidator,
  patchUserDataValidator,
  createMovieDataValidator,
  deleteMovieDataValidator,
};
