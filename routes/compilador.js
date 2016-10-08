var allow = require('../services/allow');
var utils = require('../services/utils');

var db = require('../models');
var Promise = require('bluebird');
var express = require('express');
var router = express.Router();
var compilerManager = require('../services/compilerManager')("temp");


router.post('/compilar', function(req, res, next) {
    var code = utils.getterFromPost(req).get('code', 'Error en el envío de los parámetros');
    console.log("CODE:", code);
    compilerManager.compile(code).then(function(response){
        res.send(response);
    }).catch(next);

});


module.exports = router;
