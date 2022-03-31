
const validaJWT = require('../middlewares/valid-jwt');
const validaRoles = require('../middlewares/valid-roles');
const validaCampos = require('../middlewares/validar-campos');

module.exports = {
    ...validaJWT,
    ...validaRoles,
    ...validaCampos
}