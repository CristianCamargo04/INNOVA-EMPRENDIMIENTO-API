const { Router } = require("express");
const { check } = require("express-validator");

const {
    crearEmprendimiento,
    obtenerEmprendimientos,
    buscarEmprendimientoPorId,
    actualizarEmprendimiento,
    eliminarEmprendimiento
} = require("../controllers/emprendimiento.controller");

const { existEmprendimiento } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares");

const route = Router();

route.post("/", [
    check("nombre", "debe existir el nombre").notEmpty(),
    check("emprendimiento", "debe existir el emprendimiento").notEmpty(),
    validarCampos
], crearEmprendimiento);

route.get("/", obtenerEmprendimientos);

route.get("/:id", [
        check("id").custom(existEmprendimiento),
        validarCampos
    ],
    buscarEmprendimientoPorId);

route.put("/:id", [
        check("nombre", "debe existir el nombre").notEmpty(),
        check("emprendimiento", "debe existir el emprendimiento").notEmpty(),
        check("id").custom(existEmprendimiento),
        validarCampos
    ],
    actualizarEmprendimiento);

route.delete("/:id", [
    check("id", "El id no debe ser nulo").notEmpty(),
    check("id").custom(existEmprendimiento),
    validarCampos
], eliminarEmprendimiento)

module.exports = route;