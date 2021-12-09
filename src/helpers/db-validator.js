const { Emprendimiento } = require("../models");

const existEmprendimiento = async(id) => {
    const emprendimiento = await Emprendimiento.findByPk(id);
    if (!emprendimiento) {
        throw new Error(`el emprendimiento con el id ${id} no se enceuntra registrado en la base de datos`);
    }
}

module.exports = {
    existEmprendimiento,
}