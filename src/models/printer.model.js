class PrintData {
    constructor({ fechaE, horaE, fechaS, horaS, idCamion, conductor, producto,placas, cliente, origen, destino, bruto, tara, neto, operador }) {
        this.fechaE = fechaE;
        this.horaE = horaE;
        this.fechaS = fechaS;
        this.horaS = horaS;
        this.idCamion = idCamion;
        this.conductor = conductor;
        this.producto = producto;
        this.placas = placas;
        this.cliente = cliente;
        this.origen = origen;
        this.destino = destino;
        this.bruto = bruto;
        this.tara = tara;
        this.neto = neto;
        this.operador = operador;
    }
}

module.exports = PrintData;
