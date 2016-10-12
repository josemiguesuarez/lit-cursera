/**
 * Servicio para enviar codigo de respuesta al servicor
 */
(function() {
    angular.module('app').service('Compilador', function(Http) {
        var self = this;
        /**
         * Método encargado de realizar la petición de compilación de código al servidor
         * @param code El código a compilar
         * @param array Arreglo en donde se devolverán los mensajes dados como respuesta por el compilador
         * @returns {*}
         */
        self.compilar = function(preguntaId, code, array) {
            return Http.post('compilador/compilar', {
                code: code,
                preguntaId: preguntaId
            }).then(function(data) {
                function pushNewLines( newStr, tipo) {
                    var newArr = (newStr) ? newStr.split(new RegExp('\r?\n', 'g')) : [];
                    for (var i = 0; i < newArr.length; i++) {
                        array.push({
                            linea: newArr[i],
                            tipo: tipo
                        });
                    }
                }

                pushNewLines( data.stdout, 'stdout');
                pushNewLines( data.stderr, 'stderr');
                pushNewLines( data.err, 'err');

            });
        };
        /**
         * Método encargado de realizar la petición de compilación de código al servidor
         * @param code El código a compilar
         * @param array Arreglo en donde se devolverán los mensajes dados como respuesta por el compilador
         * @returns {*}
         */
        self.calificar = function(preguntaId, code, array) {
            return Http.post('compilador/calificar', {
                code: code,
                preguntaId: preguntaId
            });
        };
    });
})();
