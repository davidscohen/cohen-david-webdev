var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
var websiteModel = require('../website/website.model.server');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.deletePage = deletePage;
pageModel.updatePage = updatePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
pageModel.getAllWidgetsForPage = getAllWidgetsForPage;

module.exports = pageModel;

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id)
        })
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId});
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {$set: page});
}

function deletePage(pageId) {
    return pageModel.findById(pageId)
        .then(function (page) {
            var websiteId = page._website;
            return pageModel.remove({_id: pageId})
                .then(function (success) {
                    return websiteModel.deletePage(websiteId, pageId);
                })
        })
}

function getAllWidgetsForPage(pageId) {
    return pageModel
        .find({_id:pageId}, {widgets:1, _id:0})
}

function deleteWidget(widgetId, pageId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}


