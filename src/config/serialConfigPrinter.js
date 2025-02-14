const { SerialPort } = require('serialport');

const portName = 'COM3'; // Cambia según tu puerto
const baudRate = 9600;

const printerPort = new SerialPort({ path: portName, baudRate: baudRate }, (err) => {
    if (err) {
        console.error(`Error al abrir el puerto: ${err.message}`);
        return;
    }
    console.log(`Puerto ${portName} abierto con baudRate ${baudRate}`);
});

module.exports = printerPort;
