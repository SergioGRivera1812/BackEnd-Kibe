const jwt = require('../auth/auth'); // Importamos las funciones de auth.js

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // El token viene en el header como "Authorization: Bearer <token>"
    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    const decoded = jwt.verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    req.user = decoded; // Almacenamos la información del usuario en el objeto `req`
    next();  // Continuamos con la solicitud
};

module.exports = { authenticate };
