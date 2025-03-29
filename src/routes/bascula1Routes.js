const express = require('express');
const bascula1Controller = require('../controllers/bascula1Controller');

const router = express.Router();

router.get('/', bascula1Controller.getAllRegistros);
router.get('/:id', bascula1Controller.getRegistroById);
router.post('/', bascula1Controller.createRegistro);
router.put('/:idCamion', bascula1Controller.updateRegistro);
router.delete('/:id', bascula1Controller.deleteRegistro);
router.get('/tara/:idCamion', bascula1Controller.getTaraByIdCamion);
router.get('/registro', bascula1Controller.getRegistroByIdOrUsername);
router.get('/aperturaB1', bascula1Controller.RegistrarAperturarB1);


module.exports = router;