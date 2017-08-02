var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now},
    facebook: {
        id:    String,
        token: String
    }
}, {collection: "User"});

module.exports = userSchema;