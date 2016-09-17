(function() {
    angular.module('app').service('Sorteo', service);
    function service ($rootScope, $http, EventHandler ) {
        self = this;
        self.save = function(sorteo, callback) {
            $http.post('/sorteos', sorteo).then(callback, EventHandler.error);
        };
    }
})();
