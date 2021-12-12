const { response, request } = require("express");
const { Op } = require("sequelize");
const { InfoTargeta } = require("../models");

const crearInfoTargeta = async(req, res = response) => {
    const data = req.body;
    data.id_empresa = data.empresa;
    infoTargeta = new InfoTargeta(data);
    await infoTargeta.save();
    return res.status(200).json({
        infoTargeta
    });
}

const obtenerInfoTargetasPorEmpresa = async(req = request, res) => {
    let { empresa } = req.query;
    let where = { actualidad: false };
    if (empresa) {
        where.id_empresa = empresa;
    }
    const infoTargetas = await InfoTargeta.findAll({ where });
    res.status(200).json({
        infoTargetas
    });
}

const obtenerInfoActualidadesPorEmpresa = async(req = request, res) => {
    let { empresa } = req.query;
    let where = {
        actualidad: true,
        imagen: {
            [Op.not]: null,
        }
    };
    if (empresa) {
        where.id_empresa = empresa;
    }
    const infoActualidades = await InfoTargeta.findAll({ where });
    res.status(200).json({
        infoActualidades
    });
}

const buscarInfoTargetaPorId = async(req = request, res = response) => {
    const { id } = req.params;
    let infoTargeta = await InfoTargeta.findByPk(id);
    if (!infoTargeta) {
        return res.status(204).json({
            msg: `No se encontro la tarjeta con el id: ${id}`
        });
    }
    return res.status(200).json({
        infoTargeta
    });
}

const actualizarInfoTargeta = async(req = request, res = response) => {
    const data = req.body;
    const { id } = req.params;
    infoTargeta = await InfoTargeta.findByPk(id);
    infoTargeta.titulo = data.titulo || infoTargeta.titulo;
    infoTargeta.descripcion = data.descripcion || infoTargeta.descripcion;
    infoTargeta.actualidad = data.actualidad || infoTargeta.actualidad;
    infoTargeta.url = data.url || infoTargeta.url;
    infoTargeta.id_empresa = data.empresa || infoTargeta.id_empresa;
    infoTargeta.save();
    return res.status(200).json({
        infoTargeta
    });
}

const eliminarInfoTargeta = async(req = request, res = response) => {
    const { id } = req.params;
    let infoTargeta = await InfoTargeta.findByPk(id);
    infoTargeta.destroy();
    return res.status(200).json({
        msg: "Se ha eliminado correctamente la tarjeta"
    });
}

module.exports = {
    crearInfoTargeta,
    obtenerInfoTargetasPorEmpresa,
    obtenerInfoActualidadesPorEmpresa,
    buscarInfoTargetaPorId,
    actualizarInfoTargeta,
    eliminarInfoTargeta,
}