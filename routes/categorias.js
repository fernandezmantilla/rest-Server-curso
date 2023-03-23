const { Router } = require('express');
const { check } = require('express-validator');
const { validJWT } = require('../middlewares/valid-jwt');

const { validarCampos, esAdminRole } = require('../middlewares');
const { 
    crearCategoria, 
    obtenerCategorias, 
    obtenerCategoria, 
    actualizarCategoria,
    borrarCategorias } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validator');

const router = Router();

// ruta a la que se apuntará....
// {{url}}/api/categorias
// obtener todas las categorías......
router.get('/', obtenerCategorias);
// para obtener una categoría específica...
router.get('/:id', [
   check('id', 'No es un Id válido').isMongoId(),
   validarCampos,
   check('id').custom( existeCategoria)
],obtenerCategoria);
// crear una categoría.. privada- cualquier usuario
router.post('/', [ validJWT,
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos ], crearCategoria);

// Actualizar una categoría....solo usuarios logueado 
router.put('/:id', [
   validJWT, 
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('id').custom( existeCategoria),
    validarCampos
], actualizarCategoria );

// Borrar una categoría.... solo admin...
router.delete('/:id', [
    validJWT,
    esAdminRole,
    check('id').custom( existeCategoria)    
    ],
    borrarCategorias);



module.exports = router;