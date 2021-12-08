const { DataTypes } = require("sequelize");
const { sequelize } = require('../database/index');
const Empresa = require("./empresa");

const InfoTargeta = sequelize.define(
    "info_targetas", {
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
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        actualidad: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = InfoTargeta;