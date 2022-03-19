const Role = require('../models/role');
const Usuario = require('../models/usuario');
const isValidRol = async (rol = '') => {
    const isRol = await Role.findOne({ rol });
    if (!isRol) {
        throw new Error(`El) rol ${rol}, no está registrado en la DB`);
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


module.exports = {
    isValidRol,
    isEmail,
    isIdExists
};