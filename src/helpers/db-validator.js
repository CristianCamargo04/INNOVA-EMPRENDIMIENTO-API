const {
    Emprendimiento,
    Empresa,
    InfoItem,
    InfoTargeta,
} = require("../models");

const existEmprendimiento = async(id) => {
    const emprendimiento = await Emprendimiento.findByPk(id);
    if (!emprendimiento) {
        throw new Error(`el emprendimiento con el id ${id} no se enceuntra registrado en la base de datos`);
    }
}

const existEmpresa = async(id) => {
    const empresa = await Empresa.findByPk(id);
    if (!empresa) {
        throw new Error(`la empresa con el id ${id} no se enceuntra registrado en la base de datos`);
    }
}

const existInfoItem = async(id) => {
    const infoItem = await InfoItem.findByPk(id);
    if (!infoItem) {
        throw new Error(`el item con el id ${id} no se enceuntra registrado en la base de datos`);
    }
}

const existInfoTargeta = async(id) => {
    const infoTargeta = await InfoTargeta.findByPk(id);
    if (!infoTargeta) {
        throw new Error(`la tarjeta con el id ${id} no se enceuntra registrado en la base de datos`);
    }
}

module.exports = {
    existEmprendimiento,
    existEmpresa,
    existInfoItem,
    existInfoTargeta,
}