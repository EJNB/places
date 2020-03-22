const express = require('express');
const usersController = require('../controllers/users.controller');
const router = express.Router();
const sessionController = require('../controllers/session.controller');
const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secret');

router.route('/')
    .post(
        usersController.create,
        sessionController.generateToken,
        sessionController.sendToken
    )
    .get(
        jwtMiddleware({secret: secrets.jwtSecret}),
        usersController.myPlaces
    );

module.exports = router;
