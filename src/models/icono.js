const { DataTypes } = require("sequelize");
const { sequelize } = require('../database/index');

const Icono = sequelize.define(
    "iconos", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        redsocial: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Icono;