var app = require('../../express');
var pageModel = require('../models/page/page.model.server');

app.get ('/api/website/:websiteId/page',findAllPagesForWebsite);
app.post ('/api/website/:websiteId/page',createPage );
app.get ('/api/page/:pageId', findPageById);
app.put  ('/api/page/:pageId', updatePage);
app.delete ('/api/page/:pageId', deletePage);

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pageList) {
            res.status(200).json(pageList);
        });
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.sendStatus(200).json(status);
        })
}

function deletePage(req,res) {
    var pageId = req.params['pageId'];
    pageModel.deletePage(pageId)
        .then(function (status) {
            res.sendStatus(200);
        },function (erre) {
            res.sendStatus(404);
        })

}

function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    page._website = websiteId;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        })
}