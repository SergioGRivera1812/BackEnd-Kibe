const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Ajusta el path si es necesario

const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(express.json());
app.use(cors());

// Rutas
app.use('/users', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
