(function() {
    /**
     * Controlador de las preguntas
     */
    angular.module('app').controller('PreguntasCtrl', function($scope, $mdDialog, Pregunta, Compilador) {
        $scope.pregunta = {
            "id": 1,
            "numero": 1,
            "enunciado": "Esto es un mock del enunciado de una pregunta",
            "porcentaje": 20,
            "esqueleto": "esto es codigo esqueleto"
        };
        $scope.imagen = "https://users.dcc.uchile.cl/~psalinas/uml/img/modelo/herencia2.jpg";
        $scope.numero = ['1', '2', '3', '4'];
        $scope.respuesta = angular.copy($scope.pregunta.esqueleto);
        $scope.showImage = false;
        $scope.consoleLog =[];
        /**
         * Método encargado de reiniciar la respuesta del usuario al esqueleto original de la pregunta
         * @param ev
         */
        $scope.undoRespuesta = function(ev) {
            //Se muestra dialogo para confirmar el reinicio
            var confirm = $mdDialog.confirm()
                .title('¿Quieres deshacer tu código?')
                .textContent('Tu respuesta será borrada y solo quedará el esqueleto de la pregunta')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Quiero borrarlo')
                .cancel('Volver');
            //Una vez se confirma la respuesta se reemplaza por el esqueleto
            $mdDialog.show(confirm).then(function() {
                $scope.respuesta = angular.copy($scope.pregunta.esqueleto);
            }, function() {});
        };

        /**
         * Método encargado de enviar la respuesta al servidor
         */
        $scope.enviar = function() {
            //Se crea el objeto de la respuesta
            var respuesta = {
                texto: $scope.respuesta,
                preguntaId: $scope.pregunta.id
            };
            //Se envía la respuesta por el servicio
            Pregunta.guardarRespuesta(respuesta).then(function(data) {
                console.log(data);
            });
        };

        /**
         * Método encargado de enviar el codigo de respuesta a compilar al servidor
         */
        $scope.compilar = function() {
            $scope.compiling = true;
            var codigo = $scope.respuesta;
            $scope.consoleLog = [];
            Compilador.compilar(codigo, $scope.consoleLog).then(function(){
              $scope.compiling = false;
            }, function(){
              $scope.compiling = false;
            });

        };
    });
})();
