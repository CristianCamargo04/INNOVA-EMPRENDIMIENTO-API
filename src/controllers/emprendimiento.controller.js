const { response, request } = require("express");
const { Emprendimiento } = require("../models");

const crearEmprendimiento = async(req, res = response) => {
    const data = req.body;
    let emprendimiento = await Emprendimiento.findOne({ where: { nombre: data.nombre } });
    if (emprendimiento) {
        return res.status(400).json({
            msg: "Ya existe un emprendimiento con el mismo nombre"
        });
    }
    emprendimiento = new Emprendimiento(data);
    await emprendimiento.save();
    return res.status(200).json({
        emprendimiento
    });
}

const obtenerEmprendimientos = async(req = request, res) => {
    const emprendimientos = await Emprendimiento.findAll();
    res.status(200).json({
        emprendimientos
    });
}

const buscarEmprendimientoPorId = async(req = request, res = response) => {
    const { id } = req.params;
    let emprendimiento = await Emprendimiento.findByPk(id);
    if (!emprendimiento) {
        return res.status(204).json({
            msg: `No se encontro el emprendimiento con el id: ${id}`
        });
    }
    return res.status(200).json({
        emprendimiento
    });
}

const actualizarEmprendimiento = async(req = request, res = response) => {
    const data = req.body;
    const { id } = req.params;
    let emprendimiento = await Emprendimiento.findOne({ where: { nombre: data.nombre } });
    if (emprendimiento) {
        res.status(400).json({
            msg: `Ya existe un emprendimiento con el nombre ${data.nombre}`
        });
    }
    emprendimiento = await Emprendimiento.findByPk(id);
    emprendimiento.nombre = data.nombre;
    emprendimiento.save();
    return res.status(200).json({
        emprendimiento
    });
}

const eliminarEmprendimiento = async(req = request, res = response) => {
    const { id } = req.params;
    let emprendimiento = await Emprendimiento.findByPk(id);
    emprendimiento.destroy();
    return res.status(200).json({
        msg: "Se ha eliminado correctamente el emprendimiento"
    });
}

module.exports = {
    crearEmprendimiento,
    obtenerEmprendimientos,
    buscarEmprendimientoPorId,
    actualizarEmprendimiento,
    eliminarEmprendimiento,
}