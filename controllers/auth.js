const bcryptjs = require('bcryptjs');
const { response, request } = require('express');
const { json } = require('express/lib/response');
const { genJWT } = require('../helpers/gen-jwt');
const { googleverify } = require('../helpers/google-verify');
// const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');
const fecha = new Date();

const login = async (req, res = response) => {
    const { eMail, password } = req.body;
    try {
        // verificar el correo, y el password.....
        const usuario = await Usuario.findOne({ eMail });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario y/o el password no son correctos - eMail'
            });
        }

        // verificar si el usuario está Activo.......
        if (!usuario.status) {
            return res.status(400).json({
                msg: 'El usuario y/o el password no son correctos - inactivo'
            });
        }

        // verificar password.....
        const checkPassword = bcryptjs.compareSync(password, usuario.password);
        console.log(checkPassword);

        if (!checkPassword) {
            return res.status(400).json({
                msg: 'El usuario y/o el password no son correctos - password'
            });
        }
        // generar el JWT (json web token)

        const token = await genJWT(usuario.id);
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

const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;
    try {
        const {nombre, img, eMail} = await googleverify(id_token);
        // console.log(googleUser);
        // checamos que el correo no esté registrado en la db...
        let usuario = await Usuario.findOne({eMail});
        if (!usuario){ 
            // lo creamos......
            const data = {
                nombre: nombre,
                eMail: eMail,
                img: img,
                password: fecha.toString(),
                rol: 'USER_ROLE',
                google: true
            };
            usuario = new Usuario( data );
            // console.log (usuario);
            await usuario.save();
        };

        if (!usuario.status){
            json.status(401).json({
                ok: false,
                msg: `El usuario ${usuario.nombre}, está bloqueado`
            });            
        }
        // generar el JWT....
        const token = await genJWT(usuario.id);        

        // console.log(nombre+': '+eMail);
        res.json({
            msg: `El usuario ${usuario.nombre}, se logueo el ${fecha}`,
            correo: usuario.eMail,
            token: id_token 
        })
    } catch (error) {
       return res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    };

}

module.exports = {
    login,
    googleSignIn
};