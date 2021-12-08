const { response, request } = require("express");
const { Cargo } = require("../models");


const crearCargo = async(req, res = response) => {

    const data = req.body;

    let cargo = await Cargo.findOne({ carg_nombre: data.carg_nombre });

    if (cargo) {
        return res.status(400).json({
            msg: "Ya existe un cargo con el mismo nombre"
        });
    }

    cargo = new Cargo(data);

    console.log(cargo);

    await cargo.save();

    return res.status(200).json({
        cargo
    });


}

module.exports = {
    crearCargo,
}