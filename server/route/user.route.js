const controller = require('../controller/user.controller');
const verifyAuth = require('../middleware/authorization/auth.validation.middleware');
const express = require('express');
const router = express.Router();
const config = require('../config/main.config');

router.get('/profile', [verifyAuth.validJWTNeeded,
verifyAuth.minimumPermissionLevelRequired(config.permissionLevel.NORMAL_USER),
controller.profile]);

module.exports = router;