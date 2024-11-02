import express from "express";
import ReclamosController from "../../controllers/reclamosController.js";

const router = express.Router();

const reclamosController = new ReclamosController();

router.get("/", reclamosController.buscarTodos); // admin

router.get("/buscar/:id?", reclamosController.buscarPorId); // admin

router.patch("/:id?", reclamosController.modificar); // admin

router.post('/atender/:id?', reclamosController.atender); // empleado

router.post('/', reclamosController.crear); // cliente

router.get('/consultar/', reclamosController.consultar) // cliente

router.patch('/cancelar/:id', reclamosController.cancelar); // cliente

//router.get("/informe", reclamosController.informe);


export {router};