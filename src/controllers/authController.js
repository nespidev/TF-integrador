import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

export default class AuthController{
        login = async (req, res) => {
            passport.authenticate('local', { session: false }, (err, usuario, info) => {
                if (err || !usuario) {
                    console.log("Error o usuario no encontrado:", info);
                    return res.status(400).json({
                        estado: "Falla",
                        mensaje: "Solicitud incorrecta."
                    });
                }
    
                req.login(usuario, { session: false }, (err) => {
                    if (err) {
                        return res.send(err);
                    }
    
                    const payload = { idUsuario: usuario.idUsuario,
                                      usuario:usuario.usuario,
                                      idUsuarioTipo:usuario.idUsuarioTipo
                                      
                    }; 
                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30h' });
                    return res.status(200).send({ estado: 'OK', token: token });
                });
            })(req, res);
        }
    
}   