const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const io = require('socket.io')(4001, {
  cors: { origin: '*' }
});

let port;
let a = '0', b = '0', c = '0', d = '0', e = '0', f = '0', g = '0';

// Inicializar el puerto serie
function iniciarPLC() {
  port = new SerialPort({ path: 'COM3', baudRate: 9600, parity: 'none', dataBits: 8, stopBits: 1 });
  const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

  // Manejo de datos recibidos
  parser.on('data', (data) => {
    console.log(`Datos recibidos del PLC: ${data}`);
    io.emit('serial-data', data);
  });

  // WebSocket para comunicación con los clientes
  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Evento para actualizar la cadena
    socket.on('update-chain', (values) => {
      actualizarValores(values);
      enviarCadena();
    });

    // Evento para detener el streaming
    socket.on('stop-streaming', () => {
      console.log('Deteniendo streaming');
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
}

// Función para actualizar los valores de la cadena
function actualizarValores(values) {
  if (values.a !== undefined) a = values.a.toString();
  if (values.b !== undefined) b = values.b.toString();
  if (values.c !== undefined) c = values.c.toString();
  if (values.d !== undefined) d = values.d.toString();
  if (values.e !== undefined) e = values.e.toString();
  if (values.f !== undefined) f = values.f.toString();
  if (values.g !== undefined) g = values.g.toString();
}

// Función para juntar las cadenas y enviarlas al PLC
function enviarCadena() {
  const cadena = a + b + c + d + e + f + g;
  console.log('Cadena a enviar al PLC:', cadena);
  
  // Enviar la cadena por el puerto serial
  port.write(cadena + '\r\n', (err) => {
    if (err) {
      console.error('Error al enviar al PLC:', err);
    } else {
      console.log('Cadena enviada correctamente al PLC');
    }
  });
}

module.exports = { iniciarPLC };
