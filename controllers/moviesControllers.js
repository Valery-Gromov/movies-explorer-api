const Movie = require('../models/movie');
const ValidationError = require('../utills/ValidationError');
const NotFoundError = require('../utills/NotFoundError');
const NoRightsError = require('../utills/NoRightsError');

// GET /movies
const getMovies = (req, res, next) => Movie.find({})
  .then((movies) => res.status(200).send({ data: movies }))
  .catch(next);

// POST /movies
const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN } = req.body;
  const owner = req.user._id;

  Movie.create({ country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN, owner })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорретные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

// DELETE /movies/_id
const deleteMovie = (req, res, next) => {
  console.log(req.params._id);

  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new NoRightsError('Вы не можете удалить фильм другого пользователя');
      }
      return Movie.findByIdAndDelete(req.params._id, { new: true })
        .orFail(() => {
          throw new NotFoundError('Фильм не найден');
        })
        .then(() => res.send({ data: movie }))
        .catch(next);
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };