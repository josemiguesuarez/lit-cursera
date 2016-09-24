var allow = require('../services/allow');
var utils = require('../services/utils');
var db = require('../models');
var Promise = require('bluebird');
var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
    var data = utils.getterFromPost(req);
    var respuesta = {
        texto: data.get('texto', 'Debe enviar una respuesta con contenido')
    };
    console.log("texto"+respuesta);
    db.RespuestaPregunta.create(respuesta).then(function(resp) {
       return res.send(resp);
    }).catch(next);
});
module.exports = router;
