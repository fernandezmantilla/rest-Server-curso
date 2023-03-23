const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const isValidRol = async (rol ='') => {
    console.log(rol);
    const isRol = await Role.findOne({ rol });
    if (!isRol) {
        throw new Error(`El rol ${rol}, no está registrado en la DB`);
    };
};

// Verificar el correo...
const isEmail = async (eMail = '') => {
    const correoExists = await Usuario.findOne({ eMail: eMail });
    if (correoExists) {
        throw new Error(`El correo ${eMail}, ya está registrado`);
    }
};
const isIdExists = async (id) => {
    const idExists = await Usuario.findById( id );
    if (!idExists) {
        throw new Error(`El id ${id}, no está registrado`);
    }
};

const existeCategoria = async ( id ) =>{
  const categoriaExists = await  Categoria.findById(id);
  if(!categoriaExists) {
      throw new Error( `El Id ${id}, no existe `);
  }
}
const existeProducto = async ( id ) =>{
    const productoExists = await Producto.findById(id);
    if(!productoExists) {
        throw new Error( `El producto ${id}, no existe`);
    }
  }
module.exports = {
    isValidRol,
    isEmail,
    isIdExists,
    existeCategoria,
    existeProducto
};