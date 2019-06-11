const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const User = require('../models/user.model');

function authenticate(req, res, next) {
    User.findOne({ email: req.body.email })
        .then(user=> {
            user.verifyPassword(req.body.password)
                .then(valid => {
                    if(valid){
                        req.user = user;
                        next();
                    }else {

                    }
                });
        });
    // if()
}

function generateToken(req, res, next) {
    if(!req.user) return next();
    //sign({la informacion q almacenara el token}, secreto)
    req.token = jwt.sign({ id: req.user._id }, secret.jwtSecret);
    next();
}

function sendToken(req, res) {
    if(req.user){
        res.json({
            user: req.user,
            jwt: req.token
        })
    }else {
        res.status(422).json({
            error: 'Could not create user'
        })
    }
}

module.exports = {
    generateToken,
    sendToken
};
