const { getCurrentUser, updateUserInfo } = require('../controllers/usersControllers');
const router = require('express').Router();
const { patchUserDataValidator } = require('../utills/validation');

router.get('/me', getCurrentUser);
router.patch('/me', patchUserDataValidator(), updateUserInfo);

module.exports = router;