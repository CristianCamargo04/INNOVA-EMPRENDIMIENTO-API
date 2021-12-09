const { DataTypes } = require("sequelize");
const { sequelize } = require('../database/index');
const Empresa = require("./empresa");
const Icono = require("./icono");

const InfoRede = sequelize.define(
    "info_redes", {
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
        id_icono: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Icono,
                key: "id",
            },
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    }
);

Icono.hasMany(InfoRede, { foreignKey: 'id' })
InfoRede.belongsTo(Icono, { foreignKey: 'id_icono' })

module.exports = InfoRede;