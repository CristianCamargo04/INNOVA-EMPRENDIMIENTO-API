const { Router } = require("express");
const { check } = require("express-validator");

const {
    crearEmpresa,
    obtenerEmpresas,
    buscarEmpresaPorId,
    actualizarEmpresa,
    eliminarEmpresa
} = require("../controllers/empresa.controller");

const { existEmpresa } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares");

const route = Router();

route.post("/", [
    check("nombre", "debe existir el nombre").notEmpty(),
    check("nombre", "debe existir el nombre").notEmpty(),
    validarCampos
], crearEmpresa);

route.get("/", obtenerEmpresas);

route.get("/:id", [
        check("id").custom(existEmpresa),
        validarCampos
    ],
    buscarEmpresaPorId);

route.put("/:id", [
        check("nombre", "debe existir el nombre").notEmpty(),
        check("id").custom(existEmpresa),
        validarCampos
    ],
    actualizarEmpresa);

route.delete("/:id", [
    check("id", "El id no debe ser nulo").notEmpty(),
    check("id").custom(existEmpresa),
    validarCampos
], eliminarEmpresa)

module.exports = route;