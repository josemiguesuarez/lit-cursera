var allow = require('../services/allow');
var utils = require('../services/utils');

var db = require('../models');
var Promise = require('bluebird');
var express = require('express');
var router = express.Router();
var compilerManager = require('../services/compilerManager')("temp");

/**
 * Define el comportamiento de un post enviado a la ruta 'compilador/compilar'
 */
router.post('/compilar', function(req, res, next) {
    //Se intenta obtener el código del estudiante a compilar
    var code = utils.getterFromPost(req).get('code', 'Error en el envío de los parámetros');
    console.log("CODE:", code);
    //Envía el código a compilar
    compilerManager.compile(code).then(function(response){
        res.send(response);
    }).catch(next);

});


module.exports = router;
