/*jslint node: true */
"use strict";

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
