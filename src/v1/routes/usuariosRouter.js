import express from "express";
import Usuarios from "../../controllers/usuariosControllers.js"
import { auth } from "../../middlewares/authMiddleware.js";
import { Roles } from "../../utiles/roles.js"
import multer from 'multer';
import { storage } from '../../config/multer.js';



const router = express.Router();
const usuariosController = new Usuarios();
const upload = multer( { storage } );

//trae la inf
router.get("/:id",auth([Roles.ADMIN]), usuariosController.buscarPorId); 
router.get("/",auth([Roles.ADMIN]), usuariosController.buscarTodos); 
//guarda la inf
router.post('/',auth([Roles.ADMIN]), usuariosController.crear);

//patch => actualiza 
router.patch('/:id', auth([Roles.ADMIN,Roles.EMPLEADO]), upload.single('imagen'), usuariosController.actualizar);

router.get("/:id/imagen", auth([Roles.ADMIN,Roles.EMPLEADO],Roles.Cliente),usuariosController.buscarImagen);

export {router};
