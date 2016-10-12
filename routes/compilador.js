var allow = require('../services/allow');
var utils = require('../services/utils');

var db = require('../models');
var Promise = require('bluebird');
var express = require('express');
var router = express.Router();

//TODO el compilador no debe ser estático sino dinámico para poder soportar varios usuarios al timepo.
//var compilerManager = require('../services/compilerManager')("temp");
var compilerManager = require('../services/compilerManagerStatic')("worker/junitwrapper/classes/solucion/");

var junitwrapper = require('../worker/junitWrapper.js')("worker/junitwrapper/");

var calificador = require('../worker/calificador');

/**
 * Define el comportamiento de un post enviado a la ruta 'compilador/compilar'
 */
router.post('/compilar', function(req, res, next) {
    //Se intenta obtener el código del estudiante a compilar
    var data = utils.getterFromPost(req);
    var code = data.get('code', 'Error en el envío de los parámetros');
    var preguntaId = data.get('preguntaId', 'Error en el envío de los parámetros');
    //TODO el calificador debe tener este código en su interior para que esta parte del código no conozca el compiler manager
    calificador.darCodigoRespuestaCompleto(preguntaId, code).then(function(codigoCompleto){
        console.log("CODE:", codigoCompleto);
        //Envía el código a compilar
        return compilerManager.compile(codigoCompleto);
    }).then(function(response){
        res.send(response);
    }).catch(next);

});

/**
 * Define el comportamiento de un post enviado a la ruta 'compilador/calificar'
 */
router.post('/calificar', function(req, res, next) {
    //Se intenta obtener el código del estudiante a compilar
    var data = utils.getterFromPost(req);
    var code = data.get('code', 'Error en el envío de los parámetros');
    var preguntaId = data.get('preguntaId', 'Error en el envío de los parámetros');

    var respuesta = {
        texto: code,
        preguntaId: preguntaId
    };
    db.Respuesta.create(respuesta).then(function(resp) {
       return  calificador.darCodigoRespuestaCompleto(preguntaId, code).then(function(codigoCompleto){
           console.log("CODE:", codigoCompleto);
           //Envía el código a compilar
           return compilerManager.compile(codigoCompleto);
       });
    }).then(function(response){
        if(response.stderr && response.stderr !== "" || response.error && response.error !== ""){
            var resp = {
                nota: 1.5,
                retroalimentacion: ["El código enviado no compila"]
            };
            return resp;
        } else {
            return junitwrapper.runTest("test.TestVehiculo").then(function(respuesta){
                console.log("respuesta calificador:", respuesta);

                var mensajesRetroalimentacion = [];
                var conteoCorrectas = 0;
                respuesta.forEach(function(test){
                    if(test.correcto){
                        conteoCorrectas++;
                    } else {
                        mensajesRetroalimentacion.push(test.mensaje);
                    }
                });
                var resp = {
                    nota: conteoCorrectas*5/respuesta.length,
                    retroalimentacion: mensajesRetroalimentacion
                };
                return resp;

            });
        }

    }).then(function(resp){
        res.send(resp);
    }).catch(next);

});


module.exports = router;
