/**
 * Controlador de los examenes
 */
(function () {
    angular.module('app').controller('ExamenesCtrl', function ($scope, Examen) {
        /**
         * Se inicializa la vista con la información del exámen número 1
         */
        Examen.getExamen(1).then(
            function (response) {
                $scope.examen=response;
                console.log($scope.examen);
            }
        )
    })
})()