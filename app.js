
require('dotenv').config();
// paquete para servidor web/rest
const express = require('express');
const Server = require('./models/server');

const server = new Server();


// levanto el servicio....
server.listen();



