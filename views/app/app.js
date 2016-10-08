/*var checkLoggedin = function($q, $timeout, Http, $location, $rootScope, User) {
    var deferred = $q.defer();
    Http.get('/loggedin').then(function(user) {
        if (user === '0') {
            $timeout(function() {
                deferred.reject();
            }, 0);
            if ($location.url() !== '/') {
                $location.url('/');
            }
        } else {
            $timeout(deferred.resolve, 0);
            User.setUser(user);
        }
    });
};*/

/**
 * Se declara el modulo de la aplicacion y sus dependencias
 * @type {angular.Module}
 */
var app = angular.module('app', ['ngRoute', 'ngMaterial', 'ui.ace', 'angularResizable']);

/**
 * Configuracion del modulo de la aplicacion
 * Se determina el tema usado por Angular Material
 * Se determinan las rutas de la aplicacion
 */
app.config(function($routeProvider, $httpProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    moment.locale('es');
    $routeProvider
        .when('/', {
            controller: 'ExamenesCtrl',
            templateUrl: 'app/examenes/examenes.html'
        })
        .when('/examenes/descripcion', {
            controller: 'ExamenesCtrl',
            templateUrl: 'app/examenes/examenesDescripcion.html'
        })
        .when('/calificaciones', {
            controller: 'CalificacionesCtrl',
            templateUrl: 'app/calificaciones/calificaciones.html'
        })
        .when('/preguntas', {
            controller: 'PreguntasCtrl',
            templateUrl: 'app/preguntas/preguntas.html',
            /*resolve: {
                loggedin: checkLoggedin
            }*/
        })
        .when('/apuestas', {
            controller: 'ApuestasCtrl',
            templateUrl: 'app/apuestas/apuestas.html',
            /*resolve: {
            	loggedin: checkLoggedin
            }*/
        })
        .when('/sorteos', {
            controller: 'SorteosCtrl',
            templateUrl: 'app/sorteos/sorteos.html',
            /*resolve: {
            	loggedin: checkLoggedin
            }*/
        })
        .otherwise({
            controller: 'LoginCtrl',
            templateUrl: 'app/login/login.html',
            /*resolve: {
                loggedin: checkLoggedin
            }*/
        });
});
