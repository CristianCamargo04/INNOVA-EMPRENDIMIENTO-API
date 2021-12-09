const { response, request } = require("express");
const { Icono, InfoRede, } = require("../models");

const crearInfoRede = async(req, res = response) => {
    const data = req.body;
    data.id_empresa = data.empresa;
    data.id_icono = data.icono;
    infoRede = new InfoRede(data);
    await infoRede.save();
    return res.status(200).json({
        infoRede
    });
}

const obtenerInfoRedes = async(req = request, res) => {
    const infoRedes = await InfoRede.findAll({
        include: { model: Icono }
    });
    res.status(200).json({
        infoRedes
    });
}

const buscarInfoRedePorId = async(req = request, res = response) => {
    const { id } = req.params;
    let infoRede = await InfoRede.findByPk(id, {
        include: { model: Icono }
    });
    if (!infoRede) {
        return res.status(204).json({
            msg: `No se encontro la red con el id: ${id}`
        });
    }
    return res.status(200).json({
        infoRede
    });
}

const actualizarInfoRede = async(req = request, res = response) => {
    const data = req.body;
    const { id } = req.params;
    infoRede = await InfoRede.findByPk(id);
    infoRede.id_empresa = data.empresa || infoRede.id_empresa;
    infoRede.id_icono = data.icono || infoRede.id_icono;
    infoRede.usuario = data.usuario || infoRede.usuario;
    infoRede.url = data.url || infoRede.url;
    infoRede.save();
    return res.status(200).json({
        infoRede
    });
}

const eliminarInfoRede = async(req = request, res = response) => {
    const { id } = req.params;
    let infoRede = await InfoRede.findByPk(id);
    infoRede.destroy();
    return res.status(200).json({
        msg: "Se ha eliminado correctamente la red"
    });
}

module.exports = {
    crearInfoRede,
    obtenerInfoRedes,
    buscarInfoRedePorId,
    actualizarInfoRede,
    eliminarInfoRede,
}