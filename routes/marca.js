const { Router } = require("express");
const {
  createMarca,
  getMarcas,
  editar_marca,
  eliminar_marca,
} = require("../controllers/marca");

const router = Router();

//Crear
router.post("/", createMarca);

//Listar
router.get("/", getMarcas);

//Editar
router.put("/:id", editar_marca);

//Eliminar
router.delete("/:id", eliminar_marca);

module.exports = router;
