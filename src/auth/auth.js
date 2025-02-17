const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'secreto';

const verifyToken = (req, res, next) => {
    if (!req.headers) {
        console.error('Error: req.headers es undefined');
        return res.status(401).json({ error: 'Error en la autenticación: headers no encontrados' });
    }

    console.log('Headers en la petición:', req.headers);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.error('Error: No se proporcionó un token');
        return res.status(401).json({ error: 'No se proporcionó un token' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.error('Error: Token inválido');
        return res.status(401).json({ error: 'Token inválido' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        console.log('Token decodificado:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error.message);
        return res.status(401).json({ error: 'Token no válido' });
    }
};

module.exports = { verifyToken };
