var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('ProjectWebsiteModel', websiteSchema);
var userModel = require('../user/user.model.server');

module.exports = websiteModel;

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.deletePage = deletePage;
websiteModel.addPage = addPage;

function createWebsiteForUser(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id)
        })
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({});
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website,currentUserId) {
    return websiteModel.update({_id: websiteId}, {$set: website});
}

function deleteWebsite(userId, websiteId, currentUserId) {
        return websiteModel
            .remove({_id: websiteId})
            .then(function (status) {
                return userModel
                    .deleteWebsite(userId, websiteId, currentUserId);
            });
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}

function deletePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}

