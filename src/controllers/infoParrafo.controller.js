const { response, request } = require("express");
const { InfoParrafo } = require("../models");

const crearInfoParrafo = async(req, res = response) => {
    const data = req.body;
    data.id_empresa = data.empresa;
    infoParrafo = new InfoParrafo(data);
    await infoParrafo.save();
    return res.status(200).json({
        infoParrafo
    });
}

const obtenerInfoParrafosPorEmpresa = async(req = request, res) => {
    const { empresa } = req.body;
    const infoParrafos = await InfoParrafo.findAll({ where: { id_empresa: empresa } });
    res.status(200).json({
        infoParrafos
    });
}

const buscarInfoParrafoPorId = async(req = request, res = response) => {
    const { id } = req.params;
    let infoParrafo = await InfoParrafo.findByPk(id);
    if (!infoParrafo) {
        return res.status(204).json({
            msg: `No se encontro el parrafo con el id: ${id}`
        });
    }
    return res.status(200).json({
        infoParrafo
    });
}

const actualizarInfoParrafo = async(req = request, res = response) => {
    const data = req.body;
    const { id } = req.params;
    infoParrafo = await InfoParrafo.findByPk(id);
    infoParrafo.parrafo = data.parrafo || infoParrafo.parrafo;
    infoParrafo.id_empresa = data.empresa || infoParrafo.id_empresa;
    infoParrafo.save();
    return res.status(200).json({
        infoParrafo
    });
}

const eliminarInfoParrafo = async(req = request, res = response) => {
    const { id } = req.params;
    let infoParrafo = await InfoParrafo.findByPk(id);
    infoParrafo.destroy();
    return res.status(200).json({
        msg: "Se ha eliminado correctamente el item"
    });
}

module.exports = {
    crearInfoParrafo,
    obtenerInfoParrafosPorEmpresa,
    buscarInfoParrafoPorId,
    actualizarInfoParrafo,
    eliminarInfoParrafo,
}