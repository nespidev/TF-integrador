import express from 'express';
import OficinasController from '../../controllers/oficinasController.js';
// import passport from "passport";
import { auth } from "../../middlewares/authMiddleware.js";
import { Roles } from "../../utiles/roles.js"

const router = express.Router();

const oficinasController = new OficinasController();

router.get('/',auth([Roles.ADMIN]),oficinasController.buscarTodos);

router.get('/:id',auth([Roles.ADMIN]),oficinasController.buscarPorId);

router.post('/',auth([Roles.ADMIN]),oficinasController.crear);

router.patch('/:id',auth([Roles.ADMIN]),oficinasController.actualizar);

export {router};