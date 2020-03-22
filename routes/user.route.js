const express = require('express');
const usersController = require('../controllers/users.controller');
const router = express.Router();
const sessionController = require('../controllers/session.controller');

router.route('/')
    .post(
        usersController.create,
        sessionController.generateToken,
        sessionController.sendToken
    )
    .get(usersController.myPlaces);

module.exports = router;