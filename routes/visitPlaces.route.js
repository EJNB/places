const express = require('express');
const router = express.Router();

const visitController = require('../controllers/visit.controller');
const authenticateOwner = require('../middlewares/authenticateOwner.middleware');
const placesController = require('../controllers/place.controller');

/* Todas las visitas de un lugar. */
router.route('/:id/visits')
    /* Para mostrar todos los negocios de un lugar, 1ro Voy encontrar el lugar*/
    .get(placesController.find, visitController.index)
    .post(placesController.find, visitController.create);

router.route('/:id/visits/:visit_id')
    .delete(
        visitController.find,
        authenticateOwner, // Vericar q sea el propietario.
        visitController.destroy
    );

module.exports = router;
