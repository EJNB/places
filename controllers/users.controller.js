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

module.exports = { create };
