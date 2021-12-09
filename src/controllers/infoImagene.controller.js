const { response, request } = require("express");
const { Op } = require("sequelize");
const { InfoImagene } = require("../models");

const crearInfoImagene = async(req, res = response) => {
    const data = req.body;
    data.id_empresa = data.empresa;
    infoImagene = new InfoImagene(data);
    await infoImagene.save();
    return res.status(200).json({
        infoImagene
    });
}

const obtenerInfoImagenesPorEmpresa = async(req = request, res) => {
    const { empresa } = req.body;
    const infoImagenes = await InfoImagene.findAll({
        where: {
            id_empresa: empresa,
            imagen: {
                [Op.not]: null,
            }
        }
    });
    res.status(200).json({
        infoImagenes
    });
}

const obtenerInfoImagenesPorEmpresaSinFoto = async(req = request, res) => {
    const { empresa } = req.body;
    const infoImagenes = await InfoImagene.findAll({
        where: {
            id_empresa: empresa,
            imagen: {
                [Op.is]: null,
            }
        }
    });
    res.status(200).json({
        infoImagenes
    });
}

const buscarInfoImagenePorId = async(req = request, res = response) => {
    const { id } = req.params;
    let infoImagene = await InfoImagene.findByPk(id);
    if (!infoImagene) {
        return res.status(204).json({
            msg: `No se encontro la imagen con el id: ${id}`
        });
    }
    return res.status(200).json({
        infoImagene
    });
}

const actualizarInfoImagene = async(req = request, res = response) => {
    const data = req.body;
    const { id } = req.params;
    infoImagene = await InfoImagene.findByPk(id);
    infoImagene.id_empresa = data.empresa || infoImagene.id_empresa;
    infoImagene.save();
    return res.status(200).json({
        infoImagene
    });
}

const eliminarInfoImagene = async(req = request, res = response) => {
    const { id } = req.params;
    let infoImagene = await InfoImagene.findByPk(id);
    infoImagene.destroy();
    return res.status(200).json({
        msg: "Se ha eliminado correctamente la imagen"
    });
}

module.exports = {
    crearInfoImagene,
    obtenerInfoImagenesPorEmpresa,
    obtenerInfoImagenesPorEmpresaSinFoto,
    buscarInfoImagenePorId,
    actualizarInfoImagene,
    eliminarInfoImagene,
}