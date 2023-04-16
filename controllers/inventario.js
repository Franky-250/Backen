const Inventario = require("../models/inventario");
const { request, response } = require("express");
const Usuario = require("../models/usuario");
const Marca = require("../models/marca");
const Estado = require("../models/estado");
const TipoEquipo = require("../models/tipoEquipo");

//Crear
const createInventario = async (req = request, res = response) => {
  try {
    const data = req.body;
    console.log(data);
    const { usuario, marca, estado, tipoEquipo } = data;
    //validando usuario
    const usuarioDB = Usuario.findOne({
      _id: usuario._id,
      estado: true,
    }); // select * from usuarios where _id=? and estado=true
    if (!usuarioDB) {
      return res.status(400).json({ msg: "usuario invalido" });
    }
    // validando marca
    const marcaDB = Marca.findOne({
      _id: marca._id,
      estado: true,
    }); // select * from marcas where _id=? and estado=true
    if (!marcaDB) {
      return res.status(400).json({ msg: "marca invalida" });
    }
    // validando estado
    const estadoDB = Estado.findOne({
      _id: estado._id,
      estado: true,
    }); // select * from estados where _id=? and estado=true
    if (!estadoDB) {
      return res.status(400).json({ msg: "estado invalido" });
    }
    // validando tipo equipo
    const tipoEquipoDB = TipoEquipo.findOne({
      _id: tipoEquipo._id,
      estado: true,
    }); // select * from tipoequipos where _id=? and estado=true
    if (!tipoEquipoDB) {
      return res.status(400).json({ msg: "Tipo de Equipo invalido" });
    }
    const inventario = new Inventario(data);

    await inventario.save();

    return res.status(201).json(inventario);
  } catch (e) {
    return res.status(500).json({
      msg: "Error general " + e,
    });
  }
};

//Listar
const getInventarios = async (req = request, res = response) => {
  try {
    const inventariosDB = await Inventario.find({}).populate({
      path: "usuario",
      match: {estado: true}
  }).populate({path: "marca",
  match: {estado: true}}).populate({path: "estado",
  match: {estado: true}}).populate({path: "tipoEquipo",
  match: {estado: true}}); //select * from inventarios
    return res.json(inventariosDB);
  } catch (e) {
    return res.status(500).json({
      msg: "Error general " + e,
    });
  }
};

//Editar
const editar_Inventario = (req = request, res = response) => {
  const { id } = req.params;
  const inventario = req.body;
  const nuevo = {
    serial: inventario.serial,
    modelo: inventario.modelo,
    descripcion: inventario.descripcion,
    foto: inventario.foto,
    color: inventario.color,
    fechaCompra: inventario.fechaCompra,
    precio: inventario.precio,
    usuario: inventario.usuario,
    marca: inventario.marca,
    estado: inventario.estado,
    tipoEquipo:inventario.tipoEquipo
  };
  Inventario.findByIdAndUpdate(id, nuevo, { new: true }).then((result) => {
    res.json(result);
  });
};

//Eliminar
const eliminar_Inventario = (req = request, res = response) => {
  const { id } = req.params;
  Inventario.findByIdAndDelete(id).then((result) => {
    res.json(result);
  });
};

module.exports = {
  createInventario,
  getInventarios,
  editar_Inventario,
  eliminar_Inventario,
};
