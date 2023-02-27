import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "../routes/user.routes.js";
import dbConection from "../database/config.js";

// Toma las variables de entorno

dotenv.config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.userPath = "/api/usuarios";

    // Conectar a base de datos
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async connectDB() {
    await dbConection();
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
