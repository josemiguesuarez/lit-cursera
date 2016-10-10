/**
 * Servicio para interactuar con respuestas
 */
(function() {
    angular.module('app').service('Pregunta', function(Http) {
        var self = this;
        /**
         * Método para enviar la respuesta al servidor
         * @param respuesta Representación de la respuesta dada por el estudiante
         * @returns {*}
         */
        self.guardarRespuesta = function(respuesta) {
            return Http.post('respuestas', respuesta);
        };
        /**
         * Método encargado de solicitar las preguntas de un exámen al servidor
         * @param examenId El id del exámen sobre el cual se solicitaran las preguntas
         * @returns {*}
         */
        self.getPreguntasByExamen = function (examenId) {
            return Http.get('preguntas/examen/'+examenId);
        }
    });
})();
