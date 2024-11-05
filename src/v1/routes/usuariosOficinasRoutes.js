import express from "express";
import UsuariosOficinasController from "../../controllers/usuariosOficinasController.js";
import { auth } from "../../middlewares/authMiddleware.js";
import { Roles } from "../../utiles/roles.js"

const router = express.Router();

const usuariosOficinasController = new UsuariosOficinasController();

router.get('/',auth([Roles.ADMIN]), usuariosOficinasController.buscarTodos);

router.get('/:id',auth([Roles.ADMIN]), usuariosOficinasController.buscarPorId);

router.post('/',auth([Roles.ADMIN]), usuariosOficinasController.crear);

router.patch('/:id',auth([Roles.ADMIN]), usuariosOficinasController.actualizar);

router.put('/:id',auth([Roles.ADMIN]), usuariosOficinasController.eliminar);


export {router};