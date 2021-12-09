const { Router } = require("express");
const { check } = require("express-validator");

const {
    crearInfoItem,
    obtenerInfoItemsPorEmpresa,
    buscarInfoItemPorId,
    actualizarInfoItem,
    eliminarInfoItem
} = require("../controllers/infoItem.controller");

const { existInfoItem } = require("../helpers/db-validator");
const { validarCampos } = require("../middlewares");

const route = Router();

route.post("/", [
    check("descripcion", "debe existir la descripcion").notEmpty(),
    check("empresa", "debe existir la empresa").notEmpty(),
    validarCampos
], crearInfoItem);

route.get("/", [
    check("empresa", "debe existir la empresa").notEmpty(),
    validarCampos
], obtenerInfoItemsPorEmpresa);

route.get("/:id", [
    check("id").custom(existInfoItem),
    validarCampos
], buscarInfoItemPorId);

route.put("/:id", [
    check("descripcion", "debe existir la descripcion").notEmpty(),
    check("id").custom(existInfoItem),
    validarCampos
], actualizarInfoItem);

route.delete("/:id", [
    check("id", "El id no debe ser nulo").notEmpty(),
    check("id").custom(existInfoItem),
    validarCampos
], eliminarInfoItem)

module.exports = route;