const passport = require('passport');
const homeRouter = require('./homeRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

module.exports = app => {
  app.use('/', homeRouter);
  app.use('/auth', authRouter);

  // Check JWT
  app.use(passport.authenticate('jwt', { session: false }));
  app.use('/user', userRouter);
};
