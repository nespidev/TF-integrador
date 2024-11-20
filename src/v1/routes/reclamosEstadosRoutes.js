import express from "express";
import ReclamosEstadosController from "../../controllers/reclamosEstadosController.js";
import { auth } from "../../middlewares/authMiddleware.js";
import { Roles } from "../../utiles/roles.js"

const router = express.Router();

const reclamosEstadosController = new ReclamosEstadosController();

router.get("/", auth([Roles.ADMIN]), reclamosEstadosController.buscarTodos);

router.get("/:id", auth([Roles.ADMIN]), reclamosEstadosController.buscarPorId); 

router.post('/', auth([Roles.ADMIN]), reclamosEstadosController.crear);

router.patch("/:id", auth([Roles.ADMIN]), reclamosEstadosController.actualizar)


export {router};