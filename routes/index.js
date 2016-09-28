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

//TODO identify if i should errase this code:

var request = require('request');
var CourseraStrategy = require('passport-coursera-oauth').OAuth2Strategy;
var CLIENT_ID = 'fFH0i9s6B-a27m5_vw48kA';
var CLIENT_SECRET = 'leLRWDakQpZ47Cr8LgVDJQ';

//https://accounts.coursera.org/oauth2/v1/auth?response_type=code&client_id=_ZebnnLCwq5CtJaZUnaFiQ&redirect_uri=https%3A%2F%2Flocalhost%3A8000%2Flti&scope=view_profile&state=csrf_code1234
//https://accounts.coursera.org/oauth2/v1/auth?response_type=code&client_id=_ZebnnLCwq5CtJaZUnaFiQ&redirect_uri=https%3A%2F%2Fcupiexamenes.herokuapp.com%2Flti&scope=view_profile&state=csrf_code1234

/*setTimeout(function() {
    request({
        url: 'https://accounts.coursera.org/oauth2/v1/auth?response_type=code&client_id=_ZebnnLCwq5CtJaZUnaFiQ&redirect_uri=https%3A%2F%2Fcupiexamenes.herokuapp.com%2Flti&scope=view_profile&state=csrf_code1234',
        method: 'GET'
    }, function(err, res) {
        console.log("Se hizo ping")
            //console.log("Access Token:", res.body);
    });
}, 8000);*/


//var provider = lti.Provider (consumer_key, consumer_secret)

/*Client ID: _ZebnnLCwq5CtJaZUnaFiQ
Secret Key: TmzslydSk7z5Wl2gOCNDsg
Auth Method: OAuth2
Redirect URIs:
https://cupiexamenes.herokuapp.com*/

var request = require('request');




passport.use(new CourseraStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: "http://www.cupiexamenes.com/lti/callback",
        profileFields: ['timezone', 'locale', 'privacy']
    },
    function(accessToken, profile, done) {
        console.log("Access Token 1:", accessToken);
        console.log("profile profile 1:", profile);
        done(false, {
            hola: "hola"
        });
    }
));

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

/*router.get('/lti2',
    passport.authenticate('coursera', {
        scope: ['view_profile']
    }));*/

/*router.get('/lti/callback',
    passport.authenticate('coursera', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        console.log("YEIIII");
            // Successful authentication, redirect home.
        res.redirect('/');
    });*/



router.post('/', function(req, res) {
    console.log("Coursera response 1 POST:/", req.body);
    res.send("OK");
});
router.post('/access', function(req, res) {
    console.log("Coursera response 2 POST:/access/", req.body);
    var curso = req.body.custom_nivel;
    var nivel = req.body.custom_curso;
    var examen = req.body.custom_examen;
    res.redirect("https://accounts.coursera.org/oauth2/v1/auth?response_type=code&client_id=fFH0i9s6B-a27m5_vw48kA&redirect_uri=https%3A%2F%2Fcupitips.virtual.uniandes.edu.co%2Flti&scope=view_profile&state=" + curso + "-" + nivel + "-" + examen);
});
router.post('/lti/callback', function(req, res) {
    console.log("Coursera response 3 POST:/lti/callback", req.body);
    res.send("OK");
});
router.get('/lti/callback', function(req, res) {
    console.log("Coursera response 4 GET:/lti/callback", req.query);
    res.send("OK");
});

router.get('/access', function(req, res) {
    console.log("User query", req.query);
    var curso = req.query.curso;
    var nivel = req.query.nivel;
    var examen = req.query.examen;
    var lis_outcome_service_url = req.query.lis_outcome_service_url;
    var context_id = req.query.context_id;

    res.redirect("https://accounts.coursera.org/oauth2/v1/auth?response_type=code&client_id=fFH0i9s6B-a27m5_vw48kA&redirect_uri=http%3A%2F%2Fwww.cupiexamenes.com%2Flti&scope=view_profile&state=" + lis_outcome_service_url + "-" +context_id+ "-" + curso + "-" + nivel + "-" + examen);
});

router.post('/api/resuesta', function(req, res) {
    console.log("Nuevo envío de respuesta Header", req.get('Authorization'));
    res.send("OK");
});


router.get('/lti', function(req, resGlobal) {
    console.log("/lti : req.hostname", req.hostname);
    console.log("/lti : req.ip", req.ip);

    var code = req.query.code;
    var status = req.query.status;
    console.log(req.query, "status:", status);
    var statusSplit = status.split("-");
    var lis_outcome_service_url = statusSplit[0];
    var context_id = statusSplit[1];
    console.log(lis_outcome_service_url);

    console.log("CODE coursera", code);
    request({
        url: 'https://accounts.coursera.org/oauth2/v1/token',
        method: "POST",
        'content-type': 'application/x-www-form-urlencoded',
        auth: {
            'user': CLIENT_ID,
            'pass': CLIENT_SECRET
        },
        form: {
            code: code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: 'https://cupitips.virtual.uniandes.edu.co/lti', //URL de la consola de Coursera (Aplicacion)
            grant_type: 'authorization_code'
        }
    }, function(err, res) {
        console.log("Access Token:", res.body);
        var body = JSON.parse(res.body);
        var token = body.access_token;
        var expires = body.expires_in;
        var tokenType = body.token_type;
        request({
            url: 'https://api.coursera.org/api/externalBasicProfiles.v1?q=me',
            method: "GET",
            headers: {
                'Authorization': tokenType + ' ' + token
            }
        }, function(err, res) {
            console.log("Datos del usuario:", res.body);
            var body = JSON.parse(res.body);
            var usuarioId = body.elements[0].id;
            console.log("usuarioId", usuarioId);
            resGlobal.redirect("/");
            request({
                method: 'PUT',
                uri: lis_outcome_service_url,
                headers: {
                    'Authorization': tokenType + ' ' + token,
                    'content-type': ''
                },
                multipart: [{
                    'content-type': 'application/vnd.ims.lis.v2.result+json',
                    body: JSON.stringify({
                        "@context": context_id,
                        "@type": "Result",
                        "resultScore": 0.83,
                        "comment": "This is exceptional work."
                    })
                }]
            }, function(error, response, body) {
                if (response.statusCode == 201) {
                    console.log(body);
                } else {
                    console.log('status:' + response.statusCode);
                    console.log(body);
                }
            });

        });

    });


});

module.exports = router;
