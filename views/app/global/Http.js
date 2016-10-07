(function() {
    angular.module('app').service('Http', function httpService($location, $http, EventHandler) {
        var errorListeners = [];
        this.serverUrl = 'http://localhost:8080/api/';
        //this.serverUrl = '/api/';
        this.post = function(relativRoute, body) {
            var url = "POST " + this.serverUrl + relativRoute;
            dev(url);
            return $http.post(this.serverUrl + relativRoute, body, {
                withCredentials: true
            }).then(function(res) {
                return res.data;
            }, EventHandler.error);
        };
        this.get = function(relativRoute) {
            var url = "GET " + this.serverUrl + relativRoute;
            dev(url);
            return $http.get(this.serverUrl + relativRoute, {
                withCredentials: true
            }).then(function(res) {
                return res.data;
            }, EventHandler.error);
        };

        function dev(message) {
            console.log("HTTP:" + message);
        }
    });
})();
