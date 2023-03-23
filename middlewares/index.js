
const validJWT = require('../middlewares/valid-jwt');
const validaRoles = require('../middlewares/valid-roles');
const validarCampos = require('../middlewares/validar-campos');

module.exports = {
    validJWT,
    ...validaRoles,
    validarCampos
}