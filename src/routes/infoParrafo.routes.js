const { Router } = require("express");
const { check } = require("express-validator");

const {
    crearInfoParrafo,
    obtenerInfoParrafosPorEmpresa,
    buscarInfoParrafoPorId,
    actualizarInfoParrafo,
    eliminarInfoParrafo
} = require("../controllers/infoParrafo.controller");

const { existInfoParrafo } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares");

const route = Router();

route.post("/", [
    check("parrafo", "debe existir la parrafo").notEmpty(),
    check("empresa", "debe existir la empresa").notEmpty(),
    validarCampos
], crearInfoParrafo);

route.get("/", [
    check("empresa", "debe existir la empresa").notEmpty(),
    validarCampos
], obtenerInfoParrafosPorEmpresa);

route.get("/:id", [
    check("id").custom(existInfoParrafo),
    validarCampos
], buscarInfoParrafoPorId);

route.put("/:id", [
    check("parrafo", "debe existir la parrafo").notEmpty(),
    check("id").custom(existInfoParrafo),
    validarCampos
], actualizarInfoParrafo);

route.delete("/:id", [
    check("id", "El id no debe ser nulo").notEmpty(),
    check("id").custom(existInfoParrafo),
    validarCampos
], eliminarInfoParrafo)

module.exports = route;