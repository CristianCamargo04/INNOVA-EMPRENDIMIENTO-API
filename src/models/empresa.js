const { DataTypes } = require("sequelize");
const { sequelize } = require('../database/index');
const Emprendimiento = require("./emprendimiento");

const Empresa = sequelize.define(
    "empresas", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        id_emprendimiento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Emprendimiento,
                key: "id",
            },
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    }
);

Emprendimiento.hasMany(Empresa, { foreignKey: 'id' })
Empresa.belongsTo(Emprendimiento, { foreignKey: 'id_emprendimiento' })

module.exports = Empresa;