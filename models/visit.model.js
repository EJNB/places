const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const REACTIONS = ['like', 'love', 'disappointment', 'yummy', 'anger', 'disgust'];

let visitSchema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    reaction: {type: String, enum: REACTIONS}, // Valores para el enum q son validos para este campo reaccion.
    observation: String
});

visitModel = mongoose.model('Visit', visitSchema);

visitSchema.plugin(mongoosePaginate);

module.exports = visitModel;