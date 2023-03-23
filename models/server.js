const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

//  defino el puerto ha utilizar....

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth:       '/api/auth',
      usuarios:   '/api/usuarios',
      productos: '/api/productos',
      categorias: '/api/categorias'
    }

    // conexion a dataBase.....
    this.conectarDb();
    // Middlewares....
    this.middleware();
    // Rutas..
    this.routes();
  }

  async conectarDb() {
    await dbConnection();
  }

  middleware() {
    // CORS...
    this.app.use(cors());

    // parseo y lectura del body....
    this.app.use(express.json());    
    // directorio público......
    this.app.use(express.static('public'));

  }
  routes() {
    this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    this.app.use(this.paths.auth, require('../routes/auth'));  
    this.app.use(this.paths.productos, require('../routes/productos'));
    this.app.use(this.paths.categorias, require('../routes/categorias'));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.clear;
      console.log('Servidor Web/Rest, corriendo en el puerto: ' + this.port);
    });
  }

}





module.exports = Server;