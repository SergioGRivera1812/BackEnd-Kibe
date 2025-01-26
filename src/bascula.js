const { SerialPort, ReadlineParser } = require('serialport');
const http = require('http');
const socketIo = require('socket.io');

const portName = 'COM1';
const baudRate = 9600;

// Configuración del servidor HTTP y socket.io
const server = http.createServer();
const io = socketIo(server, {
    cors: {
        origin: '*', // Cambia esto para restringir el acceso en producción
    },
});

// Configuración del puerto serie
const port = new SerialPort({ path: portName, baudRate: baudRate }, (err) => {
    if (err) {
        console.error(`Error al abrir el puerto: ${err.message}`);
        return;
    }
    console.log(`Puerto ${portName} abierto con baudRate ${baudRate}`);
});

// Parser para interpretar los datos recibidos
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// Evento al recibir datos desde la báscula
parser.on('data', (data) => {
    console.log(`Peso recibido: ${data}`);
    // Emite los datos al front-end a través de socket.io
    io.emit('serial-data', data);
});

// Manejo de errores del puerto
port.on('error', (err) => {
    console.error(`Error del puerto: ${err.message}`);
});

// Evento cuando el puerto se cierra
port.on('close', () => {
    console.log(`Puerto ${portName} cerrado`);
});

// Inicia el servidor HTTP y socket.io
const PORT = 3000; // Cambia el puerto si es necesario
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
