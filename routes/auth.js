const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const validarCampos = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',
    [
        check('password', 'El password es requerido').not().isEmpty(),
        check('eMail', 'El correo es obligatorio').isEmail(),
        validarCampos
    ], login);



module.exports = router;