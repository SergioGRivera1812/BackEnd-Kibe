const PrintData = require('../models/printer.model');
const { SerialPort } = require('serialport');

const printerPort2 = new SerialPort({ path: 'COM6', baudRate: 9600 }, (err) => {
    if (err) {
        console.error(`Error al abrir el puerto: ${err.message}`);
        return;
    }
});


const printEntrada2 = (data) => {
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
const printSalida2 = (data) => {
   // const centerCommand = '\x1B\x61\x01'; // Centrar texto
    const resetAlignment = '\x1B\x61\x00'; // Volver a alineación izquierda

    const ticket = `
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
const printTicketEntrada2 = (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    const printData = new PrintData(data);
    printEntrada2(printData);

    res.json({ message: 'Impresión enviada correctamente' });
};

const printTicketSalida2 = (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    const printData = new PrintData(data);
    printSalida2(printData);

    res.json({ message: 'Impresión enviada correctamente' });
};

module.exports = { printTicketEntrada2,printTicketSalida2 };
