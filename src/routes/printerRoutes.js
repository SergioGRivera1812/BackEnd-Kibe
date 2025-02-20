const express = require('express');
const  printTicket  = require('../controllers/printerController');
const printTicket2 = require('../controllers/printer2Controller');

const router = express.Router();

router.post('/entrada', printTicket.printTicketEntrada);
router.post('/salida', printTicket.printTicketSalida);

router.post('/entrada2', printTicket2.printTicketEntrada2);
router.post('/salida2', printTicket2.printTicketSalida2);

module.exports = router;
