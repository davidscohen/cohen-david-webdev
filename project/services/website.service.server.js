var app = require('../../express');
var websiteModel = require('../models/website/website.model.server');

app.post    ('/api/project/user/:userId/website', createWebsite);
app.get     ('/api/project/user/:userId/website', findWebsitesByUser);
app.get     ('/api/project/website/:websiteId', findWebsiteById);
app.put     ('/api/project/user/:userId/website/:websiteId', updateWebsite);
app.delete  ('/api/project/user/:userId/website/:websiteId', deleteWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function findWebsitesByUser(req, res) {
    var userId = req.params['userId'];
    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);
        });
}

function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.send(website);
        });
}

function findWebsiteById(req,res) {
    var websiteId = req.params['websiteId'];
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            if(website){
                res.json(website);
            } else{
                res.sendStatus(404);
            }
        });
}

function updateWebsite(req, res) {
    var currentUserId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    var website = req.body;
    var userId = website._user;
    websiteModel
        .updateWebsite(websiteId, website,currentUserId)
        .then(function (status) {
            res.sendStatus(200);
        });
}


function deleteWebsite(req, res) {
    var currentUserId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            var userId = website._user;
            return websiteModel
                .deleteWebsite(userId, websiteId,currentUserId)
                .then(function (status) {
                    res.sendStatus(200);
                })
        });

}