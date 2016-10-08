/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var defaultInclude;
    return sequelize.define("Pregunta", {
        enunciado: {
            type: DataTypes.STRING(2500),
            field: 'enunciado',
            allowNull: false
        },
        numero: {
            type: DataTypes.INTEGER(),
            field: 'numero',
            allowNull: false
        },
        peso: {
            type: DataTypes.DECIMAL(4,2),
            field: 'peso',
            allowNull: true
        },
        esqueleto: {
            type: DataTypes.TEXT() ,
            field: 'esqueleto',
            allowNull: true
        },

    }, {
        timestamps: true,
        classMethods: {
            associate: function(db) {

            },
        }
    });
};
