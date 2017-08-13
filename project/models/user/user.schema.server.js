var mongoose = require('mongoose');

var projectUserSchema = mongoose.Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectWebsiteModel"}],
    dateCreated: {type: Date, default: Date.now},
    google: {
        id:    String,
        token: String
    },
    facebook: {
        id:    String,
        token: String
    },
    role:{type:String ,enum:['Visual Artist', 'Writer', 'Admin', 'Guest'], default: 'Visual Artist'}
}, {collection: "projectUser"});

module.exports = projectUserSchema;