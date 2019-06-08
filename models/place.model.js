const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const placeSchema = mongoose.Schema({
    title: {
        type: String, require: true
    },
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

placeSchema.plugin(mongoosePaginate);

const Place = mongoose.model('Places', placeSchema);
module.exports = Place;
