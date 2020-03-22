module.exports = function (req, res, next) {
    if(req.mainObject && (req.mainObject._user == req.user.id))// si es el propietario de este recurso
        return next();
    next(new Error('Usted no tiene permisos para modificar este recurso.'));
};
