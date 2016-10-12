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
    return sequelize.define("FragmentoCodigo", {
        inicio: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fin: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        tipo: {
            type: DataTypes.CHAR(3),
            allowNull: false
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        classMethods: {
            associate: function(dbP) {
              db = dbP;
              db.FragmentoCodigo.belongsTo(db.CodigoSolucion);


            },
        }
    });
};
