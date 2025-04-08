const express = require('express');
const bascula1ForaneosController = require('../controllers/bascula1ForaneosController');

const router = express.Router();

router.get('/', bascula1ForaneosController.getAllRegistrosForaneos);
router.get('/:id', bascula1ForaneosController.getRegistroByIdForaneos);
router.post('/', bascula1ForaneosController.createRegistroForaneos);
router.put('/:idCamion', bascula1ForaneosController.updateRegistroForaneos);
router.delete('/:id', bascula1ForaneosController.deleteRegistroForaneos);
router.get('/tara/:idCamion', bascula1ForaneosController.getTaraByIdCamionForaneos);
router.get('/registro', bascula1ForaneosController.getRegistroByIdOrUsernameForaneos);
router.get('/registroCamion/:idCamion', bascula1ForaneosController.getRegistroByIdCamionForaneos);
router.get('/aperturaB1', bascula1ForaneosController.RegistrarAperturarB1);


module.exports = router;