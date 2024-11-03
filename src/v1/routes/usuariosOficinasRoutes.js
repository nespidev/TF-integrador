import express from "express";
import UsuariosOficinasController from "../../controllers/usuariosOficinasController.js";

const router = express.Router();

const usuariosOficinasController = new UsuariosOficinasController();

router.get('/', usuariosOficinasController.buscarTodos);

router.get('/:id', usuariosOficinasController.buscarPorId);

router.post('/', usuariosOficinasController.crear);

router.patch('/:id', usuariosOficinasController.actualizar);

router.delete('/:id', usuariosOficinasController.eliminar);


export {router};