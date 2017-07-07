var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

app.get('/api/page/:pageId/widget',findAllWidgetsForPage);
app.post('/api/page/:pageId/widget',createWidget);
app.delete('/api/widget/:widgetId',deleteWidget);
app.put('/api/widget/:widgetId',updateWidget);
app.get('/api/widget/:widgetId',findWidgetById);
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put("/api/page/:pageId/widget",orderWidgets);
app.put('/api/flickr/:pageId/:widgetId',updateFlickr);

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
    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = findWidgetByIdInternal(widgetId);
    widget.url = '/assignment/uploads/'+filename;
    widget.width = width;

    var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+'/page/'+pageId +'/widget/'+widgetId;
    res.redirect(callbackUrl);
}
function updateFlickr(req,res) {
    var pageId = req.params['pageId'];
    var widgetId = req.params['widgetId'];
    var urlObject = req.body;
    var url = urlObject.url;
    for(var w in widgets){
        if(widgets[w]._id === widgetId){
            widgets[w].pageId = pageId;
            widgets[w].url = url;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function orderWidgets(req,res) {
    var pageId = req.params['pageId'];
    var index1 = parseInt(req.query['initial']);
    var index2 = parseInt(req.query['final']);
    var resultSet = [];
    for(var w in widgets) {
        if(widgets[w].pageId === pageId) {
            resultSet.push(widgets[w]);
        }
    }
    for (var w in resultSet){
        var index = widgets.indexOf(resultSet[w]);
        widgets.splice(index,1);
    }
    resultSet.splice(index2,0,resultSet.splice(index1,1)[0]);
    for (var w in resultSet){
            widgets.push(resultSet[w]);
    }
    res.sendStatus(200);
}

function createWidget(req,res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;
    widgets.push(widget);
    res.json(widget);
}

function deleteWidget(req,res) {
    var widgetId = req.params['widgetId'];
    var widget = findWidgetByIdInternal(widgetId);
    if(widget!==null && typeof widget !=='undefined'){
        var index = widgets.indexOf(widget);
        widgets.splice(index, 1);
        res.sendStatus(200);
        return;
    }
    res.sendStatus(404)
}

function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    for(var w in widgets) {
        if(widgetId === widgets[w]._id) {
            widgets[w] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function findWidgetById(req,res) {
    var widgetId = req.params['widgetId'];
    var widget = findWidgetByIdInternal(widgetId);
    if(widget!==null && typeof widget !=='undefined'){

        res.json(widget);
        return;
    }
    res.sendStatus(404)
}

function findWidgetByIdInternal(widgetId) {
    return widgets.find(function (widget) {
        return widget._id === widgetId;
    });
}

function findAllWidgetsForPage(req,res) {
    var pageId = req.params['pageId'];
    var resultSet = [];
    for(var w in widgets) {
        if(widgets[w].pageId === pageId) {
            resultSet.push(widgets[w]);
        }
    }
    res.json(resultSet);
}

