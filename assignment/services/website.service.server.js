var app = require('../../express');

app.post    ('/api/user/:userId/website', createWebsite);
app.get     ('/api/user/:userId/website', findWebsitesByUser);
app.get     ('/api/website/:websiteId', findWebsiteById);
app.put     ('/api/website/:websiteId', updateWebsite);
app.delete  ('/api/website/:websiteId', deleteWebsite);

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
    var resultSet = [];
    for(var w in websites) {
        if(websites[w].developerId === userId) {
            // websites[w].created = new Date();
            // websites[w].updated = new Date();
            resultSet.push(websites[w]);
        }
    }
    res.json(resultSet);
}

function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    website.developerId = userId;
    websites.push(website);
    res.send(website);
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    for(var w in websites) {
        if (websites[w]._id === websiteId) {
            res.status(200).json(websites[w]);
        }
    }
}

function updateWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var website = req.body;
    for(var w in websites){
        if(websites[w]._id === websiteId){
            websites[w].name = website.name;
            websites[w].description = website.description;
            res.sendStatus(200);
            return;
        }
    }
}

function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var website = websites.find(function (website) {
        return website._id === websiteId;
    });
    var index = websites.indexOf(website);
    websites.splice(index, 1);
    res.sendStatus(200);
}