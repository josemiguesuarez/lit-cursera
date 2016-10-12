/**
 * Servicio para enviar codigo de respuesta al servicor
 */
(function() {
    angular.module('app').service('Calificacion', function(Http) {
        var self = this;
        var calificacion;
        /**
         * Se encarga de cambiar la calificación recibida
         * @param nueva calificacion
         * @returns
         */
        self.setCalificacion = function(calificacionP) {
            calificacion = calificacionP;
        };
        /**
         * Se encarga de devolver la calificacion obtenida
         * @param code El código a compilar
         * @param array Arreglo en donde se devolverán los mensajes dados como respuesta por el compilador
         * @returns {*}
         */
        self.getCalificacion = function() {
            return calificacion;
        };
    });
})();
