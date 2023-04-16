const { Router } = require("express");
const {
  createUsuario,
  getUsuarios,
  editar_usuario,
  eliminar_usuario,
} = require("../controllers/usuario");

const router = Router();

//Crear
router.post("/", createUsuario);

//Listar
router.get("/", getUsuarios);

//Editar
router.put("/:id", editar_usuario);

//Eliminar
router.delete("/:id", eliminar_usuario);

module.exports = router;
