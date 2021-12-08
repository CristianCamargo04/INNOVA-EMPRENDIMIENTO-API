const { Router } = require("express");
const { check } = require("express-validator");

const { crearCargo } = require("../controllers/cargo.controller");
const { validarCampos } = require("../middlewares");

const route = Router();

route.post("/", [
    check("carg_nombre", "debe existir el nombre").notEmpty(),
    validarCampos
], crearCargo);

module.exports = route;