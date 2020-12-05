const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.route('/register').post(userController.registerUser);

router.route('/login').post(userController.loginUser);

router.route('/').post(userController.getUserData);

module.exports = router;