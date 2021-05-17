const config = require('../config/main.config');

module.exports.addNormalUser = (req, res, next) => {
  req.body.permissionLevel = config.permission.NORMAL_USER;
  next();
}

module.exports.addAdmin = (req, res, next) => {
  req.body.permissionLevel = config.permission.ADMIN;
  next();
}