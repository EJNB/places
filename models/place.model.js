const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('./Upload');
const slugify = require('../plugins/slugify');
const Visit = require('./visit.model');

const placeSchema = mongoose.Schema({
    title: {
        type: String, require: true
    },
    slug: {type: String, unique: true},
    address: String,
    description: String,
    acceptsCreditCard: {
        type: Boolean,
        default: false
    },
    coverImage: String,
    avatarImage: String,
    openHour: Number,
    closeHour: Number,
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

placeSchema.methods.updateImage = function (path, imageType) {
    // Primero es subir la img
    // Guardar el lugar
    return uploader(path)
        .then(secure_url => this.saveImageUrl(secure_url, imageType))
    // .then()
};

placeSchema.methods.saveImageUrl = function (secureUrl, imageType) {
    this.avatarImage = secureUrl;//este this haace referencia al schema de la imagen
    this[imageType + 'Image'] = secureUrl;
    return this.save();
};

/*Los hooks son funciones q podemos enlazar con el ciclo q sigue un documento cuando se guarda,
* se elimina o se actuliza, por ejemplo, despues de q se guarde cualquier documento execute a function o antes de q se guarde,
* o despues de q se actualice, hasta q no se ejecuta la fnc next no seguira la ejecucion */
//este hook se ejecutara antes de guardar
placeSchema.pre('save', function (next) {
    if(this.slug) return next();
    // if(this._id) return next();
    generateSlugAndContinue.call(this, 0, next);
});

placeSchema.statics.validateSlugCount = function (slug) {
    return Place.count({slug: slug}).then(count => {
        if (count > 0)
            return false;
        return true;
    })
};

placeSchema.virtual('visits').get(function () {
    return Visit.find({'_place': this._id}).sort('_id');
});

function generateSlugAndContinue(count, next) {
    this.slug = slugify(this.title);

    if (count != 0)
        this.slug = this.slug + "-" + count;

    Place.validateSlugCount(this.slug).then(isValid => {
        if (!isValid)
            return generateSlugAndContinue.call(this, count + 1, next);
        next();
    });
}

placeSchema.plugin(mongoosePaginate);

const Place = mongoose.model('Places', placeSchema);
module.exports = Place;
