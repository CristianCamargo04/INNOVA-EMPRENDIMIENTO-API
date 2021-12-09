const { response, request } = require("express");
const { Empresa, Emprendimiento } = require("../models");

const crearEmpresa = async(req, res = response) => {
    const data = req.body;
    let empresa = await Empresa.findOne({ where: { nombre: data.nombre } });
    if (empresa) {
        return res.status(400).json({
            msg: "Ya existe una Empresa con la mismo nombre"
        });
    }
    data.id_emprendimiento = data.emprendimiento;
    empresa = new Empresa(data);
    await empresa.save();
    return res.status(200).json({
        empresa
    });
}

const obtenerEmpresas = async(req = request, res) => {
    const empresas = await Empresa.findAll({
        include: { model: Emprendimiento }
    });
    res.status(200).json({
        empresas
    });
}

const buscarEmpresaPorId = async(req = request, res = response) => {
    const { id } = req.params;
    let empresa = await Empresa.findByPk(id, {
        include: { model: Emprendimiento }
    });
    if (!empresa) {
        return res.status(204).json({
            msg: `No se encontro la Empresa con el id: ${id}`
        });
    }
    return res.status(200).json({
        empresa
    });
}

const actualizarEmpresa = async(req = request, res = response) => {
    const data = req.body;
    const { id } = req.params;
    let empresa = await Empresa.findOne({
        where: {
            nombre: data.nombre,
            id_emprendimiento: data.emprendimiento
        }
    });
    if (empresa) {
        res.status(400).json({
            msg: `Ya existe una Empresa con la nombre ${data.nombre}`
        });
    }
    empresa = await Empresa.findByPk(id);
    empresa.nombre = data.nombre || empresa.nombre;
    empresa.id_emprendimiento = data.emprendimiento || empresa.data.emprendimiento;
    empresa.save();
    return res.status(200).json({
        empresa
    });
}

const eliminarEmpresa = async(req = request, res = response) => {
    const { id } = req.params;
    let empresa = await Empresa.findByPk(id);
    empresa.destroy();
    return res.status(200).json({
        msg: "Se ha laiminado correctamente la Empresa"
    });
}

module.exports = {
    crearEmpresa,
    obtenerEmpresas,
    buscarEmpresaPorId,
    actualizarEmpresa,
    eliminarEmpresa,
}