const User = require('../models/user.model');
const paramsBuilder = require('./helpers').paramsBuilder;
const validParams = ['email', 'name', 'password'];

function create(req, res, next) {
    let params = paramsBuilder(validParams, req.body);
    User.create(params)
        .then(user => {
            req.user = user;
            // res.json(user)
            next();
        })
        .catch(err => {
            console.log(err);
            res.status(422).json({
                err
            })
        });
}

function myPlaces(req, res) {
    /* Buscamos el user primero, esto nos retornara una promesa y luego hacemos el user.places <- attr virtual*/
    User.findOne({'_id': req.user.id}).then(user => {
        // user.places <- devuelve una promesa por lo q podemos hacer then(places=> {...})
        user.places.then(places => res.json(places))
    }).catch(err => res.json(err))
}

module.exports = {create, myPlaces};
