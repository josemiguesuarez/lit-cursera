(function() {
    angular.module('app').controller('CalificacionesCtrl', function ($scope) {
        $scope.calificacion={
            nota:4.5,
            pregunta:{
                "numero":1,
                "enunciado":"Esto es un mock del enunciado de una pregunta",
                "porcentaje":20,
                "esqueleto":"esto es codigo esqueleto"
            },
            retroalimentacion:[
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"},
                {"mensaje":"mensaje retroalimentacion"}
            ]
        }
    });
})();