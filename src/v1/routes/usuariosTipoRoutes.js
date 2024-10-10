import express from "express";
import UsuariosTipoController from "../../controllers/usuariosTipoController.js";

const router = express.Router();

const usuariosTipoController = new UsuariosTipoController();

router.get("/", usuariosTipoController.buscarTodos);

router.get("/:id", usuariosTipoController.buscarPorId); 

router.post('/', usuariosTipoController.crear);

router.patch("/:id", usuariosTipoController.actualizar)

export {router};