import express from 'express';
import ReclamosTipoController from '../../controllers/reclamosTipoController.js';
import { auth } from "../../middlewares/authMiddleware.js";
import { Roles } from "../../utiles/roles.js";

const router = express.Router();

const reclamosTipoController = new ReclamosTipoController();

router.get('/', auth([Roles.ADMIN]), reclamosTipoController.buscarTodos);

router.get('/:id', auth([Roles.ADMIN]), reclamosTipoController.buscarPorId);

router.post('/', auth([Roles.ADMIN]), reclamosTipoController.crear);

router.patch('/:id', auth([Roles.ADMIN]), reclamosTipoController.actualizar);

export {router};