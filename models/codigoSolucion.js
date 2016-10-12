/*jslint node: true */
"use strict";
/**
 * Modelo de un estudiante en la base de datos
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    //Se define los atributos de un estudiante
    return sequelize.define("CodigoSolucion", {
        codigo: {
            type: DataTypes.STRING(10000),
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        classMethods: {
            associate: function(dbP) {
              db = dbP;


            },
        }
    });
};
