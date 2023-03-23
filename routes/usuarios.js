
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost, usuariosPatch } = require('../controllers/usuarios');
const { isValidRol, isEmail, isIdExists } = require('../helpers/db-validator');
const { validJWT } = require('../middlewares/valid-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/valid-roles');
const validarCampos = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(isIdExists),
    check('rol').custom((rol) => isValidRol(rol)),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    validJWT,
    // esAdminRole, 
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(isIdExists),
    validarCampos
], usuariosDelete);

router.post('/',
    [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('password', 'El password es requerido y con mas de 6 caracteres').isLength({ min: 6 }),
        // check('eMail', 'El correo es inválido').isEmail(),
        check('eMail').custom((eMail) => isEmail(eMail)),
        check('rol').custom((rol) => isValidRol(rol)),
        validarCampos
    ], usuariosPost)

router.patch('/', usuariosPatch);



module.exports = router;