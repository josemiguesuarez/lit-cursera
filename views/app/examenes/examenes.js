/**
 * Controlador de los examenes
 */
(function () {
    angular.module('app').controller('ExamenesCtrl', function ($scope, Examen) {
        Examen.getExamen(1).then(
            function (response) {
                $scope.examen=response;
            }
        )
    })
})()