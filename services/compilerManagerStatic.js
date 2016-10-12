var Promise = require("bluebird");
var path = require("path");
var compiler = require("./compiler.js");
var utils = require("./utils.js");

module.exports = function(TEMP_DIR){
    utils.ensureExists(TEMP_DIR);

    /**
	 * Nombre del archivo que va almacenar el código Java al interior del directorio temporal
	 * @property JAVA_FILE_NAME
	 * @type {String}
	 */
	var JAVA_FILE_NAME = "Vehiculo.java";


    function compile (javaText){
        return utils.createFile(TEMP_DIR, JAVA_FILE_NAME, javaText).then(function(filePath){
            var compilerT = compiler(TEMP_DIR);
            return compilerT.compile(JAVA_FILE_NAME);
        }).then(function(result){
            return result;
        });

    }

    return {
        compile: compile
    };
};
