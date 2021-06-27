const userModel = require("../model/users.model");
const crypto = require("crypto");
const config = require("../config/main.config");
const jwtHelper = require("../helper/jwt.helper");
const userController = require("./user.controller");

module.exports.addNormalUser = async (req, res, next) => {
  req.body.permissionLevel = 1;
  next();
};

module.exports.logIn = (req, res) => {
  try {
    let token = jwtHelper.generateToken(
      req.body,
      config.jwtSecret,
      parseInt(config.tokenLife)
    );
    let refresh_token = jwtHelper.generateToken(
      req.body,
      config.refreshSecret,
      config.refreshLife
    );
    res.status(201).send({ accessToken: token, refreshToken: refresh_token });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};

module.exports.refreshToken = (req, res) => {
  if (req.body.refreshToken) {
    try {
      const decoded = jwtHelper.verifyToken(
        req.body.refreshToken,
        config.refreshSecret
      );
      const accessToken = jwtHelper.generateToken(
        decoded.data,
        config.jwtSecret,
        config.tokenLife
      );
      res.status(200).json({ accessToken: accessToken });
      return;
    } catch (err) {
      res.status(403).json({ errors: err, message: "Invalid token" });
    }
  } else {
    res.status(403).json({ errors: err, message: "No token provided" });
  }
};
