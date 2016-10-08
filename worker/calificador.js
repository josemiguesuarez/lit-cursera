var db = require("../models")

module.exports = function(){
  db.Respuesta.findAll({
    include: db.Pregunta
  }).then(respuestas=>{
    respuestas.forEach(respuesta=>{
      

    })
    for (var i = 0; i < respuestas.length; i++) {

      respuestas[i]
    }
  })
}
