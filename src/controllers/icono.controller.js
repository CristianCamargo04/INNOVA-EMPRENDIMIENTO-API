const { response, request } = require("express");
const { Op } = require("sequelize");
const { Icono } = require("../models");

const crearIcono = async(req, res = response) => {
    const data = req.body;
    let icono = await Icono.findOne({ where: { redsocial: data.redsocial } });
    if (icono) {
        return res.status(400).json({
            msg: "Ya existe un Icono con la misma redsocial"
        });
    }
    icono = new Icono(data);
    await icono.save();
    return res.status(200).json({
        icono
    });
}

const obtenerIconos = async(req = request, res) => {
    const iconos = await Icono.findAll({
        where: {
            imagen: {
                [Op.not]: null,
            }
        }
    });
    res.status(200).json({
        iconos
    });
}

const obtenerIconosSinFoto = async(req = request, res) => {
    const iconos = await Icono.findAll({
        where: {
            imagen: {
                [Op.is]: null,
            }
        }
    });
    res.status(200).json({
        iconos
    });
}

const buscarIconoPorId = async(req = request, res = response) => {
    const { id } = req.params;
    let icono = await Icono.findByPk(id);
    if (!icono) {
        return res.status(204).json({
            msg: `No se encontro el Icono con el id: ${id}`
        });
    }
    return res.status(200).json({
        icono
    });
}

const actualizarIcono = async(req = request, res = response) => {
    const data = req.body;
    const { id } = req.params;
    let icono = await Icono.findOne({ where: { redsocial: data.redsocial } });
    if (icono) {
        res.status(400).json({
            msg: `Ya existe un Icono con el redsocial ${data.redsocial}`
        });
    }
    icono = await Icono.findByPk(id);
    icono.redsocial = data.redsocial;
    icono.save();
    return res.status(200).json({
        icono
    });
}

const eliminarIcono = async(req = request, res = response) => {
    const { id } = req.params;
    let icono = await Icono.findByPk(id);
    icono.destroy();
    return res.status(200).json({
        msg: "Se ha eliminado correctamente el Icono"
    });
}

module.exports = {
    crearIcono,
    obtenerIconos,
    obtenerIconosSinFoto,
    buscarIconoPorId,
    actualizarIcono,
    eliminarIcono,
}