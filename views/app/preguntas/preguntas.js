(function() {
    /**
     * Controlador de las preguntas
     */
    angular.module('app').controller('PreguntasCtrl', function($scope, $mdDialog, $routeParams, Examen, Pregunta, Compilador) {
        /**
         * Se inicializa la información de la pregunta
         */
        Examen.getExamen($routeParams.examenId).then(
            function (response) {
                //Se obtiene la información del examen
                $scope.examen = response;
                Pregunta.getPreguntasByExamen($routeParams.examenId).then(
                    function (response) {
                        //Se obtienen las preguntas del exámen
                        $scope.examen.preguntas = response;
                        //Arreglo de números de preguntas
                        $scope.numeros = [];
                        //Arreglo de las respuestas del usuario a las preguntas
                        $scope.respuestas = new Array(response.length);
                        for(var i = 0; i < response.length; i++) {
                            //Se llena la información del arreglo de número de preguntas
                            $scope.numeros.push(String(i+1));
                            //Se inicializa el arreglo de respuestas
                            $scope.respuestas[i] = angular.copy(response[i].esqueleto);
                            //Si la pregunta es la primera pregunta se inicializan los atributos del scope
                            if(response[i].Examen_pregunta.numero==1) {
                                $scope.pregunta = response[i];
                                console.log($scope.pregunta);
                                $scope.respuesta = $scope.respuestas[i];
                                $scope.preguntaActual = i;
                            }
                        }
                    }
                )
            }
        )
        /**
         * Método encargado de cambiar la pregunta actual
         * @param preguntaNum {Integer} El numero de la nueva pregunta
         */
        $scope.cambiarPregunta = function (preguntaNum) {
            $scope.respuestas[$scope.preguntaActual] = angular.copy($scope.respuesta)
            for(var i = 0; i < $scope.examen.preguntas.length; i++) {
                if(preguntaNum==$scope.examen.preguntas[i].Examen_pregunta.numero) {
                    $scope.preguntaActual = i;
                    $scope.pregunta = $scope.examen.preguntas[i];
                    $scope.respuesta = angular.copy($scope.respuestas[i]);
                }
            }
        }
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
                .ariaLabel('Borrar')
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
