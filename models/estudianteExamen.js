/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var defaultInclude, db;
    return sequelize.define("EstudianteExamen", {
        calificacion: {
            type: DataTypes.REAL(2),
            field: 'enunciado',
            allowNull: false
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        classMethods: {
            associate: function(dbP) {
              db = dbP
              db.EstudianteExamen.belongsTo(db.Estudiante,{as:'estudiante', foreignKey:{allowNull:false}});
              db.EstudianteExamen.belongsTo(db.Examen,{as:'examen', foreignKey:{allowNull:false}});
            },
        }
    });
};
