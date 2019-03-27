const router = require('express').Router();
const { getProfile } = require('../controllers/userController');

router.get('/profile', getProfile);

module.exports = router;
