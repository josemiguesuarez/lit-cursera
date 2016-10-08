
module.exports = function(objeto, codigoRespuesta, codigoSolucion){
  var respuesta = codigoSolucion.substr(0, objeto.inicio + 1) +
  codigoRespuesta +
  codigoSolucion.substr(objeto.fin);

  return respuesta;
}
