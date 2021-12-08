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
            allowNull: false,
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

module.exports = Empresa;