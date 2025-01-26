const pool = require('./db'); // Ajusta el path

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión exitosa a la base de datos');
        connection.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
})();
