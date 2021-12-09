const { Router } = require("express");
const { check } = require("express-validator");

const {
    crearInfoImagene,
    obtenerInfoImagenesPorEmpresa,
    buscarInfoImagenePorId,
    actualizarInfoImagene,
    eliminarInfoImagene
} = require("../controllers/infoImagene.controller");

const { existInfoImagene } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares");

const route = Router();

route.post("/", [
    check("empresa", "debe existir la empresa").notEmpty(),
    validarCampos
], crearInfoImagene);

route.get("/", [
    check("empresa", "debe existir la empresa").notEmpty(),
    validarCampos
], obtenerInfoImagenesPorEmpresa);

route.get("/:id", [
    check("id").custom(existInfoImagene),
    validarCampos
], buscarInfoImagenePorId);

route.put("/:id", [
    check("id").custom(existInfoImagene),
    validarCampos
], actualizarInfoImagene);

route.delete("/:id", [
    check("id", "El id no debe ser nulo").notEmpty(),
    check("id").custom(existInfoImagene),
    validarCampos
], eliminarInfoImagene)

module.exports = route;