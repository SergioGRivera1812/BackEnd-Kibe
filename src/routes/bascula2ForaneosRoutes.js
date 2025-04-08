const express = require('express');
const bascula2ForaneosController = require('../controllers/bascula2ForaneosController');

const router = express.Router();

router.get('/', bascula2ForaneosController.getAllRegistrosForaneos);
router.get('/:id', bascula2ForaneosController.getRegistroByIdForaneos);
router.post('/', bascula2ForaneosController.createRegistroForaneos);
router.put('/:idCamion', bascula2ForaneosController.updateRegistroForaneos);
router.delete('/:id', bascula2ForaneosController.deleteRegistroForaneos);
router.get('/tara/:idCamion', bascula2ForaneosController.getTaraByIdCamionForaneos);
router.get('/registro', bascula2ForaneosController.getRegistroByIdOrUsernameForaneos);
router.get('/registroCamion/:idCamion', bascula2ForaneosController.getRegistroByIdCamionForaneos);
router.get('/aperturaB1', bascula2ForaneosController.RegistrarAperturarB1);


module.exports = router;