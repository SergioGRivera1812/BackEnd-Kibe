const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost', // Sin puerto aquí
    port: 3306, // Especifica el puerto si es necesario
    user: 'root',
    password: 'root',
    database: 'jibe',
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = pool;