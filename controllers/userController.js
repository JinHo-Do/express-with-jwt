const User = require('../model/user');

exports.getProfile = async (req, res) => {
  const {
    user: { _id },
  } = req;

  const user = await User.findById(_id);

  res.json({
    message: '인증 통과 성공',
    userProfile: user,
  });
};
