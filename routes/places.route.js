const express = require('express');
const placeController = require('../controllers/place.controller');
const router = express.Router();
const authenticateOwner = require('../middlewares/authenticateOwner.middleware');

router.route('/')
    .get(placeController.index)
    .post(
        placeController.multerMiddleware(),//1ro se van a leer los archivos de la peticion
        placeController.create, // luego se crean
        placeController.saveImage //
    );

router.route('/:id')
    .get(placeController.find, placeController.show)
    .put(
        placeController.find,
        authenticateOwner,
        placeController.update
    )
    .delete(
        /* Primero se busca el place mediante el middleware find, el cual pondra en el obj
        * req una propiedad llamada place, */
        placeController.find,
        authenticateOwner,
        placeController.destroy
    );

module.exports = router;
