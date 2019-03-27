require('dotenv').config();
const { checkToken } = require('../middlewares/passport');

// const passport = require('passport');
// const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
  res.json({
    message: '회원 가입 성공',
    user: req.user,
  });
};

exports.login = checkToken;
