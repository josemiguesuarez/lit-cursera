/*jslint node: true */
"use strict";
/**
 * Modelo para las respuestas de un estudiante en la base de datos
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    //Se definen los campos que tiene una rrespuesta en la base de datos
    return sequelize.define("Respuesta", {
        calificacion: {
            type: DataTypes.DECIMAL(8,4),
            field: 'calificacion',
            allowNull: true
        },
        retroalimentacion: {
            type: DataTypes.STRING(2500),
            field: 'retroalimentacion',
            allowNull: true
        },
        texto: {
            type: DataTypes.TEXT(),
            field: 'respuesta',
            allowNull: true
        }
    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
              db = dbP;
              db.Respuesta.belongsTo(db.Pregunta,{as:'pregunta', foreignKey:{allowNull:false}});
            },
            save: function(model) {
                return db.Respuesta.findById(model.id).then(function(modelAnt) {
                    if (modelAnt)
                        return modelAnt.update(model);
                    else
                        return db.Respuesta.create(model);
                });
            }
        }
    });
};
