const PrintData = require('../models/printer.model');
const { SerialPort } = require('serialport');

const printerPort = new SerialPort({ path: 'COM5', baudRate: 9600 }, (err) => {
    if (err) {
        console.error(`Error al abrir el puerto: ${err.message}`);
        return;
    }
});

const printTicket = (data) => {
    const centerCommand = '\x1B\x61\x01'; // Centrar texto
    const resetAlignment = '\x1B\x61\x00'; // Volver a alineación izquierda

    const ticket = `
${centerCommand}************************\n
${centerCommand}**     REGISTRO PESADA    **\n
${centerCommand}************************\n
Fecha Entrada: ${data.fechaE}
Hora Entrada : ${data.horaE}
--------------------------------\n
Placas: ${data.placas}
Conductor: ${data.conductor}
Producto: ${data.producto}
Cliente: ${data.cliente}
Origen: ${data.origen}
Destino: ${data.destino}
Peso Tara: ${data.tara} kg
--------------------------------\n
Fecha Salida: ${data.fechaS}
Hora Salida : ${data.horaS}
Peso Bruto: ${data.bruto} kg
Peso Neto: ${data.neto} kg
--------------------------------\n
Operador: ${data.operador}
${resetAlignment}
\n\n\n\n\n`;

    printerPort2.write(ticket, (err) => {
        if (err) {
            console.error(`Error al enviar datos a la impresora: ${err.message}`);
            return;
        }
        console.log(`Datos enviados a la impresora:\n${ticket}`);
    });
};

const print = (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    const printData = new PrintData(data);
    printTicket(printData);

    res.json({ message: 'Impresión enviada correctamente' });
};


module.exports = { print };
