var allow = require('../services/allow');
var utils = require('../services/utils');
var db = require('../models');
var Promise = require('bluebird');
var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
    db.Pregunta.findById(req.params.id).then(function(resp) {
       return res.send(resp);
    }).catch(next);
});
router.get('/examen/:examenId', function (req, res, next) {
    var examenId = req.params.examenId;
    var examenEmulado = db.Examen.build({
        id: examenId
    });
    return examenEmulado.getPreguntas().then(
        function(preguntas) {
            res.send(preguntas)
        }
    );
});
module.exports = router;
