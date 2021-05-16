const validation = require('../helper/verify.helper');
const userModel = require('../model/users.model');
const crypto = require('crypto');
const config = require('../config/main.config');
const jwtHelper = require('../helper/jwt.helper');

module.exports.userRegistaion = async (req, res) => {
  if (!validation.emailValidation(req.body.email)) {
    res.status(400).json({ error: 'invalid email' });
    return;
  }
  if (await userModel.isEmailExisted(req.body.email)) {
    res.status(400).json({ error: 'email is already exist' });
    return;
  }
  let salt = crypto.randomBytes(16).toString('base64');
  let hash = crypto.createHmac('sha512', salt)
    .update(req.body.password)
    .digest("base64");
  req.body.hashedPassword = salt + "$" + hash;
  req.body.permissionLevel = 1;
  let user = await userModel.createUser(req.body);
  user = user.toJSON();
  delete user.hashedPassword;
  delete user._id;
  res.status(201).json(user);
}

module.exports.logIn = (req, res) => {
  try {
    let token = jwtHelper.generateToken(req.body, config.jwtSecret, config.tokenLife);
    let refresh_token = jwtHelper.generateToken(req.body, config.refreshSecret, config.refreshLife);
    res.status(201).send({ accessToken: token, refreshToken: refresh_token });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
}

module.exports.refreshToken = (req, res) => {
  if (req.body.refreshToken) {
    try {
      const decoded = jwtHelper.verifyToken(req.body.refreshToken, config.refreshSecret);
      const accessToken = jwtHelper.generateToken(decoded.data, config.jwtSecret, config.tokenLife);
      res.status(200).json({ accessToken: accessToken });
      return;
    } catch (err) {
      res.status(403).json({ errors: err, message: "Invalid token" });
    }
  } else {
    res.status(403).json({ errors: err, message: "No token provided" });
  }
}