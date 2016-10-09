/**
 * Servicio para interactuar con respuestas
 */
(function() {
    angular.module('app').service('Pregunta', function(Http) {
        var self = this;
        /**
         * Método para enviar la respuesta al servidor
         * @param respuesta
         * @returns {*}
         */
        self.guardarRespuesta = function(respuesta) {
            return Http.post('respuestas', respuesta);
        };
        self.getPreguntasByExamen = function (examenId) {
            return Http.get('preguntas/examen/'+examenId);
        }
    });
})();
