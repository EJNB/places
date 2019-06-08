const Place = require('../models/place.model');

function find(req, res, next) {
    Place.findById(req.params.id)
    /*en este caso guardaremos una prop en el objeto req, para usarlo en los siguientes middlewares*/
        .then(place=> {
            req.place = place;
            next()
        })
        .catch(err=> next(err))/*cuando enviamos algun argumento a next se asume q es un error q sucedio*/
}

function index(req, res) {
    /**paginate tambien hace el uso de filtros paginate({filtros}, {paginacion})*/
    Place.paginate({}, {page: req.query.page || 1, limit: 8, sort: { '_id': -1 }})
        .then(places => res.json(places))
        .catch(err => console.log(err));
}

function create(req, res) {
    // const attrs = ['title', 'description', 'acceptsCreditCard', 'coverImage', 'avatarImage', 'openHour', 'closeHour'];
    // let placeParams = {};
    // attrs.forEach(attr => {
    //     if (Object.prototype.hasOwnProperty.call(req.body, attr)) ;
    //     placeParams[attr] = req.body[attr];
    // });
    // console.log(req.body);


    Place.create({
        title: req.body.title,
        description: req.body.description,
        acceptsCreditCard: req.body.acceptsCreditCard,
        coverImage: req.body.coverImage,
        avatarImage: req.body.avatarImage,
        openHour: req.body.openHour,
        closeHour: req.body.closeHour
    })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
}

function update(req, res) {
    //validar los attr
    const attrs = ['title', 'description', 'acceptsCreditCard', 'coverImage', 'avatarImage', 'openHour', 'closeHour'];
    let placeParams = {};
    attrs.forEach(attr => {
        if (Object.prototype.hasOwnProperty.call(req.body, attr)) ;
        placeParams[attr] = req.body[attr];
    });

    // Place.update({'_id': req.params.id}, placeParams, {new: true})
    //     .then(place => res.json(place))
    //     .catch(err => console.log(err));

    // console.log(req.body);
    // console.log(req.place);
    // res.json('hola mundo');
    req.place = Object.assign(req.place, placeParams);
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

module.exports = {index, create, update, destroy, show, find };
