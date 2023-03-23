const { Router } = require('express');
const { check } = require('express-validator');
const { validJWT } = require('../middlewares/valid-jwt');

const { validarCampos, esAdminRole } = require('../middlewares');
const { 
    crearProducto, 
    obtenerProductos, 
    obtenerProducto, 
    actualizarProducto,
    borrarProducto } = require('../controllers/productos');
const { existeCategoria } = require('../helpers/db-validator');
const { existeProducto } = require('../helpers/db-validator');

const router = Router();

// ruta a la que se apuntará....
// {{url}}/api/productos
// obtener todos las productos.....
router.get('/', obtenerProductos);
// para obtener un producto específica...

router.get('/:id', [
   check('id', 'No es un Id válido').isMongoId(),
   check('id').custom( existeProducto),
   validarCampos,
],obtenerProducto);
// crear una categoría.. privada- cualquier 

router.post('/', [ validJWT,
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('categoria', 'La categoría no es valida').isMongoId(),
check('categoria').custom( existeCategoria),
    validarCampos ], crearProducto);

// Actualizar una categoría....solo usuarios logueado 
router.put('/:id', [
   validJWT,
   check('categoria', 'La categoría no es valida').isMongoId(), 
   check('id').custom( existeProducto),
    validarCampos
], actualizarProducto );

// Borrar un producto.... solo admin...
router.delete('/:id', [
    validJWT,
    esAdminRole,
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom( existeProducto)    
    ],
    validarCampos,
    borrarProducto);



module.exports = router;