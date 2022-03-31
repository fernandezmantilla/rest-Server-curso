const { response, request } = require('express');

const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: "No hay token"
        });
    };
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // checar si el usuario autenticado tiene privilegios para modificar el DB.....
        const usuario = await Usuario.findById( uid );
        if (!usuario){
            return res.status(401).json({
                msg: "usuario no existe" 
           });           
        }
        // verificar si está activo....
        // if(!usuario.status) {
        //    return res.status(401).json({
        //         msg: "usuario no activo" 
        //     )};
        // }
        if(!usuario.status){
            return res.status(401).json({
                 msg: "usuario no activo" 
            });
        };
        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "token no válido"
        })
    };

}






module.exports = {
    validJWT
}