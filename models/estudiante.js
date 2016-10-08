/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    return sequelize.define("Estudiante", {
        nombre: {
            type: DataTypes.STRING(250),
            field: 'nombre',
            allowNull: false
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        classMethods: {
            associate: function(dbP) {
              db = dbP;

            },
        }
    });
};
