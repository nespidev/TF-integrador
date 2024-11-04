import express from "express";
import ReclamosController from "../../controllers/reclamosController.js";
import passport from "passport";
import { auth } from "../../middlewares/authMiddleware.js";
import { Roles } from "../../utiles/roles.js"

const router = express.Router();

const reclamosController = new ReclamosController();

router.get("/", passport.authenticate("jwt", { session: false }), auth([Roles.ADMIN]), reclamosController.buscarTodos); // admin - ok

router.get("/buscar/:id?", passport.authenticate("jwt", { session: false }), auth([Roles.ADMIN]), reclamosController.buscarPorId); // admin -ok

router.patch("/:id?", passport.authenticate("jwt", { session: false }), auth([Roles.ADMIN]), reclamosController.modificar); // admin - ok

router.post('/atender/:id?', passport.authenticate("jwt", { session: false }), auth([Roles.EMPLEADO]), reclamosController.atender); // empleado -ok

router.post('/', passport.authenticate("jwt", { session: false }), auth([Roles.CLIENTE]), reclamosController.crear); // cliente - ok

router.get('/consultar/', passport.authenticate("jwt", { session: false }), auth([Roles.CLIENTE]), reclamosController.consultar) // cliente - ok

router.patch('/cancelar/:id?', passport.authenticate("jwt", { session: false }), auth([Roles.CLIENTE]), reclamosController.cancelar); // cliente - ok

router.get("/informe/:formato?", passport.authenticate("jwt", { session: false }), auth([Roles.ADMIN]), reclamosController.informe); // admin - ok

router.get("/estadistica", reclamosController.estadística); // admin


export { router };