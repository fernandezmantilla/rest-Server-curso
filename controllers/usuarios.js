const { response, request } = require('express');
const fecha = new Date();

const usuariosGet =  (req = request, res = response) => {
    const {usuario = 'no definido', password ='no definido'} = req.query;
    res.json({
      msg: 'get API',
      fecha: fecha,
      usuario,
      password
    })
  };

  const usuariosPut =  (req, res = response) => {

    const id = req.params.id;
    res.json({
      msg: 'put API',
      fecha: fecha,
      id
    })
  };

  const usuariosDelete =  (req, res = response) => {
    res.json({
      msg: 'Delete API',
      fecha: fecha
    })
  };

  const usuariosPost =  (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
      msg: 'Post API',
      fecha: fecha,
      nombre,
      edad
    })
  };  
  const usuariosPatch =  (req, res = response) => {
    res.json({
      msg: 'Patch API',
      fecha: fecha
    })
  };






  module.exports = {
      usuariosGet,
      usuariosPut,
      usuariosDelete,
      usuariosPost,
      usuariosPatch
  }