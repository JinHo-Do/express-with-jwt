const router = require('express').Router();
const passport = require('passport');
const { signUp, login } = require('../controllers/authController');

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  signUp,
);
router.post('/login', login);

module.exports = router;
