const { Router } = require("express");
const {
  createInventario,
  getInventarios,
  editar_Inventario,
  eliminar_Inventario,
} = require("../controllers/inventario");

const router = Router();

//Crear
router.post("/", createInventario);

//Listar
router.get("/", getInventarios);

//Editar
router.put("/:id", editar_Inventario);

//Eliminar
router.delete("/:id", eliminar_Inventario);

module.exports = router;
