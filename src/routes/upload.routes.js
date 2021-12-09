const { response, request } = require("express");
const { Router } = require("express");
const route = Router();

const { Emprendimiento } = require("../models");

const fs = require("fs");
const path = require("path");

route.put("/:tipo/:id", function(req = request, res = response) {
    const tipo = req.params.tipo;
    const id = req.params.id;
    if (!req.files)
        return res.status(400).json({
            ok: false,
            err: {
                message: "No se ha seleccionado nigun archivo",
            },
        });
    const tiposValidos = ["emprendimientos"];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(500).json({
            ok: false,
            err: {
                message: "Los tipos permitidas son " + tiposValidos.join(", "),
            },
            tipo,
        });
    }
    let archivo = req.files.archivo;
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[1];
    //Extensiones permitidas
    const extensionesValidas = ["png", "jpg", "gif", "jpeg"];
    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(500).json({
            ok: false,
            err: {
                message: "Las extensiones permitidas son " +
                    extensionesValidas.join(", "),
            },
            ext: extension,
        });
    }
    //Cambiar nombre del archivo
    const nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        //Imagen cargada
        if (tipo === 'emprendimientos') {
            imagenEmprendimiento(id, res, nombreArchivo);
        }
    });
});

async function imagenEmprendimiento(id, res, nombreArchivo) {
    let emprendimiento = await Emprendimiento.findByPk(id);
    if (!emprendimiento) {
        return res.status(204).json({
            msg: `No se encontro el tipo de convenio con el id: ${id}`
        });
    }
    borraArchivo(emprendimiento.imagen, 'emprendimientos');
    emprendimiento.imagen = nombreArchivo;
    emprendimiento.save();
    return res.status(200).json({
        ok: true,
        emprendimiento,
        imagen: nombreArchivo,
        message: "Imagen subida correctamente",
    });
}

function borraArchivo(nombreImagen, tipo) {
    let pathImagen = path.resolve(
        __dirname,
        `../../uploads/${tipo}/${nombreImagen}`
    );
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}

module.exports = route;