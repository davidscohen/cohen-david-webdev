var app = require('./express');

var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');



var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
if(process.env.SESSION_SECRET) {
    app.use(session({secret: process.env.SESSION_SECRET}));
} else {
    app.use(session({secret: "runlocalsession"}));
}
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

//require("./assignment/app.js");
require("./project/app.js");

var port = process.env.PORT || 3000;

app.listen(port);
