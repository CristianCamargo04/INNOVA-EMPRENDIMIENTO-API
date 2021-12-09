const { response, request } = require("express");
const { Emprendimiento, Empresa } = require("../models");

const fs = require("fs");
const path = require("path");

function cargarImagen(req = request, res = response) {
    const tipo = req.params.tipo;
    const id = req.params.id;
    if (!req.files)
        return res.status(400).json({
            ok: false,
            err: {
                message: "No se ha seleccionado nigun archivo",
            },
        });
    const tiposValidos = ["emprendimientos", "empresas"];
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
        const cargas = {
            emprendimientos: imagenModel(id, res, nombreArchivo, Emprendimiento, 'emprendimientos'),
            empresas: imagenModel(id, res, nombreArchivo, Empresa, 'empresas'),
        }
        cargas[tipo];
    });
}

function obtenerImagen(req, res) {
    const tipo = req.params.tipo;
    const img = req.params.img;
    const pathImagen = path.resolve(
        __dirname,
        `../../uploads/${tipo}/${img}`
    );
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        const noImagePath = path.resolve(__dirname, "../assets/no-image.jpg");
        res.sendFile(noImagePath);
    }
}

async function imagenModel(id, res, nombreArchivo, model, tipo) {
    let object = await model.findByPk(id);
    if (!object) {
        return res.status(204).json({
            msg: `No se encontro el objecto con el id: ${id}`
        });
    }
    borraArchivo(object.imagen, tipo);
    object.imagen = nombreArchivo;
    object.save();
    return res.status(200).json({
        ok: true,
        object,
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

module.exports = {
    cargarImagen,
    obtenerImagen,
}