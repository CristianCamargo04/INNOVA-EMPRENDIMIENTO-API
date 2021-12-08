const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.NAME_DB, process.env.USER_DB, process.env.PASS_DB, {
    host: process.env.HOST_DB,
    dialect: "mysql",
    logging: false,
});

exports.sequelize = sequelize;