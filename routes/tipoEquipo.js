const { Router } = require("express");
const {
  createTipoEquipo,
  getTipoEquipos,
  editar_tipoEquipo,
  eliminar_equipo,
} = require("../controllers/tipoEquipo");

const router = Router();

//Crear
router.post("/", createTipoEquipo);

//Listar
router.get("/", getTipoEquipos);

// Editar
router.put("/:id", editar_tipoEquipo);

//Eliminar
router.delete("/:id", eliminar_equipo);

module.exports = router;
