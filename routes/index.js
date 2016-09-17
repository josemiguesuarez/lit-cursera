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

//TODO identify if i should errase this code:

var request = require('request');



setTimeout(function () {
	request({
	  url: 'https://accounts.coursera.org/oauth2/v1/auth?response_type=code&client_id=_ZebnnLCwq5CtJaZUnaFiQ&redirect_uri=https%3A%2F%2Fcupiexamenes.herokuapp.com%2Flti&scope=view_profile&state=csrf_code1234',
	  method: 'GET'
	}, function(err, res) {
		console.log("Se hizo ping")
	  //console.log("Access Token:", res.body);
	});
}, 5000);


//var provider = lti.Provider (consumer_key, consumer_secret)

/*Client ID: _ZebnnLCwq5CtJaZUnaFiQ
Secret Key: TmzslydSk7z5Wl2gOCNDsg
Auth Method: OAuth2
Redirect URIs:
https://cupiexamenes.herokuapp.com*/

var request = require('request');




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
router.post('/lti', function(req, res) {
	console.log(req.body);
	res.send("OK");
});
router.get('/lti', function(req, res) {
	console.log("CODE coursera", req.query.code);
	request({
	  url: 'https://accounts.coursera.org/oauth2/v1/token',
	  method: 'POST',
	  form: {
			'code':req.query.code,
			'client_id': '_ZebnnLCwq5CtJaZUnaFiQ',
			'client_secret': 'TmzslydSk7z5Wl2gOCNDsg',
			'redirect_uri':'http://cupiexamenes.herokuapp.com/lti',
	    'grant_type': 'authorization_code'
	  }
	}, function(err, res) {
	  var json = JSON.parse(res.body);
	  console.log("Access Token:", json.access_token, json);
	});

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
