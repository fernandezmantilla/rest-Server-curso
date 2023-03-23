const { response, request } = require("express");
const { Categoria } = require('../models');

//obtenerCategorias -paginado -total -populate
//obtenerCategoria  -populate

const obtenerCategorias = async (req = request, res = response) => {
    const { limite = 2, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        categorias
    });
}
const obtenerCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById( id ).populate('usuario','nombre');
    res.json( categoria);
}
const crearCategoria = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDb = await Categoria.findOne({ nombre });
    if (categoriaDb) {
        return res.status(400).json({
            msg: `La categoría ${nombre}, ya está dada de alta`
        })
    }
    // generar la data.....
    const data = {
        nombre: nombre,
        usuario: req.usuario._id

    }
    const categoria = new Categoria(data);
    // guardar Db...
    await categoria.save();

    res.status(201).json(categoria);

}

// actualizarCategoria -
const actualizarCategoria = async (req = request, res = response) => {
    const  { id } = req.params;
    const { estado, usuario, ...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria =  await Categoria
        .findByIdAndUpdate(id, data, { new: true});
    res.json(categoria);

}

// borrrarCategoria -status = false 
const borrarCategorias = async (req = request, res = response) => {
    const  { id } = req.params;
    const categoriaDeleted = await Categoria.findByIdAndUpdate(id , {estado: false}, {new: true});
    res.json(categoriaDeleted);
}
module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategorias
}