(function() {
    angular.module('app').service('Sorteo', service);
    function service ($rootScope, Http, EventHandler ) {
        self = this;
        self.save = function(sorteo, callback) {
            Http.post('/lti', sorteo).then(callback, EventHandler.error);
        };
    }
})();
