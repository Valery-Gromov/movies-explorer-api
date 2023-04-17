const router = require('express').Router();
const { createUser, login } = require('../controllers/usersControllers');
const { createUserDataValidator, loginUserDataValidator } = require('../utills/validation');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utills/NotFoundError');
const { errorsMessages } = require('../constants/errorsMessages');

router.post('/signup', createUserDataValidator(), createUser);
router.post('/signin', loginUserDataValidator(), login);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/*', (req, res, next) => {
  next(new NotFoundError(errorsMessages.pageNotFoundError));
});

module.exports = router;
