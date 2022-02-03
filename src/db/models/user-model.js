const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    login: {type: String, unique: true, required: true },
    hash: {type: String, required: true},
    salt: {type: String, required: true}, 
});

module.exports = User = mongoose.model('User', UserSchema);
