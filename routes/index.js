const router = require('express').Router();
const { createUser, login } = require('../controllers/usersControllers');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);
router.post('/signin', login);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

module.exports = router;