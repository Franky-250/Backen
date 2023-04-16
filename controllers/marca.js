const Marca = require("../models/marca");
const { request, response } = require("express");

//Crear
const createMarca = async (req = request, res = response) => {
  try {
    const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : "";
    const marcaDB = await Marca.findOne({ nombre }); //select * from tipoEquipo where nombre=?

    if (marcaDB) {
      return res.status(400).json({ msg: "Ya existe" });
    }
    const data = {
      nombre, // nombre: nombre
    };
    const marca = new Marca(data);
    console.log(marca);
    await marca.save();
    return res.status(201).json(marca);
  } catch (e) {
    return res.status(500).json({
      msg: "Error general " + e,
    });
  }
};

//Listar
const getMarcas = async (req = request, res = response) => {
  try {
    const { estado } = req.query;
    const marcasDB = await Marca.find({ estado }); //select * from estados where estado=?
    return res.json(marcasDB);
  } catch (e) {
    return res.status(500).json({
      msg: "Error general " + e,
    });
  }
};


//Editar
const editar_marca  = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    const marca= await Marca.findByIdAndUpdate(
      id,
      { nombre, estado },
      { new: true }
    );
    res.json(marca);
  } catch (error) {
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
};


//Eliminar
const eliminar_marca = (req = request, res = response) => {
  const { id } = req.params;
  Marca.findByIdAndDelete(id).then((result) => {
    res.json(result);
  });
};

module.exports = { createMarca, getMarcas, editar_marca, eliminar_marca };
