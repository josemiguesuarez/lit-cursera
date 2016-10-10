/*jslint node: true */
"use strict";
/**
 * Modelo de un estudiante en la base de datos
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    //Se define los atributos de un estudiante
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
              db.Estudiante.belongsToMany(db.Examen, {
                  through: db.Estudiante_examen,
                  as: {
                      singular: "examen",
                      plural: "examenes"
                  }
              });

            },
        }
    });
};
