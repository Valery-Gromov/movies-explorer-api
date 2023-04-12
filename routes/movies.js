const { getMovies, createMovie, deleteMovie } = require('../controllers/moviesControllers');
const router = require('express').Router();
const { createMovieDataValidator, deleteMovieDataValidator } = require('../utills/validation');

router.get('/', getMovies);
router.post('/', createMovieDataValidator(), createMovie);
router.delete('/:_id', deleteMovieDataValidator(), deleteMovie);

module.exports = router;