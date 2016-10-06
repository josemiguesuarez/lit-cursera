/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
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
        estado: {
            type: DataTypes.STRING(20),
            field: 'estado',
            allowNull: true
        }

    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
              db = dbP;

            },
            save: function(model) {
                return db.Pregunta.findById(model.id).then(function(modelAnt) {
                    if (modelAnt)
                        return modelAnt.update(model);
                    else
                        return db.Pregunta.create(model);
                });
            }
        }
    });
};
