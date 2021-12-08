const { DataTypes } = require("sequelize");
const { sequelize } = require('../database/index');
const Empresa = require("./empresa");

const InfoItem = sequelize.define(
    "info_items", {
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
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    }, {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = InfoItem;