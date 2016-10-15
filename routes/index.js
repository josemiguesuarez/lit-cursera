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


var lti = require('ims-lti');

var request = require('request');


//TODO generate randomly:
var consumer_key = "PruebaLti";
var consumer_secret = "ClaveSecretaQueSeDebeGenerar";
var provider = new lti.Provider(consumer_key, consumer_secret);





passport.use(new LocalStrategy(function(username, password, done) {
    db.usuario.findById(username)
        .then(function(findedUser) {
            if (findedUser) {
                return done(null, findedUser);
            } else {
                return done(new Error("Credenciales incorrectas"), false);
            }
        }).catch(function(err) {
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




router.post('/access', function(req, res) {
    console.log("Coursera response 2 POST:/access/", req.body);
    var curso = req.body.custom_nivel;
    var nivel = req.body.custom_curso;
    var examen = req.body.custom_examen;
    var lis_outcome_service_url = req.body.lis_outcome_service_url;
    var context_id = req.body.context_id;

    provider.valid_request(req, function(err, is_valid) {
        if (!is_valid || !provider.outcome_service) {
            console.log("Conexión inválida:", req.hostname, req.ip);
            res.redirect("bad");
            return false;
        }
        res.redirect("/");
        provider.outcome_service.send_replace_result(0.5, function(err, result) {
            console.log(err, result);
            console.log(result);
        });

    });
});





module.exports = router;
