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
        nombre: {
            type: DataTypes.STRING(20),
            field: 'nombre',
            allowNull: true
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
        estado: {
            type: DataTypes.STRING(20),
            field: 'estado',
            allowNull: true
        },
        tipoid: {
          type: DataTypes.INTEGER(),
          field: 'tipoid',
          allowNull: false
        }

    }, {
        timestamps: true,
        classMethods: {
            associate: function(db) {

            },
        }
    });
};
