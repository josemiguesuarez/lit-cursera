/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    return sequelize.define("Examen_pregunta", {
        numero: {
            type: DataTypes.INTEGER(),
            field: 'numero',
            allowNull: false
        },
        peso: {
            type: DataTypes.DECIMAL(4, 2),
            field: 'peso',
            allowNull: true
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
            },
        }
    });
};
