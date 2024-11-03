import express from "express";
import AuthController from "../../controllers/authController.js"
import passport from "passport";

import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';

const router = express.Router();
const authController = new AuthController();


//router.post("/login" ,authController.login);
/*
// Ruta protegida usando la estrategia 'jwt' de Passport
router.get("/ruta-protegida", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Acceso permitido a la ruta protegida', usuario: req.user });
});*/


//valido los datos
router.post('/login',
    [
        check('correoElectronico', 'El correo electrónico es requerido!').not().isEmpty(),
        check('correoElectronico', 'Revisar el formato del correo electrónico!').isEmail(),
        check('contrasenia', 'La contrasenia es requerida!').not().isEmpty(),
        //funcion que lo va hacer
        validarCampos
    ],authController.login);

export {router};