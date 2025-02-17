const { verifyToken } = require("../auth/auth"); // Importamos correctamente

const authenticate = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extraemos solo el token

    console.log("Token recibido:", token); // Imprime el token para depuración

    if (!token) {
        return res.status(403).json({ error: "Token no proporcionado" });
    }

    try {
        const decoded = await verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ error: "Token inválido o expirado" });
        }

        req.user = decoded; // Guardamos la información del usuario
        next(); // Continuamos con la solicitud
    } catch (error) {
        console.log("Error al verificar el token:", error); // Muestra el error completo
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
};


module.exports = { authenticate };
