const express = require('express');
const  printTicket  = require('../controllers/printerController');

const router = express.Router();

 router.post('/print', printTicket.print);


module.exports = router;
