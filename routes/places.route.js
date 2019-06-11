const express = require('express');
const placeController = require('../controllers/place.controller');
let router = express.Router();

router.route('/')
    .get(placeController.index)
    .post(
        placeController.multerMiddleware(),//1ro se van a leer los archivos de la peticion y luego se crean
        placeController.create,
        placeController.saveImage
    );

router.route('/:id')
    .get(placeController.find, placeController.show)
    .put(placeController.find, placeController.update)
    .delete(placeController.find, placeController.destroy);

module.exports = router;
