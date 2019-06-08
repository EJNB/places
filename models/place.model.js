const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('./Upload');
const slugify = require('../plugins/slugify');

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
    closeHour: Number
});

placeSchema.methods.updateImage = function (path, imageType) {
    //Primero es subir la img
    return uploader(path)
        .then(secure_url => this.saveImageUrl(secure_url, imageType))
    // .then()
    //guardar el lugar
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
    if(this.slug) next();
    generateSlugAndContinue.call(this, 0, next);
});

placeSchema.statics.validateSlugCount = function (slug) {
    return Place.count({slug: slug}).then(count => {
        if (count > 0)
            return false;
        return true;
    })
};

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
