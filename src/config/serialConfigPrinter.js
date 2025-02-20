const { SerialPort } = require('serialport');

const portName = 'COM5'; // Cambia según tu puerto
const portName2 = 'COM7'; // Cambia según tu puerto
const baudRate = 9600;

const printerPort = new SerialPort({ path: portName, baudRate: baudRate }, (err) => {
    if (err) {
        console.error(`Error al abrir el puerto: ${err.message}`);
        return;
    }
});

const printerPort2 = new SerialPort({ path: portName2, baudRate: baudRate }, (err) => {
    if (err) {
        console.error(`Error al abrir el puerto: ${err.message}`);
        return;
    }
});


module.exports = printerPort, printerPort2;
