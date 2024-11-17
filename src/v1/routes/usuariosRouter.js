import express from "express";
import Usuarios from "../../controllers/usuariosControllers.js"
import { auth } from "../../middlewares/authMiddleware.js";
import { Roles } from "../../utiles/roles.js"

const router = express.Router();
const usuariosController = new Usuarios();
//trae la inf
router.get("/:id",auth([Roles.ADMIN]), usuariosController.buscarPorId); 
router.get("/",auth([Roles.ADMIN]), usuariosController.buscarTodos); 
//guarda la inf
router.post('/',auth([Roles.ADMIN]), usuariosController.crear);

//patch => actualiza 
router.patch("/:id",auth([Roles.ADMIN,Roles.CLIENTE]), usuariosController.actualizar)

export {router};
