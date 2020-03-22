const Favorite = require('../models/favoritePlace.model');
const buildParams = require('./helpers').paramsBuilder;
const validParams = ['_place'];
const User = require('../models/user.model');

/**
 * Find favorite item by id.
 * @param req
 * @param res
 * @param next
 */
function find(req, res, next) {
    /* Busco el favorito en la collection de favorites por id. */
    Favorite.findById(req.params.id).then(fav=> {
        req.mainObject = fav; // lo guardamos en el mainObject para q nos sirva para proteger por propietario
        req.favorite = fav;
        next();
    }).catch(next);
}

function destroy(req, res) {
    req.favorite.remove()
        .then(favorite => res.json(favorite))
        .catch(err=> res.json(err));
}

function create(req, res) {
    // crea un array asociativo con las claves y valor de lo q viene en body del request
    // pero 100pre y cuando las claves esten en el array validParams
    let params = buildParams(validParams, req.body);
    params['_user'] = req.user.id;

    Favorite.create(params)
        .then(favorite=> res.json(favorite))
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
