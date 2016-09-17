var allow = require('../services/allow');
var utils = require('../services/utils');
var db = require('../models');
var express = require('express');
var router = express.Router();

var env = process.env.NODE_ENV || "development";
var config = require(__dirname + '/../config/config.json')[env];

var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;


var lti = require ('ims-lti');


passport.use(new LocalStrategy(function(username, password, done) {
	db.usuario.findById(username)
		.then(function(findedUser) {
			if (findedUser) {
				return done(null, findedUser);
			} else {
				return done(new Error("Credenciales incorrectas"), false);
			}
		}).catch(function(err){
			return done(err, false);
		});
}));
passport.serializeUser(function(user, done) {
	done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	// El id es el login del usuario
	models.Usuario.findById(id)
		.then(function(user) {
			done(null, user);
		});
});


router.post('/login', passport.authenticate('local'), function(req, res) {
	res.send(req.user);
});

router.post('/logout', function(req, res) {
	req.logOut();
	res.status(200).end();
});
router.post('/', function(req, res) {
	console.log(req.body);
	res.send("OK");
});

router.get('/loggedin', function(req, res) {
	if (req.isAuthenticated()) {
		req.user.password = '';
		res.send(req.user);
	} else {
		res.send('0');
	}
});

module.exports = router;
