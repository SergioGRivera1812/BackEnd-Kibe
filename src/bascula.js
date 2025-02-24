const { SerialPort, ReadlineParser } = require('serialport');
const http = require('http');
const socketIo = require('socket.io');
const os = require('os');

function iniciarBascula1() {
    const portName = 'COM1';
    const baudRate = 9600;
    const PORT = 4000;  // Puerto del servidor
    const HOST = '0.0.0.0'; // Permite conexiones desde cualquier IP

    // Crear servidor HTTP
    const server = http.createServer();

    // Inicializar Socket.IO con CORS habilitado
    const io = socketIo(server, {
        cors: {
            origin: "http://192.168.1.77:4200", // IP del frontend en la red
            methods: ["GET", "POST"]
        }
    });

    // Detectar IP local para mostrar la dirección correcta
    const localIP = getLocalIP();

    // Configurar el puerto serie
    const port = new SerialPort({ path: portName, baudRate: baudRate }, (err) => {
        if (err) {
            console.error(`❌ Error al abrir el puerto ${portName}: ${err.message}`);
            return;
        }
        console.log(`✅ Báscula en línea en puerto ${portName} con baudRate ${baudRate}`);
    });

    // Parser para leer datos del puerto serie
    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    // Evento cuando recibe datos de la báscula
    parser.on('data', (data) => {
        io.emit('serial-data', data);  // Enviar datos a los clientes vía WebSocket
        //console.log(`✅ Datos recibidos de la báscula: ${data}`);
    });

    // Manejo de errores del puerto serie
    port.on('error', (err) => {
        console.error(`❌ Error del puerto: ${err.message}`);
    });

    // Evento cuando el puerto se cierra
    port.on('close', () => {
        console.warn(`⚠️ Puerto ${portName} cerrado`);
    });

    // Iniciar servidor HTTP y WebSockets
    server.listen(PORT, HOST, () => {
        console.log(`🚀 Servidor corriendo en http://${localIP}:${PORT}`);
    });
}
function iniciarBascula2() {
    const portName = 'COM2';
    const baudRate = 9600;
    const PORT = 4002;  // Puerto del servidor
    const HOST = '0.0.0.0'; // Permite conexiones desde cualquier IP

    // Crear servidor HTTP
    const server = http.createServer();

    // Inicializar Socket.IO con CORS habilitado
    const io = socketIo(server, {
        cors: {
            origin: "http://192.168.1.77:4200", // IP del frontend en la red
            methods: ["GET", "POST"]
        }
    });

    // Detectar IP local para mostrar la dirección correcta
    const localIP = getLocalIP();

    // Configurar el puerto serie
    const port = new SerialPort({ path: portName, baudRate: baudRate }, (err) => {
        if (err) {
            console.error(`❌ Error al abrir el puerto ${portName}: ${err.message}`);
            return;
        }
        console.log(`✅ Báscula en línea en puerto ${portName} con baudRate ${baudRate}`);
    });

    // Parser para leer datos del puerto serie
    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    // Evento cuando recibe datos de la báscula
    parser.on('data', (data) => {
        io.emit('serial-data', data);  // Enviar datos a los clientes vía WebSocket
    });

    // Manejo de errores del puerto serie
    port.on('error', (err) => {
        console.error(`❌ Error del puerto: ${err.message}`);
    });

    // Evento cuando el puerto se cierra
    port.on('close', () => {
        console.warn(`⚠️ Puerto ${portName} cerrado`);
    });

    // Iniciar servidor HTTP y WebSockets
    server.listen(PORT, HOST, () => {
        console.log(`🚀 Servidor corriendo en http://${localIP}:${PORT}`);
    });
}


// Función para obtener la IP local en la red
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const key in interfaces) {
        for (const net of interfaces[key]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
}

module.exports = { iniciarBascula1, iniciarBascula2 };
