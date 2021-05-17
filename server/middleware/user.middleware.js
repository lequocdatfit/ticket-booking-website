const config = require('../config/main.config');

module.exports.addNormalUser = (req, res, next) => {
  req.body.permissionLevel = config.permissionLevel.NORMAL_USER;
  next();
}

module.exports.addAdmin = (req, res, next) => {
  req.body.permissionLevel = config.permissionLevel.ADMIN;
  next();
}