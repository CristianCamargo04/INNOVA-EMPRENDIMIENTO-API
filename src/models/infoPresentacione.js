const { DataTypes } = require("sequelize");
const { sequelize } = require('../database/index');
const Empresa = require("./empresa");

const InfoPresentacione = sequelize.define(
    "info_presentaciones", {
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
        imagen1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imagen2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imagen3: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        video: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = InfoPresentacione;