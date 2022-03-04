const express = require('express');
const cors = require('cors');

//  defino el puerto ha utilizar....

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    // Middlewares....
    this.middleware();
    // Rutas..
    this.routes();
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
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.clear;
      console.log('Servidor Web/Rest, corriendo en el puerto: ' + this.port);
    });
  }

}





module.exports = Server;