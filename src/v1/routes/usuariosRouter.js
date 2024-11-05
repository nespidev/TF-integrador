import express from "express";
import Usuarios from "../../controllers/usuariosControllers.js"
import { auth } from "../../middlewares/authMiddleware.js";
import { Roles } from "../../utiles/roles.js"

const router = express.Router();
const usuariosTipoController = new Usuarios();
//trae la inf
router.get("/:id",auth([Roles.ADMIN]), usuariosTipoController.buscarPorId); 
router.get("/",auth([Roles.ADMIN]), usuariosTipoController.buscarTodos); 
//guarda la inf
router.post('/',auth([Roles.ADMIN]), usuariosTipoController.crear);

//patch => actualiza 
router.patch("/:id",auth([Roles.ADMIN]), usuariosTipoController.actualizar)

export {router};
