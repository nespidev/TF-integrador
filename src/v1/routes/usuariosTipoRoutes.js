import express from "express";
import UsuariosTipoController from "../../controllers/usuariosTipoController.js";
import { auth } from "../../middlewares/authMiddleware.js";
import { Roles } from "../../utiles/roles.js"

const router = express.Router();

const usuariosTipoController = new UsuariosTipoController();

router.get("/",auth([Roles.ADMIN]), usuariosTipoController.buscarTodos);

router.get("/:id",auth([Roles.ADMIN]), usuariosTipoController.buscarPorId); 

router.post('/',auth([Roles.ADMIN]), usuariosTipoController.crear);

router.patch("/:id",auth([Roles.ADMIN]), usuariosTipoController.actualizar)

export {router};