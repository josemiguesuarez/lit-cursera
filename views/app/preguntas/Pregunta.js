(function() {
    angular.module('app').service('Pregunta', function(Http) {
        var self = this;
        self.guardarRespuesta = function(respuesta) {
            return Http.post("respuestas", respuesta);
        };
    });
})();
