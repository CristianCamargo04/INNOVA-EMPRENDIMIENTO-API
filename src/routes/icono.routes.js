const { Router } = require("express");
const { check } = require("express-validator");

const {
    crearIcono,
    obtenerIconos,
    obtenerIconosSinFoto,
    buscarIconoPorId,
    actualizarIcono,
    eliminarIcono
} = require("../controllers/icono.controller");

const { existIcono } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares");

const route = Router();

route.post("/", [
    check("redsocial", "debe existir la redsocial").notEmpty(),
    validarCampos
], crearIcono);

route.get("/", obtenerIconos);

route.get("/sinfoto/", obtenerIconosSinFoto);

route.get("/:id", [
    check("id").custom(existIcono),
    validarCampos
], buscarIconoPorId);

route.put("/:id", [
    check("redsocial", "debe existir la redsocial").notEmpty(),
    check("id").custom(existIcono),
    validarCampos
], actualizarIcono);

route.delete("/:id", [
    check("id", "El id no debe ser nulo").notEmpty(),
    check("id").custom(existIcono),
    validarCampos
], eliminarIcono)

module.exports = route;