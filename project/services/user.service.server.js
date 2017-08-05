var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET
};

if(process.env.MLAB_USERNAME_WEBDEV) {
    googleConfig.callbackURL = "http://cohen-david-webdev.herokuapp.com/auth/google/callback"

} else {
    googleConfig.callbackURL = "http://localhost:3000/auth/google/callback"
}

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get   ('/api/project/user', findUserByCredentials);
app.get   ('/api/project/user/:userId', findUserById);
app.post  ('/api/project/user', createUser);
app.put   ('/api/project/user/:userId', updateUser);
app.delete('/api/project/user/:userId', deleteUser);
app.get ('/api/project/username',findUserByUsername);

app.post  ('/api/project/login', passport.authenticate('local'), login);
app.get   ('/api/project/loggedin', loggedin);
app.post  ('/api/project/logout', logout);
app.post  ('/api/project/register', register);

passport.use(new GoogleStrategy(googleConfig, googleStrategy));
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
    }));

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUser(userObj)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function loggedin(req, res) {
    console.log(req.user);
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function (error) {
                done(error, false);
            });
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user){
                res.json(user)
            } else {
                res.sendStatus(404)
            }
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user){
            res.json(user);
        });
}

function findUserByUsername(req, res) {
    var username = req.query['username'];
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}