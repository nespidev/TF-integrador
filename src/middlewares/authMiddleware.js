

export const auth = (allowedRoles) => {
    return (req, res, next) => {
        const idUsuarioTipo = Number(req.user.idUsuarioTipo); // `req.user` se llena con los datos del usuario por Passport
        
        if (allowedRoles.includes(idUsuarioTipo)) {
            return next(); // El usuario tiene permiso, sigue al controlador
        } else {
            return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para acceder a esta ruta.' });
        }
    };
};

