import express from "express";
import Usuarios from "../../controllers/usuariosControllers.js"

const router = express.Router();
const usuariosTipoController = new Usuarios();
//trae la inf
router.get("/:id", usuariosTipoController.buscarPorId); 
router.get("/", usuariosTipoController.buscarTodos); 
//guarda la inf
router.post('/', usuariosTipoController.crear);

//patch => actualiza 
router.patch("/:id", usuariosTipoController.actualizar)

export {router};
