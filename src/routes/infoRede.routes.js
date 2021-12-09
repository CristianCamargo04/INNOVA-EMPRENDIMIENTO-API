const { Router } = require("express");
const { check } = require("express-validator");

const {
    crearInfoRede,
    obtenerInfoRedes,
    buscarInfoRedePorId,
    actualizarInfoRede,
    eliminarInfoRede,
} = require("../controllers/infoRede.controller");

const { existInfoRede } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares");

const route = Router();

route.post("/", [
    check("empresa", "debe existir la empresa").notEmpty(),
    check("icono", "debe existir el icono").notEmpty(),
    check("usuario", "debe existir el icono").notEmpty(),
    check("url", "debe existir un url").notEmpty(),
    check("url", "debe ser un url").isURL(),
    validarCampos
], crearInfoRede);

route.get("/", obtenerInfoRedes);

route.get("/:id", [
    check("id").custom(existInfoRede),
    validarCampos
], buscarInfoRedePorId);

route.put("/:id", [
    check("empresa", "debe existir la empresa").notEmpty(),
    check("icono", "debe existir el icono").notEmpty(),
    check("usuario", "debe existir el icono").notEmpty(),
    check("url", "debe existir un url").notEmpty(),
    check("url", "debe ser un url").isURL(),
    check("id").custom(existInfoRede),
    validarCampos
], actualizarInfoRede);

route.delete("/:id", [
    check("id", "El id no debe ser nulo").notEmpty(),
    check("id").custom(existInfoRede),
    validarCampos
], eliminarInfoRede)

module.exports = route;