var fs = require("fs");
var joe = require("./java-object-extractor");
var jor = require("./java-object-replacer");

var codigoSolucion = "";
fs.readFile("./Marca.java", function(err, buffer){
  if (err) {
        throw err;
    }

  codigoSolucion = buffer.toString();
  
  var codigoRespuesta = "-- Inserción de código para método --";
  var objeto = { inicio: 847, fin: 955, nombre: 'Marca', tipo: 'm' }
  console.log(jor(objeto, codigoRespuesta, codigoSolucion));
});
