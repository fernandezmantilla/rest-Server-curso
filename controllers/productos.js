const { response, request } = require("express");
const { Producto } = require('../models');
// const categoria = require("../models/categoria");

//obtenerCategorias -paginado -total -populate
//obtenerCategoria  -populate

const obtenerProductos = async (req = request, res = response) => {
    const { limite = 2, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        productos
    });
}
const obtenerProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById( id )
        .populate('usuario','nombre')
        .populate('categoria', 'nombre');
    res.json( producto);
}
const crearProducto = async (req = request, res = response) => {
    const {estado, usuario, ...body} = req.body;
    const productoDb = await Producto.findOne({ nombre: body.nombre });
    if (productoDb) {
        return res.status(400).json({
            msg: `El producto ${nombre}, ya está dada de alta`
        })
    }
    // generar la data.....
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id

    }
    const producto = new Producto(data);
    // guardar Db...
    await producto.save();

    res.status(201).json(producto);

}

// actualizarProductoa -
const actualizarProducto = async (req = request, res = response) => {
    const  { id } = req.params;
    const { estado, usuario, ...data} = req.body;
    if( data.nombre)
    {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto =  await Producto
        .findByIdAndUpdate(id, data, { new: true});
    res.json(producto);

}

// borrrarCategoria -status = false 
const borrarProducto = async (req = request, res = response) => {
    const  { id } = req.params;
    const productoDeleted = await Producto.findByIdAndUpdate(id , {estado: false}, {new: true});
    res.json(productoDeleted);
}
module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}