const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const authenticateOwner = require('../middlewares/authenticateOwner.middleware');
const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secret');

router.route('/')
    .get(
        jwtMiddleware({secret: secrets.jwtSecret}),
        favoriteController.index
    )
    .post(favoriteController.create);

router.route('/:id')
    .delete(
        favoriteController.find,
        authenticateOwner, // Vericar q sea el propietario.
        favoriteController.destroy
    );

module.exports = router;
