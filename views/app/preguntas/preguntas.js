(function() {
    angular.module('app').controller('PreguntasCtrl', function ($scope, Pregunta) {
        $scope.aceLoaded = function (_editor) {
            // Options
            console.log("entra");
            _editor.getSession().setMode("ace/mode/java");
        };
    });
})();