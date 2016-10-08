/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
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
