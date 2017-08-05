var app = require("../express");

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var connectionString = 'mongodb://localhost/webdev_summer_2017';

if(process.env.MLAB_USERNAME_WEBDEV) {
    var username = process.env.MLAB_USERNAME_WEBDEV;
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds143211.mlab.com:43211/heroku_qdlch680';
}

mongoose.connect(connectionString);

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');