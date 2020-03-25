const Visit = require('../models/visit.model');
const buildParams = require('./helpers').paramsBuilder;
const validParams = ['_place', 'reaction', 'observation'];
const User = require('../models/user.model');

/**
 * Find visit item by id.
 * @param req
 * @param res
 * @param next
 */
function find(req, res, next) {
    /* Busco el favorito en la collection de favorites por id. */
    Visit.findById(req.params.visit_id).then(visit=> {
        req.mainObject = visit; // lo guardamos en el mainObject para q nos sirva para proteger por propietario
        req.visit = visit;
        next();
    }).catch(next);
}

function destroy(req, res) {
    req.visit.remove()
        .then(favorite => res.json(favorite))
        .catch(err=> res.json(err));
}

function create(req, res) {
    // crea un array asociativo con las claves y valor de lo q viene en body del request
    // pero 100pre y cuando las claves esten en el array validParams
    let params = buildParams(validParams, req.body);
    params['_user'] = req.user.id;

    Visit.create(params)
        .then(visit=> res.json(visit))
        .catch(err=> res.status(422).json({err}));
}

function index(req, res) {
    let promise = null;

    if(req.place) {
        promise = req.place.visits;
    } else if (req.user) {
        // El metodo estatico forUser nos devolvera las visitas de un user
        promise = Visit.forUser(req.user.id, req.query.page || 1);
    }

    if (promise) {
        promise.then(visits=> res.json(visits))
            .catch(err=> res.status(500).json(err));
    } else {
        res.status(404).json({});
    }
}

module.exports = { create, destroy, find, index };
