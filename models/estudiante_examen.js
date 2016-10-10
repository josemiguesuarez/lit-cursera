/*jslint node: true */
"use strict";
/**
 * Define la tabla que maneja la relación entre un estudiante y un examen
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    return sequelize.define("Estudiante_examen", {
        calificacion: {
            type: DataTypes.REAL(2),
            field: 'enunciado',
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
