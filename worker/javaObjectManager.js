var metodo = require("./metodo");
var variable = require("./variable");

function establecerObjeto(clase, pregunta){
  switch (pregunta.tipoid) {
    //Variable
    case 1:
      metodo.reemplazar(clase, pregunta.nombre);
      break;
    //Metodo
    case 2:
      variable.reemplazar(clase, pregunta.nombre);
      break;
    default:

  }
}

exports.establecerObjeto = establecerObjeto;
