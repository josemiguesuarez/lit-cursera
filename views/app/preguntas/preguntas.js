(function() {
    angular.module('app').controller('PreguntasCtrl', function ($scope, $http, $mdDialog, Pregunta) {
        $scope.pregunta={
            "numero":1,
            "enunciado":"Esto es un mock del enunciado de una pregunta",
            "porcentaje":20,
            "esqueleto":"esto es codigo esqueleto"
        }
        $scope.numero=['1','2','3','4'];
        $scope.respuesta=angular.copy($scope.pregunta.esqueleto);
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

        $scope.enviar = function(respuesta){
          $http.post("/api/resuesta", {
            respuesta: respuesta
          }).then(function(resp){
            console.log(resp.data);
          });
        };
    });
})();
