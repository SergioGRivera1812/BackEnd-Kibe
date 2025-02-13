const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { nombre, password ,rol } = req.body;

    try {
        
        const [rows] = await pool.query("SELECT * FROM users WHERE nombre = ?", [nombre]);

        if (rows.length > 0) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query("INSERT INTO users (nombre, password,rol) VALUES (?, ?,?)", [nombre, hashedPassword,rol]);

        res.json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error("Error al registrar el usuario", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

router.post("/login", async (req, res) => {
    const { nombre, password } = req.body;
    console.log("Datos recibidos en login:", req.body);

    try {
        if (!nombre || !password) {
            console.log("Faltan datos en la solicitud");
            return res.status(400).json({ message: "Faltan datos en la solicitud" });
        }

        const [rows] = await pool.query("SELECT * FROM users WHERE nombre = ?", [nombre]);
        console.log("Resultado de la consulta:", rows);

        if (rows.length === 0) {
            console.log("Usuario no encontrado");
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        const user = rows[0];
        console.log("Password recibido:", password);
        console.log("Password almacenado:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Contraseña incorrecta");
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const token = jwt.sign(
            { nombre: user.nombre, rol: user.rol },
            process.env.JWT_SECRET);

        res.json({ token });
    } catch (error) {
        console.error("Error al hacer login", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});




module.exports = router;
