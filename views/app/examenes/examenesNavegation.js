(function() {
    var app = angular.module('app');
    app.directive('examenesNavegation', function() {
        return {
            restrict: 'E',
/*            scope: {
             examen: "="
             },*/
            templateUrl: 'app/examenes/examenesNavegation.html',
            // controller: controller
        };
    });
/*    function controller($scope) {
    }*/
})();