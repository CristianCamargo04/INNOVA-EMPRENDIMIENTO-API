const express = require("express");
const cors = require("cors");
const paths = require("../routes/index");

const { dbConnection } = require('../database/config');


class Server {
    constructor() {

        this.app = express();

        this.paths = paths

        this.conectarDB();

        this.middleware();

        this.routes();

        this.port = process.env.PORT;

    }

    async conectarDB() {
        await dbConnection()
    }

    routes() {
        for (const route in paths) {
            if (Object.hasOwnProperty.call(paths, route)) {
                this.app.use(this.paths[route], require(`../routes/${route}.routes`));
                // this.app.use(this.paths.productos, require("../routes/productos.routes"));
            }
        }
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }

    listen() {
        this.app.listen(this.port, console.log(`Escuchando en el puerto ${this.port}`));
    }
}

module.exports = Server;