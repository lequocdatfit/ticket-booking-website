const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (data, sercetKey, tokenLife) => {
    return jwt.sign({ data }, sercetKey, { algorithm: "HS256", expiresIn: tokenLife });
  },
  verifyToken: (token, sercetKey) => {
    return jwt.verify(token, sercetKey);
  }
}