/**
 * Servicio encargado de hacer handling de errores en la aplicación
 */
(function() {
    angular.module('app').service('EventHandler', function errorHandler($location) {
        var errorListeners = [];
        this.error = function(res) {
            var error = res.data;
            var status = res.status;
            var req = res.config;

            console.log("HTTP Error: " + status + "  " + req.method + " " + req.url, error.message);
            for (var i = errorListeners.length - 1; i >= 0; i--) {
                errorListeners[i](error, status);
            }
        };
        this.addErrorListener = function(callback) {
            errorListeners.push(callback);
        };
    });
})();
