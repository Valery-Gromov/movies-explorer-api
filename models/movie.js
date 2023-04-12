const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country : {
    type: String,
    required: true,
  },
  director : {
    type: String,
    required: true,
  },
  duration : {
    type: Number,
    required: true,
  },
  year : {
    type: Number,
    required: true,
  },
  description : {
    type: String,
    required: true,
  },
  image: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(v);
      },
      message: (props) => `${props.value} is not a valid url`,
    },
  },
  trailerLink: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(v);
      },
      message: (props) => `${props.value} is not a valid url`,
    },
  },
  thumbnail: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(v);
      },
      message: (props) => `${props.value} is not a valid url`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId : { // Поменять поле, когда разберусь с Moovies Explorer
    type: String,
    required: true,
  },
  nameRU : {
    type: String,
    required: true,
  },
  nameEN : {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);