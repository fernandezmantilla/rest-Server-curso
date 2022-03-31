const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const fecha = new Date();
const Usuario = require('../models/usuario');

// endpoint para GET de la base de datos ....
const usuariosGet = async (req = request, res = response) => {
  const { limite = 2, desde = 0 } = req.query;
  const query = {status: true};
  // método tradicional......
  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));
  // const total = await Usuario.countDocuments(query);
  // simplificando......
  const [ total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  ])

  res.json({
    fecha: fecha,
    registros: total,
    usuarios

  })
};

// actualizar registros.....

const usuariosPut = async (req, res = response) => {

  const { id } = req.params;
  const { _id, password, google, eMail, ...resto } = req.body;


  // validar contra base de datos...

  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  };
  const userDb = await Usuario.findByIdAndUpdate(id, resto);
  res.json({
    fecha: fecha,
    userDb
  })
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  // const uid = req.uid;
  // solo poner en falso .....
  const usuario = await Usuario.findByIdAndUpdate( id, {status: false});
  // const userAuth = req.usuario;
  res.json({
    msg: 'Borrando: ',
    // auth: userAuth,
    usuario: usuario,
    // uid:  uid,
    fecha: fecha
  })
};

// insertar un registro nuevo

const usuariosPost = async (req, res = response) => {
  const { nombre, eMail, password, rol } = req.body;
  const usuario = new Usuario({
    nombre, eMail, password, rol,
  });

  // Encriptar contraseña...
  // decido que tan complejo es el encriptamiento.. por def 10 vueltas
  const salt = bcrypt.genSaltSync();
  // genero la llave encriptada...
  usuario.password = bcrypt.hashSync(password, salt);
  // Salver datos
  await usuario.save();
  res.json({
    usuario
  })
};

const usuariosPatch = (req, res = response) => {
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