/**
 * Servicio para interactuar con respuestas
 */
(function() {
    angular.module('app').service('Examen', function(Http) {
        var self = this;
        /**
         * Método para obtener un examen del servidor
         * @param id
         * @returns {*}
         */
        self.getExamen = function(id) {
            return Http.get("examenes/"+id);
        };
    });
})();
