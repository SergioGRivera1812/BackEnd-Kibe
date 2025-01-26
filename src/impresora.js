const { SerialPort } = require('serialport');

const portName = 'COM3'; // Cambia esto al puerto de tu impresora
const baudRate = 9600;   // Asegúrate de que coincida con la configuración de tu impresora

// Configuración del puerto serial
const port = new SerialPort({ path: portName, baudRate: baudRate }, (err) => {
    if (err) {
        console.error(`Error al abrir el puerto: ${err.message}`);
        return;
    }
    console.log(`Puerto ${portName} abierto con baudRate ${baudRate}`);
});

// Manejo de errores del puerto
port.on('error', (err) => {
    console.error(`Error del puerto: ${err.message}`);
});

// Evento cuando el puerto se cierra
port.on('close', () => {
    console.log(`Puerto ${portName} cerrado`);
});

// Función para enviar datos a la impresora
const print = (text) => {
    // Comando ESC/POS para centrar texto
    const centerCommand = '\x1B\x61\x01'; 
    const resetAlignment = '\x1B\x61\x00'; // Vuelve a la alineación por defecto (izquierda)
    const data = centerCommand + text + '\n' + resetAlignment;

    port.write(data, (err) => {
        if (err) {
            console.error(`Error al enviar datos a la impresora: ${err.message}`);
            return;
        }
        console.log(`Datos enviados a la impresora: ${text}`);
    });
};

// Ejemplo: imprimir un mensaje
setTimeout(() => {
    print('Esta es una prueba de impresion');
    print('Esta es una prueba de impresion');
    print('Esta es una prueba de impresion');
    print('Esta es una prueba de impresion');
    print('Esta es una prueba de impresion');
    print('Esta es una prueba de impresion');

}, 2000);
