// Importar módulos necesarios
const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Ajusta la ruta si es necesario
const cors = require('cors');
const { iniciarBascula } = require('./bascula'); // Ajusta la ruta si es necesario

// Crear instancia de Express
const app = express();
const PORT = 3000;

// Middleware para analizar JSON
app.use(express.json());
app.use(cors());

// Rutas
app.use('/users', userRoutes);
iniciarBascula();
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
