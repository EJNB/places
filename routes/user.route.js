const express = require('express');
const usersController = require('../controllers/users.controller');
let router = express.Router();
const sessionController = require('../controllers/session.controller');

router.route('/')
// .get()
    .post(usersController.create, sessionController.generateToken, sessionController.sendToken);

module.exports = router;
