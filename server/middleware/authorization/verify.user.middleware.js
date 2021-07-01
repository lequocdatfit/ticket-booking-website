const userModel = require('../../model/users.model');
const crypto = require('crypto');

module.exports.isPasswordAndUserMatch = (req, res, next) => {
  userModel.findByEmail(req.body.email)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: 'User\'s not exist' });
      } else {
        let passwordFields = user.hashedPassword.split('$');
        let salt = passwordFields[0];
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        if (hash === passwordFields[1]) {
          req.body = {
            _id: user._id,
            email: user.email,
            permissionLevel: user.permissionLevel,
            fullName: user.fullName,
          };
          req.user = user;
          return next();
        } else {
          return res.status(400).json({ error: 'Invalid email or password'});
        }
      }
    });
};