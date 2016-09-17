var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, User) {
    var deferred = $q.defer();
    $http.get('/loggedin').success(function(user) {
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
};

var app = angular.module('app', ['ngRoute', 'ngFileUpload', 'ngMaterial'])

.config(function($routeProvider, $httpProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    moment.locale('es');
    var fechaActual = moment();
    //TODO quitar log
    console.log("MOMENT: dia semana ", fechaActual.format('dddd, DD [de] MMMM - hh:mm:ss a'), fechaActual.weekday(), moment.locale());
    $routeProvider
        .when('/', {
            controller: 'LoginCtrl',
            templateUrl: 'app/login/login.html',
            resolve: {
                loggedin: checkLoggedin
            }
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
            resolve: {
                loggedin: checkLoggedin
            }
        });
});
