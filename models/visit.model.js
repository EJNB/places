const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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
    observation: String
});

visitModel = mongoose.Model('Visit', visitSchema);

visitSchema.plugin(mongoosePaginate);

module.exports = visitModel;