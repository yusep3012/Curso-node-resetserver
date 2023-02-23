import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "../routes/user.routes.js";

// Toma las variables de entorno

dotenv.config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/usuarios";

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Lectura y parseo del body (Recibir la información del body en json)
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.userPath, router);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log("Servidor corriendo en el puerto " + this.port)
    );
  }
}

export default Server;
