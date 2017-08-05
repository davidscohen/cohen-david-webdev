var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectWebsiteModel"},
    name: String,
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectWidgetModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'projectPage'});

module.exports = pageSchema;