const { sequelize } = require('../database/index');

const dbConnection = async() => {

    try {
        await sequelize.sync({});
        //await sequelize.sync({ alter: true });
        //(alterar entidades)
        console.log("Base de datos online");

    } catch (error) {
        console.log(error);
        //throw new Error('Error a la hora de iniciar la consola');
    }

}

module.exports = {
    dbConnection,
}