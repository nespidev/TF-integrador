import express from "express";
import ReclamosEstadosController from "../../controllers/reclamosEstadosController.js";

const router = express.Router();

const reclamosEstadosController = new ReclamosEstadosController();

router.get("/", reclamosEstadosController.buscarTodos);

router.get("/:id", reclamosEstadosController.buscarPorId); 

router.post('/', reclamosEstadosController.crear);

router.patch("/:id", reclamosEstadosController.actualizar)

export {router};