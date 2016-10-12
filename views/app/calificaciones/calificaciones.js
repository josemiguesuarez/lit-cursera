/**
 * Controlador de las aplicaciones
 */
(function() {
    angular.module('app').controller('CalificacionesCtrl', function ($scope, Calificacion) {
        $scope.calificacion=Calificacion.getCalificacion();
    });
})();
