

export const auth = (allowedRoles) => {
    return (req, res, next) => {
        const idUsuarioTipo = Number(req.user.idUsuarioTipo); 
        
        if (allowedRoles.includes(idUsuarioTipo)) {
            return next();
        } else {
            return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para acceder a esta ruta.' });
        }
    };
};

