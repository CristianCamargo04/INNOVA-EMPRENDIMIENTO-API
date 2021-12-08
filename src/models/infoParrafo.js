const { DataTypes } = require("sequelize");
const { sequelize } = require('../database/index');
const Empresa = require("./empresa");

const InfoParrafo = sequelize.define(
    "info_parrafos", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_empresa: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Empresa,
                key: "id",
            },
        },
        parrafo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = InfoParrafo;