const { Router } = require("express");
const route = Router();

const { cargarImagen, obtenerImagen } = require("../controllers/imagen.controller");

route.put("/:tipo/:id", cargarImagen);
route.get("/:tipo/:img", obtenerImagen);

module.exports = route;