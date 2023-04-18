const Movie = require('../models/movie');
const ValidationError = require('../utills/ValidationError');
const NotFoundError = require('../utills/NotFoundError');
const NoRightsError = require('../utills/NoRightsError');
const { errorsMessages } = require('../constants/errorsMessages');

// GET /movies
const getMovies = (req, res, next) => Movie.find({})
  .then((movies) => {
    const usersMovies = movies.filter((movie) => movie.owner.toString() === req.user._id);

    res.status(200).send({ data: usersMovies });
  })
  .catch(next);

// POST /movies
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(errorsMessages.movieNameValidationError));
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
      throw new NotFoundError(errorsMessages.movieNotFoundError);
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new NoRightsError(errorsMessages.movieNoRightsError);
      }
      return Movie.findByIdAndDelete(req.params._id, { new: true })
        .orFail(() => {
          throw new NotFoundError(errorsMessages.movieNotFoundError);
        })
        .then(() => res.send({ data: movie }))
        .catch(next);
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
