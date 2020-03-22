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
    /* Aqui ya tengo el req.user por q previamente se ejecuto el jwtMiddleware
    * 1ro: Encontrar el usuario.
    * 2do: Get los favoritos de este user.
    * */
    User.findOne({'_id': req.user.id}).then(user => {
        user.favorites.then(places=> res.json(places))
    }).catch(err=> res.json(err));
}

module.exports = { create, destroy, find, index };
