import express from 'express';
import OficinasController from '../../controllers/oficinasController.js';

const router = express.Router();

const oficinasController = new OficinasController();

router.get('/',oficinasController.buscarTodos);

router.get('/:id',oficinasController.buscarPorId);

router.post('/',oficinasController.crear);

router.patch('/:id',oficinasController.actualizar);

export {router};