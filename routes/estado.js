const { Router } = require("express");
const {
  createEstado,
  getEstados,
  editar_estado,
  eliminar_estado,
} = require("../controllers/estado");

const router = Router();

//Crear
router.post("/", createEstado);

//Listar
router.get("/", getEstados);

//Editar
router.put("/:id", editar_estado);

//Eliminar
router.delete("/:id", eliminar_estado);

module.exports = router;
