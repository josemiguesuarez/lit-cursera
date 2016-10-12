var Promise = require("bluebird");
var path = require("path");
var compiler = require("./compiler.js");
var utils = require("./utils.js");

module.exports = function(TEMP_DIR){
    utils.ensureExists(TEMP_DIR);
    /**
     * Número máximo de solicitudes por milisegundo que se pueden aceptar.
     * @property MAX_NUM_REQUESTS
     * @type {Number}
     */
    var MAX_NUM_REQUESTS = 10000;

    /**
	 * Nombre del archivo que va almacenar el código Java al interior del directorio temporal
	 * @property JAVA_FILE_NAME
	 * @type {String}
	 */
	var JAVA_FILE_NAME = "Vehiculo.java";

    /**
     * Contador que permite identificar la solicitud en conjunto con el timepo en el que se realizó.
     * @property countSolicitud
     * @type {Number}
     */
    var requestCount = 0;

    /**
     * Crea un id para la solicitud con el timepo actual y un contador adicional.
     * @method createRequestId
     */
    function createRequestId() {
        if (requestCount >= MAX_NUM_REQUESTS) {
            requestCount = 0;
        }
        return new Date().getTime() + '_' + (requestCount++);
    }
    /**
     * Genera un nombre para el directorio de trabajo actual.
     * @method generateCWDName
     */
    function generateCWDName() {
        var requestId = createRequestId();
        return path.join(TEMP_DIR, requestId);
    }

    function compile (javaText){
        var generatedCWDName = generateCWDName();
        return utils.createDirAndFile(generatedCWDName, JAVA_FILE_NAME, javaText).then(function(filePath){
            var compilerT = compiler(generatedCWDName);
            return compilerT.compile(JAVA_FILE_NAME);
        }).then(function(result){
            //utils.deleteFolderRecursive(generatedCWDName);
            return result;
        });

    }

    return {
        compile: compile
    };
};
