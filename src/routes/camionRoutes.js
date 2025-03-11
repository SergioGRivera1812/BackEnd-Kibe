const express = require('express');
const CamionController = require('../controllers/camionController');

const router = express.Router();
router.get('/', CamionController.getAllBus);
router.get('/:id', CamionController.getBusById);
router.post('/', CamionController.createBus);
router.put('/:id', CamionController.updateBus);
router.delete('/:id', CamionController.deleteBus);
router.get('/tag/:tag', CamionController.getBusByTag);

module.exports = router;