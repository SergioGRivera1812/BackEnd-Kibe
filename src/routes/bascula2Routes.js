const express = require('express');
const bascula2Controller = require('../controllers/bascula2Controller');

const router = express.Router();

router.get('/', bascula2Controller.getAllRegistros);
router.get('/:id', bascula2Controller.getRegistroById);
router.post('/', bascula2Controller.createRegistro);
router.put('/:idCamion', bascula2Controller.updateRegistro);
router.delete('/:id', bascula2Controller.deleteRegistro);
router.get('/tara/:idCamion', bascula2Controller.getTaraByIdCamion);
router.get('/registroCamion/:idCamion', bascula2Controller.getRegistroByIdCamion);
router.get('/aperturaB2', bascula2Controller.RegistrarAperturarB2);

module.exports = router;