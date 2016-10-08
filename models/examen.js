/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    return sequelize.define("Examen", {
        nombre: {
            type: DataTypes.STRING(250),
            field: 'nombre',
            allowNull: false
        },
        peso: {
            type: DataTypes.REAL(2),
            field: 'peso',
            allowNull: false
        },
        enunciado: {
            type: DataTypes.TEXT(),
            field: 'enunciado',
            allowNull: false
        },
        modeloMundo: {
            type: DataTypes.STRING(2500),
            field: 'modeloMundo',
            allowNull: true
        },
        descripcion: {
            type: DataTypes.STRING(1500),
            field: 'descripcion',
            allowNull: true
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
