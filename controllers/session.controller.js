const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const User = require('../models/user.model');

function authenticate(req, res, next) {
    //1ro. Validamos q el usuario exista(correo electronico y contraseña validos)
    //2do. Luego de eso vamos a generar el token y luego enviarlo.
    User.findOne({ email: req.body.email })//obtenemos el usuario con dicho correo electronico
        .then(user=> {
            user.verifyPassword(req.body.password)//esta funcion retorna una promesa al igual q el findOne
                .then(valid => {
                    if(valid){
                        req.user = user;
                        next();
                    }else {
                        next(new Error('Invalid Credentials'));
                    }
                });
        })
        .catch(err => next(err));
}

function generateToken(req, res, next) {
    if(!req.user) return next();
    //sign({la informacion q almacenará el token}, secreto)
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
    sendToken,
    authenticate
};
