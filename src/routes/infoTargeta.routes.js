const { Router } = require("express");
const { check } = require("express-validator");

const {
    crearInfoTargeta,
    obtenerInfoTargetasPorEmpresa,
    obtenerInfoActualidadesPorEmpresa,
    buscarInfoTargetaPorId,
    actualizarInfoTargeta,
    eliminarInfoTargeta
} = require("../controllers/infoTargeta.controller");

const { existInfoTargeta } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares");

const route = Router();

route.post("/", [
    check("titulo", "debe existir el titulo").notEmpty(),
    check("actualidad", "debe existir la actualidad").notEmpty(),
    check("url", "debe ser un url").optional().isURL(),
    check("empresa", "debe existir la empresa").notEmpty(),
    validarCampos
], crearInfoTargeta);

route.get("/", [
    check("empresa", "debe existir la empresa").notEmpty(),
    validarCampos
], obtenerInfoTargetasPorEmpresa);

route.get("/actualidades/", [
    check("empresa", "debe existir la empresa").notEmpty(),
    validarCampos
], obtenerInfoActualidadesPorEmpresa);

route.get("/:id", [
    check("id").custom(existInfoTargeta),
    validarCampos
], buscarInfoTargetaPorId);

route.put("/:id", [
    check("titulo", "debe existir el titulo").notEmpty(),
    check("actualidad", "debe existir la actualidad").notEmpty(),
    check("url", "debe ser un url").optional().isURL(),
    check("empresa", "debe existir la empresa").notEmpty(),
    check("id").custom(existInfoTargeta),
    validarCampos
], actualizarInfoTargeta);

route.delete("/:id", [
    check("id", "El id no debe ser nulo").notEmpty(),
    check("id").custom(existInfoTargeta),
    validarCampos
], eliminarInfoTargeta)

module.exports = route;