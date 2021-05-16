const UserModel = require('../model/users.model');

module.exports.profile = async (req, res) => {
  let user = await UserModel.findById(req.jwt.data._id);
  user = user.toJSON();
  delete user._id;
  delete user.__v;
  delete user.hashedPassword;
  //console.log(user);
  // if (!user) {
  //   return res.status(404).json({ errors: ['Not found'] });
  // }
  res.status(200).json(user);
}