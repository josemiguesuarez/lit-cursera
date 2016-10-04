(function () {
    angular.module('app').controller('ExamenesCtrl', function ($scope) {
        $scope.examen = {
            nombre:"Exámen de prueba",
            peso:20,
            descripcion:"Esta es la descripción de un examen de prueba",
            enunciado:"Este es un examen de prueba",
            imagen:"https://users.dcc.uchile.cl/~psalinas/uml/img/modelo/herencia2.jpg"
        };
    })
})()