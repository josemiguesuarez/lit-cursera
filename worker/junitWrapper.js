var Promise = require("bluebird");
var exec = require('child_process').exec;
module.exports = function(CWD){


    /**
	 * Tiempo límite de ejecución de los programas Java medido en milisegundos
	 * @property EXECUTION_TIMEOUT
	 * @type {Number}
	 */
	var EXECUTION_TIMEOUT = 1000;



    /**
     * Compila y ejecuta un archivo de Java.
     * @method runTests
     * @param {String} testFileName Nombre del test que se va a ejecutar (debe indicar los paquetes en el que el test está separados por '.')
     * @return {Promise} resp [{nombre, correcto, mensaje}]
     */
    function runTest(testFileName) {
        return new Promise (function(resolve, reject){
            var tInic = new Date().getTime();
            var result = exec('java -jar junitwrapper.jar "' + testFileName + '"', {
                timeout: EXECUTION_TIMEOUT,
                cwd: CWD
            }, function(error, stdout, stderr) {
                if(error) return reject(error);
                resolve(JSON.parse(stdout));
            });
        });
    }



    return {
        runTest: runTest
    };

};
