var app = require('../../express');

app.post    ('/api/website/:websiteId/page',createPage );
app.get     ('/api/page/:pageId',findPageById);
app.get     ('/api/website/:websiteId/page', findPageByWebsiteId);
app.put     ('/api/page/:pageId', updatePage);
app.delete  ('/api/page/:pageId', deletePage);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

function createPage(req, res) {
    var websiteId = req.params['websiteId'];
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.websiteId = websiteId;
    pages.push(page);
    res.send(page);
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    for(var p in pages) {
        if (pages[p]._id === pageId) {
            res.status(200).json(pages[p]);
            return;
        }
    }
}

function findPageByWebsiteId(req, res) {
    var websiteId = req.params['websiteId'];
    var resultSet = [];
    for (var index in pages) {
        if (pages[index].websiteId === websiteId) {
            resultSet.push(pages[index]);
        }
    }
    res.status(200).json(resultSet);
}

function updatePage(req,res) {
    var pageId = req.params['pageId'];
    var page = req.body;
    for(var p in pages){
        if(pages[p]._id === pageId){
            pages[p].name = page.name;
            pages[p].description = page.description;
            res.sendStatus(200);
            return;
        }
    }
}

function deletePage(req, res) {
    var pageId = req.params['pageId'];
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    var index = pages.indexOf(page);
    pages.splice(index, 1);
    res.sendStatus(200);
}

