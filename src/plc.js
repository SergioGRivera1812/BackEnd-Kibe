const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const io = require('socket.io')(4001, {
    cors: { origin: '*' }
});

let port;
let keepStreaming = false;
let intervalId = null;

function iniciarPLC() {
    // Inicializar el puerto serie
    port = new SerialPort({ path: 'COM3', baudRate: 9600 });

    // Crear un parser para leer los datos del PLC
    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    // Manejo de datos recibidos
    parser.on('data', (data) => {
        console.log(`Datos recibidos del PLC: ${data}`);
        io.emit('serial-data', data);
    });

    // Manejo de errores en la comunicación serial
    port.on('error', (err) => {
        console.error('Error en el puerto serie:', err.message);
    });

    console.log("PLC iniciado y escuchando en COM3");

    // WebSocket para iniciar y detener el streaming
    io.on('connection', (socket) => {
        console.log('Cliente conectado');

        socket.on('start-streaming', (data) => {
            console.log('Iniciando streaming con:', data);
            startStreaming(data);
        });

        socket.on('stop-streaming', () => {
            console.log('Deteniendo streaming');
            stopStreaming();
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
            stopStreaming();
        });
    });
}

// Función para enviar datos al PLC periódicamente
function startStreaming(message) {
    if (keepStreaming) return;
    keepStreaming = true;

    intervalId = setInterval(() => {
        port.write(message + '\r\n', (err) => {
            if (err) console.error('Error al enviar stream:', err.message);
        });
        console.log('Enviando:', message);
    }, 200);
}

// Función para detener el streaming
function stopStreaming() {
    keepStreaming = false;
    if (intervalId) clearInterval(intervalId);
    console.log('Streaming detenido');
}

module.exports = { iniciarPLC };
