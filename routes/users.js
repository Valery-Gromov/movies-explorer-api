const router = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/usersControllers');
const { patchUserDataValidator } = require('../utills/validation');

router.get('/me', getCurrentUser);
router.patch('/me', patchUserDataValidator(), updateUserInfo);

module.exports = router;
