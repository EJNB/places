const Place = require('../models/place.model');
const upload = require('../config/upload');
const helpers = require('./helpers');
const validParams = ['title', 'description', 'address', 'acceptsCreditCard', 'openHour', 'closeHour'];

function find(req, res, next) {
    // Place.findOne({ slug: req.params.id }) esto es caso de q quiera buscar por slug
    Place.findById(req.params.id)
    /*en este caso guardaremos una prop en el objeto req, para usarlo en los siguientes middlewares*/
        .then(place => {
            req.place = place;
            next()
        })
        .catch(err => next(err))/*cuando enviamos algun argumento a next se asume q es un error q sucedio*/
}

function index(req, res) {
    /**paginate tambien hace el uso de filtros paginate({filtros}, {paginacion})*/
    Place.paginate({}, {page: req.query.page || 1, limit: 8, sort: {'_id': -1}})
        .then(places => res.json(places))
        .catch(err => console.log(err));
}

function create(req, res, next) {

    const params = helpers.paramsBuilder(validParams, req.body);
    /*{
        title: req.body.title,
            description: req.body.description,
        acceptsCreditCard: req.body.acceptsCreditCard,
        coverImage: req.body.coverImage,
        avatarImage: req.body.avatarImage,
        openHour: req.body.openHour,
        closeHour: req.body.closeHour
    }*/

    Place.create(params)
        .then(doc => {
            req.place = doc;
            // next();
            res.json(doc);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
}

function update(req, res) {
    //validar los attr

    let placeParams = {};
    // attrs.forEach(attr => {
    //     if (Object.prototype.hasOwnProperty.call(req.body, attr)) ;
    //     placeParams[attr] = req.body[attr];
    // });

    // Place.update({'_id': req.params.id}, placeParams, {new: true})
    //     .then(place => res.json(place))
    //     .catch(err => console.log(err));

    // console.log(req.body);
    // console.log(req.place);
    // res.json('hola mundo');
    const params = helpers.paramsBuilder(validParams, req.body);
    req.place = Object.assign(req.place, params);
    req.place.save()
        .then(place => res.json(place))
        .catch(err => console.log(err));
}

function destroy(req, res) {
    // Place.findByIdAndRemove(req.params.id)
    req.place.remove()
        .then(doc => res.json(doc))
        .catch(err => console.log(err))
}

function show(req, res) {
    // Place.findById(req.params.id)
    //     .then(place => res.json(place))
    //     .catch(err => console.log(err));
    res.json(req.place)
    // .then(place => res.json(place))
    // .catch(err => console.log(err));
}

function multerMiddleware() {
    return upload.fields([
        {name: 'avatar', maxCount: 1},
        {name: 'cover', maxCount: 1}
    ]);
}

function saveImage(req, res) {
    if (req.place) {
        const files = ['avatar', 'cover'];
        const promises = [];

        files.forEach(imageType => {
            if (req.files && req.files[imageType]) {//si vienen archivos en mi request y no viene una prop avatar
                const path = req.files[imageType][0].path;//obtengo el path del avatar
                promises.push(req.place.updateImage(path, imageType));
            }
        });

        Promise.all(promises)
            .then(result => {
                console.log(result);
                res.json(req.place)
            })
            .catch(err => console.log(err))
    } else {
        res.status(422).json({
            error: req.error || 'Cloud not save place'
        });
    }
}

module.exports = {index, create, update, destroy, show, find, multerMiddleware, saveImage};
