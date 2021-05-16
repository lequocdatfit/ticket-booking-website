const config = require('../../config/main.config');
const { verifyToken } = require('../../helper/jwt.helper');

module.exports = {
  validJWTNeeded: (req, res, next) => {
    if (req.headers['authorization']) {
      try {
        let authorization = req.headers['authorization'].split(' ');
        if (authorization[0] !== 'Bearer') {
          return res.status(401).json({ errors: ["Invalid header"] });
        } else {
          //req.jwt = jwt.verify(authorization[1], config.jwtSecret);
          req.jwt = verifyToken(authorization[1], config.jwtSecret);
          next();
        }
      } catch (err) {
        return res.status(403).json({ errors: ["JWT Forbidden"] });
      }
    } else {
      return res.status(401).json({ errors: ["Invalid header"] });
    }
  },
  minimumPermissionLevelRequired: (required_permission_level) => {
    return (req, res, next) => {
      let user_permission_level = parseInt(req.jwt.data.permissionLevel);
      //let user_id = req.jwt.user_id;
      if (user_permission_level & required_permission_level) {
        return next();
      } else {
        return res.status(403).json({ errors: ["Permission forbidden"] });
      }
    };
  }
}