/**
 * Servicio para interactuar con respuestas
 */
(function() {
    angular.module('app').service('Examen', function(Http) {
        var self = this;
        /**
         * Método para obtener un examen del servidor
         * @param id {Integer} El id del exámen a buscar
         * @returns {*} HTTP.get del servicio de examenes
         */
        self.getExamen = function(id) {
            return Http.get("examenes/"+id);
        };
    });
})();
