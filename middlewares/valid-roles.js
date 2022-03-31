const { response } = require("express");
const { request } = require("express");

const esAdminRole = (req = request, res = response, next) =>{
    if (!req.usuario){
       return res.status(500).json({
          msg: 'Verificvar role sin validar token'
       })
    };
    const { rol, nombre} = req.usuario;
    if (rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El usuario ${nombre}, no es administrador`
        })
    };
    next();
};

const tieneRole = (...roles) =>{
    return (req = request, res = response, next)=>{
        if (!req.usuario){
            return res.status(500).json({
               msg: 'Verificvar role sin validar token'
            })
         };        
        // console.log(roles, req.usuario.rol);
        if (!roles.includes( req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos role ${roles}, por lo tanto no tiene privilegios`
            })            
        }
        next();
    }
};




module.exports  =
{
    esAdminRole,
    tieneRole
}