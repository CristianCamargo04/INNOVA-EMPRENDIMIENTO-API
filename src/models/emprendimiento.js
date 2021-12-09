const { DataTypes } = require("sequelize");
const { sequelize } = require('../database/index');

const Emprendimiento = sequelize.define(
    "emprendimientos", {
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
    }, {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Emprendimiento;