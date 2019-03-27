require('dotenv').config();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../model/user');

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.create({ email, password });
        return done(null, user);
      } catch (error) {
        console.log('회원 가입 에러: ', error);
        return done(error);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: '등록 되지 않은 이용자입니다.' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: '비밀번호가 틀렸습니다.' });
        }

        return done(null, user, { message: '로그인 되었습니다.' });
      } catch (error) {
        console.log('로그인 에러: ', error);
        return done(error);
      }
    },
  ),
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

exports.signup = passport.authenticate('signup', { session: false });

exports.checkToken = (req, res, next) =>
  passport.authenticate('login', async (err, user /* info */) => {
    try {
      if (err || !user) {
        const error = new Error('로그인 실패');
        return next(error);
      }

      req.login(user, { session: false }, async error => {
        if (error) {
          return next(error);
        }

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
