var db = require("../models");
var joe = require("./java-object-extractor");
var jor = require("./java-object-replacer");
var fs = require("fs");

module.exports = {
    cargarSolucion: function() {
        fs.readFile("./worker/Marca.java", function(err, buffer) {
            if (err) {
                throw err;
            }

            codigoSolucion = buffer.toString();
            fragmentos = joe.obtenerObjetos(codigoSolucion);

            db.CodigoSolucion.upsert({
                id: 1,
                codigo: codigoSolucion
            }).then(function(wasInserted){
                fragmentos.forEach(function(fragmento){
                    fragmento.CodigoSolucionId = 1;
                });
                console.log("insertOrUpdate:", wasInserted);
                if(wasInserted){
                    return db.FragmentoCodigo.bulkCreate(fragmentos).catch(function(){
                        console.log("Los fragmentos de código ya están en la base de datos");
                    });
                }
            });
        });
    },
    darCodigoRespuestaCompleto: function(preguntaId, respuestaEstudiante){
        var pregunta, fragmento;
        return db.Pregunta.findById(preguntaId).then(function(preguntaP){
            pregunta = preguntaP;
            return db.FragmentoCodigo.findById(pregunta.FragmentoCodigoId);
        }).then(function(fragmentoP){
            fragmento = fragmentoP;
            return db.CodigoSolucion.findById(fragmento.CodigoSolucionId);
        }).then(function(solucion){
            var codigoRespuestaCompleto = jor(fragmento.get(), respuestaEstudiante, solucion.codigo);
            console.log(codigoRespuestaCompleto);
            return codigoRespuestaCompleto;
        });
    },
    test: function() {
        fs.readFile("./worker/Marca.java", function(err, buffer) {
            if (err) {
                throw err;
            }

            codigoSolucion = buffer.toString();
            attrAndMeths = joe.obtenerObjetos(codigoSolucion);

            var codigoRespuesta = "-- Inserción de código para método --";

            console.log(jor(attrAndMeths[1], codigoRespuesta, codigoSolucion));
        });
    },

};
