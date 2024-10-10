import express from "express";
import NotificacionCorreo from "../../controllers/notificacionCorreo.js";

const router = express.Router();

const notificacioneCorreo = new NotificacionCorreo();

router.post("/", notificacioneCorreo.notificacionCorreo )

export {router};