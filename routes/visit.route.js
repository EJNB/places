const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visit.controller');
const authenticateOwner = require('../middlewares/authenticateOwner.middleware');
// const jwtMiddleware = require('express-jwt');
// const secrets = require('../config/secret');

router.route('/')
    .get(visitController.index)
    .post(visitController.create);

router.route('/:id')
    .delete(
        visitController.find,
        authenticateOwner, // Vericar q sea el propietario.
        visitController.destroy
    );

module.exports = router;
