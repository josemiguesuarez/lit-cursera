(function() {
    angular.module('app').controller('PreguntasCtrl', function ($scope, $mdDialog, Pregunta) {
        $scope.pregunta={
            "id":1,
            "numero":1,
            "enunciado":"Esto es un mock del enunciado de una pregunta",
            "porcentaje":20,
            "esqueleto":"esto es codigo esqueleto"
        };
        $scope.imagen = "https://users.dcc.uchile.cl/~psalinas/uml/img/modelo/herencia2.jpg";
        $scope.numero=['1','2','3','4'];
        $scope.respuesta=angular.copy($scope.pregunta.esqueleto);
        $scope.showImage=false;
        $scope.undoRespuesta = function(ev) {
            var confirm = $mdDialog.confirm()
                .title('¿Quieres deshacer tu código?')
                .textContent('Tu respuesta será borrada y solo quedará el esqueleto de la pregunta')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Quiero borrarlo')
                .cancel('Volver');
            $mdDialog.show(confirm).then(function() {
                $scope.respuesta=angular.copy($scope.pregunta.esqueleto);
            }, function() {
            });
        };

        $scope.enviar = function(){
            var respuesta = {
                texto: $scope.respuesta,
                preguntaId: $scope.pregunta.id
            };
            console.log(respuesta);
            Pregunta.guardarRespuesta(respuesta).then(function(data){
                console.log(data);
            });
        };
    });
})();
