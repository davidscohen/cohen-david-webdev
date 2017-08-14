var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectPageModel"},
    widgetType:{type:String, enum:['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    usr: String,
    backUrl: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'projectWidget'});

module.exports = widgetSchema;
