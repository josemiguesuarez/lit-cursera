var allow = require('../services/allow');
var utils = require('../services/utils');
var db = require('../models');
var Promise = require('bluebird');
var express = require('express');
var router = express.Router();

/**
 * Define el comportamiento de un Get enviado a la ruta 'examenes/:id' para obtener un examen particular
 */
router.get('/:id', function(req, res, next) {
    db.Examen.findById(req.params.id).then(function(resp) {
       return res.send(resp);
    }).catch(next);
});
module.exports = router;
