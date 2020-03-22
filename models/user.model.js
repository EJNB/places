const mongoose = require('mongoose');
const mongooseBycryt = require('mongoose-bcrypt');
const Place = require('./place.model');
const FavoritePlace = require('./favoritePlace.model');

let userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: String,
    admin: {type: Boolean, default: false}
});

//uso de un hook, en este caso despues de q se guarda
userSchema.post('save', function (user, next) {
    userModel.count({}).then(count => {
        if (count == 1)
            userModel.update({'_id': user._id}, {admin: true})
                .then(result => next());
        next();

    })
});

/*los virtuals son attrs virtuales de un documento,
los virtuales son para obtener datos y para enviarlos
* @return promise
*/
userSchema.virtual('places').get(function () {
    return Place.find({ '_user': this._id }); // La variable this hace referencia al user actual ej: user.places <===> this= places
});

userSchema.virtual('favorites').get(function () {
    return FavoritePlace.find({ '_user': this._id }, { '_place': true })
        .then(favorites=> {
            let placeIds = favorites.map(fav=> fav._place);
            return Place.find({ '_id': {$in : placeIds }});
        });
});

userSchema.plugin(mongooseBycryt);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
