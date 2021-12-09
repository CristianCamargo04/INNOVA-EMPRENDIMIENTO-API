const { response, request } = require("express");
const { InfoItem } = require("../models");

const crearInfoItem = async(req, res = response) => {
    const data = req.body;
    data.id_empresa = data.empresa;
    infoItem = new InfoItem(data);
    await infoItem.save();
    return res.status(200).json({
        infoItem
    });
}

const obtenerInfoItemsPorEmpresa = async(req = request, res) => {
    const { empresa } = req.body;
    const infoItems = await InfoItem.findAll({ where: { id_empresa: empresa } });
    res.status(200).json({
        infoItems
    });
}

const buscarInfoItemPorId = async(req = request, res = response) => {
    const { id } = req.params;
    let infoItem = await InfoItem.findByPk(id);
    if (!infoItem) {
        return res.status(204).json({
            msg: `No se encontro el item con el id: ${id}`
        });
    }
    return res.status(200).json({
        infoItem
    });
}

const actualizarInfoItem = async(req = request, res = response) => {
    const data = req.body;
    const { id } = req.params;
    infoItem = await InfoItem.findByPk(id);
    infoItem.descripcion = data.descripcion || infoItem.descripcion;
    infoItem.id_empresa = data.empresa || infoItem.id_empresa;
    infoItem.save();
    return res.status(200).json({
        infoItem
    });
}

const eliminarInfoItem = async(req = request, res = response) => {
    const { id } = req.params;
    let infoItem = await InfoItem.findByPk(id);
    infoItem.destroy();
    return res.status(200).json({
        msg: "Se ha eliminado correctamente el item"
    });
}

module.exports = {
    crearInfoItem,
    obtenerInfoItemsPorEmpresa,
    buscarInfoItemPorId,
    actualizarInfoItem,
    eliminarInfoItem,
}