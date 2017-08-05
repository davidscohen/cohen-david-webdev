var mongoose = require('mongoose');
var projectUserSchema = require('./user.schema.server');
var userModel = mongoose.model('ProjectUserModel', projectUserSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.findUserByUsername = findUserByUsername;
userModel.addWebsite = addWebsite;
userModel.deleteWebsite = deleteWebsite;
userModel.findAllUsers = findAllUsers;
userModel.findUserByGoogleId = findUserByGoogleId;

module.exports = userModel;

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id: userId}, {$set: newUser});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function deleteWebsite(userId, websiteId, currentUserId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            if ( user._id === currentUserId ) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        }
        });

}

function findAllUsers() {
    return userModel.find();
}
