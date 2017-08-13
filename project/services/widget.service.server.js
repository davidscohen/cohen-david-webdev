var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/project/uploads' });
var widgetModel = require('../models/widget/widget.model.server');

var imgur = require('imgur');
imgur.setClientId('52cdc8fa9b3f602');
imgur.getClientId();
imgur.setAPIUrl('https://api.imgur.com/3/');
imgur.getAPIUrl();


app.get('/api/project/page/:pageId/widget',findAllWidgetsForPage);
app.get('/api/project/userpage/:usr',findAllWidgetsForUser);
app.post('/api/project/page/:pageId/widget',createWidget);
app.delete('/api/project/widget/:widgetId',deleteWidget);
app.put('/api/project/widget/:widgetId',updateWidget);
app.get('/api/project/widget/:widgetId',findWidgetById);
app.post ("/api/project/upload", uploadImage);
app.put("/api/project/page/:pageId/widget",orderWidgets);
app.put('/api/project/flickr/:pageId/:widgetId',updateFlickr);

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Ever since astronomers <a href="http://gizmodo.com/new-earth-like-exoplanet-could-be-discovery-of-the-cent-1785614793#_ga=2.67003244.390029006.1495112369-1520736541.1475842057" rel="nofollow">announced the discovery</a> of an Earth-sized exoplanet <a href="http://gizmodo.com/there-may-be-an-earth-like-exoplanet-less-than-five-lig-1785457935" rel="nofollow">less than five light years</a> down the cosmic street, the question on every good space cadet’s mind has been whether or not we can colonize it. We’re not going to know if <em>Proxima b</em> is habitable <a href="http://gizmodo.com/how-well-get-our-first-big-clue-about-life-on-proxima-b-1785942106" rel="nofollow">until we can point some very powerful telescopes at it</a>, which won’t happen until next year. But until then, scientists are playing around with models—and one such modeling effort recently came to some promising conclusions.</p>'},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://www.youtube.com/tnBQmEqBCY0" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var filename;
    imgur
            .uploadFile("/Users/david/Desktop/tumblr_okh3grzsCB1uxd3t8o1_500.gif")
            .then(function (json) {
                console.log(json.data.link);
                filename = json.data.link;
                return(filename);
            });
setTimeout(function(){
    console.log(filename);
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            widget.url = filename;
            console.log(filename);

            widget.width = width;
            widgetModel
                .updateWidget(widgetId, widget)
                .then(function (status) {
                    var callbackUrl   = "/project/#!/user/website/" + websiteId + '/page/' + pageId +'/widget/' + widgetId;
                    res.redirect(callbackUrl);
                });
        });
}, 5000);
}

function updateFlickr(req,res) {
    var pageId = req.params['pageId'];
    var widgetId = req.params['widgetId'];
    var urlObject = req.body;
    var url = urlObject.url;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            widget.url = url;
            widgetModel
                .updateWidget(widgetId, widget)
                .then(function (status) {
                    res.sendStatus(200);
                })
        });
}

function orderWidgets(req, res) {
    var pageId = req.params['pageId'];
    var index1 = parseInt(req.query['initial']);
    var index2 = parseInt(req.query['final']);
    widgetModel
        .orderWidgets(pageId, index1, index2)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function createWidget(req,res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        });
}

function deleteWidget(req,res) {
    var widgetId = req.params['widgetId'];
    widgetModel
        .deleteWidget(widgetId)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
}

function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.status(200).json(widget);
        })
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (page) {
            res.status(200).json(page.widgets);
        })
}

function findAllWidgetsForUser(req, res) {
    var usr = req.params['usr'];
    widgetModel
        .findAllWidgetsForUser(usr)
        .then(function (usr) {
            res.status(200).json(usr);
        })
}