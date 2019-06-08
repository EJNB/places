const express = require('express');
const placeController = require('../controllers/place.controller');
let router = express.Router();

router.route('/')
    .get(placeController.index)
    .post(placeController.create);

router.route('/:id')
    .get(placeController.find, placeController.show)
    .put(placeController.find, placeController.update)
    .delete(placeController.find, placeController.destroy);

module.exports = router;
