var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    username: String,
    password: String,
    profile_picture: Object,
    decks: Array,
    isActive: false,
    color: String,
    createdAt: Date
}, { collection: 'users' }); 

module.exports = UserSchema;