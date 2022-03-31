const bcryptjs = require('bcryptjs');
const { response, request } = require('express');
const { genJWT } = require('../helpers/gen-jwt');
const Usuario = require('../models/usuario');

const login = async (req, res = response) => {
    const { eMail, password } = req.body;
    try {
        // verificar el correo, y el password.....
        const usuario = await Usuario.findOne({eMail});
        if (!usuario){
            return res.status(400).json({
                msg: 'El usuario y/o el password no son correctos - eMail'
            });
        }

       // verificar si el usuario está Activo.......
       if (!usuario.status){
        return res.status(400).json({
            msg: 'El usuario y/o el password no son correctos - inactivo'
        });
    }

    // verificar password.....
    const checkPassword = bcryptjs.compareSync(password, usuario.password );
    console.log(checkPassword);

    if (!checkPassword){
        return res.status(400).json({
            msg: 'El usuario y/o el password no son correctos - password'
        });        
    }
       // generar el JWT (json web token)

    const token = await genJWT( usuario.id );
        res.json({
            usuario,
            token,
            msg: 'Login ok'
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al logearse, comuniquese con el administrador'
        })
    }

};


module.exports = {
    login
};