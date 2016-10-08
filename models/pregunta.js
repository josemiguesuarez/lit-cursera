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
        esqueleto: {
            type: DataTypes.TEXT(),
            field: 'esqueleto',
            allowNull: true
        },

    }, {
        timestamps: true,
        classMethods: {
            associate: function(dbP) {
                db = dbP;
                db.Pregunta.belongsToMany(db.Examen, {
                    through: db.Examen_pregunta,
                    as: {
                        singular: "examen",
                        plural: "examenes"
                    }
                });

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
