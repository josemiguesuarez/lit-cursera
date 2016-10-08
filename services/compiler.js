var Promise = require("bluebird");
var exec = require('child_process').exec;
module.exports = function(CWD){

    /**
	 * Tiempo límite de compilación de los programas Java medido en milisegundos
	 * @property COMPILATION_TIMEOUT
	 * @type {Number}
	 */
	var COMPILATION_TIMEOUT = 10000;
    /**
	 * Mensaje en caso de que se termine el tiempo máximo de compilación
	 * @property COMPILATION_TIMEOUT_MESSAGE
	 * @type {String}
	 */
	var COMPILATION_TIMEOUT_MESSAGE = 'Su programa tardó un tiempo mayor al permitido para compilarse.';
    /**
	 * Tiempo límite de ejecución de los programas Java medido en milisegundos
	 * @property EXECUTION_TIMEOUT
	 * @type {Number}
	 */
	var EXECUTION_TIMEOUT = 1000;
    /**
	 * Mensaje en caso de que se termine el tiempo máximo de compilación
	 * @property COMPILATION_TIMEOUT_MESSAGE
	 * @type {String}
	 */
	var EXECUTION_TIMEOUT_MESSAGE = 'Su programa tardó un tiempo mayor al permitido. Por lo tanto se muestra el resultado parcial de su ejecución. Verifique que su programa termina, puede ser el mal uso de una estructura repetitiva o de la recursión';

    /**
     * Mensaje en caso de que se termine el tiempo máximo de compilación
     * @property COMPILATION_TIMEOUT_MESSAGE
     * @type {String}
     */
    var MAXBUFFER_EXCEEDED_MESSAGE = 'Su programa imprimió en consola más de lo permitido. Por lo tanto se muestra el resultado parcial de su ejecución.';




    /**
     * Compila y ejecuta un archivo de Java.
     * @method compile
     * @param {String} fileName Nombre del archivo que contiene el código Java
     * @param {String} javaMainClass Nombre de la clase que tienen el método main
     * @return {Promise} resp {error, stdout, stderr}
     */
    function compile( fileName) {
        return new Promise (function(resolve, reject){
            var tInic = new Date().getTime();
            var result = exec('javac -encoding UTF-8 ' + fileName, {
                timeout: COMPILATION_TIMEOUT,
                cwd: CWD
            }, function(error, stdout, stderr) {
                var resp ={
                    error: new Date().getTime() - tInic > COMPILATION_TIMEOUT?COMPILATION_TIMEOUT_MESSAGE:error,
                    stdout: stdout,
                    stderr: stderr
                };
                resolve(resp);
            });
        });
    }

    /**
     * Compila y ejecuta un archivo de Java.
     * @method execute
     * @param {String} javaMainClass Nombre de la clase que tienen el método main
     * @param {Function} callback Función de retorno (mensajeDeError, consolaDeSalida, consolaDeError )
     */
    function execute( javaMainClass, CB) {
        return new Promise(function(resolve, reject){
            var tInic = new Date().getTime();
            exec('java -Dfile.encoding=UTF-8 -Xmx200m -Djava.security.manager -Djava.security.policy=="' + javaSecurityPolicy + '" ' + javaMainClass, {
                timeout: EXECUTION_TIMEOUT,
                maxBuffer: maxBufferForOutput,
                cwd: CWD
            }, function(error, stdout, stderr) {
                var resp ={
                    error: new Date().getTime() - tInic > COMPILATION_TIMEOUT?EXECUTION_TIMEOUT_MESSAGE:('' + error) === 'Error: stdout maxBuffer exceeded.'?MAXBUFFER_EXCEEDED_MESSAGE:error,
                    stdout: stdout,
                    stderr: stderr
                };
                resolve(resp);
            });
        });
    }


    return {
        compile: compile,
        execute: execute
    };

};
