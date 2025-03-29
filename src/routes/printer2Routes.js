const express = require('express');
const printTicket2 = require('../controllers/printer2Controller');

const router = express.Router();
router.post('/print2', printTicket2.print2);


module.exports = router;
