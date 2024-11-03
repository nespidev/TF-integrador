import express from "express";
import AuthController from "../../controllers/authController.js"
import passport from "passport";

const router = express.Router();
const authController = new AuthController();

router.post("/login", authController.login);

// Ruta protegida usando la estrategia 'jwt' de Passport
router.get("/ruta-protegida", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Acceso permitido a la ruta protegida', usuario: req.user });
});

export {router};