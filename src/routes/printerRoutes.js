const express = require('express');
const  printTicket  = require('../controllers/printerController');

const router = express.Router();

router.post('/entrada', printTicket.printTicketEntrada);
router.post('/salida', printTicket.printTicketSalida);

module.exports = router;
