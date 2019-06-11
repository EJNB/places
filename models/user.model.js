const mongoose= require('mongoose');
const mongooseBycryt = require('mongoose-bcrypt');

let userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: String,
    admin: { type: Boolean, default: false }
});

userSchema.plugin(mongooseBycryt);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
