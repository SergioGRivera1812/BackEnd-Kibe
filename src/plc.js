const { SerialPort } = require('serialport');
const http = require('http');
const socketIo = require('socket.io');

function iniciarPLC() {
    const portName = 'COM1'; // Cambia según tu configuración
    const baudRate = 9600;
    let keepSending = true; // Control de envío en streaming

    // Configuración del servidor HTTP y socket.io
    const server = http.createServer();
    const io = socketIo(server, {
        cors: {
            origin: '*', // Ajusta en producción
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

    // Función para enviar 0000000 en stream
    function startStreaming() {
        if (!keepSending) return;
        const message = "0000000\r\n"; // Ajusta según requiera el PLC
        port.write(message, (err) => {
            if (err) console.error('Error al enviar stream:', err.message);
        });
        setTimeout(startStreaming, 200); // Envía cada segundo (ajústalo según necesidades)
    }

    // Iniciar el envío continuo
    startStreaming();

    // Comunicación con clientes WebSocket
    io.on('connection', (socket) => {
        console.log('Cliente conectado');

        // Recibir datos desde el cliente y enviarlos al PLC
        socket.on('send-data', (data) => {
            if (typeof data === 'string' && data.match(/^\d{7}$/)) {
                const message = `${data}\r\n`;
                port.write(message, (err) => {
                    if (err) {
                        console.error('Error al enviar datos:', err.message);
                        socket.emit('serial-error', err.message);
                    } else {
                        console.log(`Datos enviados al PLC: ${message}`);
                        socket.emit('serial-success', `Datos enviados: ${data}`);
                    }
                });
            } else {
                console.warn('Formato incorrecto:', data);
                socket.emit('serial-error', 'Formato incorrecto (se espera 4 dígitos numéricos)');
            }
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });

    // Manejo de errores del puerto serie
    port.on('error', (err) => {
        console.error(`Error del puerto: ${err.message}`);
    });

    // Evento cuando se cierra el puerto
    port.on('close', () => {
        console.log(`Puerto ${portName} cerrado`);
    });

    // Iniciar el servidor
    const PORT = 4001;
    server.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

module.exports = { iniciarPLC };
