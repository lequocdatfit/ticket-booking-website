const express = require('express');

const controller = require('../controller/authentication.controller');
const VerifyUserMiddleware = require('../middleware/authorization/verify.user.middleware');
const router = express.Router();

router.post('/register', controller.userRegistaion);
router.post('/login', [VerifyUserMiddleware.isPasswordAndUserMatch, controller.logIn]);
router.post('/refresh-token', controller.refreshToken);

module.exports = router;