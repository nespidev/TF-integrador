import express, { json } from "express"
import dotenv from "dotenv"
import { router as v1ReclamosEstadoRouter } from "./v1/routes/reclamosEstadosRoutes.js"
import { router as v1UsuariosTipoRouter } from "./v1/routes/usuariosTipoRoutes.js"

import { router as v1ReclamosTipoRouter } from "./v1/routes/reclamosTipoRoutes.js"
import { router as v1Reclamos } from "./v1/routes/reclamosRoutes.js"
import { router as v1OficinasRouter } from "./v1/routes/oficinasRoutes.js"
import { router as v1UsuariosRouter } from "./v1/routes/usuariosRouter.js"
import { router as v1UsuariosOficinasRouter} from "./v1/routes/usuariosOficinasRoutes.js"
import { router as v1AuthRouter } from "./v1/routes/authRoutes.js"

import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc';


//para pasport
import passport from "passport";
import session from "express-session";
//import passport, { session } from "passport"
import { estrategia, validacion } from "./config/passport.js"



dotenv.config();
const app = express();
app.use(express.json());

const puerto = process.env.PUERTO

app.listen(puerto, () => {
    console.log( `Server is running on port ${puerto}`);
});


// ======================= test =======================
app.get("/", (req, res) => {
    //res.status(200).send({ 'estado': true, 'mesage': "Hola Mundo!!" });
    res.json({ 'estado': true, 'mesage': "Hola Mundo!!" });
});
// ======================= fin test =======================

//======================= pasport =======================
//utiliza la estrategia and validacion
passport.use(estrategia)
passport.use(validacion)
app.use(passport.initialize())
//======================= Fin pasport =======================


// ======================= Envio de correo =======================
app.use(express.json()); 
// ======================= Fin envio de correo =======================


app.use('/api/v1/reclamos-estados', v1ReclamosEstadoRouter)
app.use('/api/v1/usuarios-tipo',passport.authenticate('jwt',{ session: false}), v1UsuariosTipoRouter)


app.use('/api/v1/reclamos-tipo',passport.authenticate('jwt',{ session: false}), v1ReclamosTipoRouter);


app.use('/api/v1/reclamos',passport.authenticate('jwt',{ session: false}), v1Reclamos);
app.use('/api/v1/oficinas',passport.authenticate('jwt',{ session: false}), v1OficinasRouter);
app.use('/api/v1/usuarios-oficinas',passport.authenticate('jwt',{ session: false}), v1UsuariosOficinasRouter)

// ======================= usuario =======================
app.use('/api/v1/usuarios',passport.authenticate('jwt',{ session: false}), v1UsuariosRouter)
// ======================= Fin usuario =======================


//======================= pasport =======================
app.use('/api/v1/auth', v1AuthRouter)
//======================= Fin pasport =======================