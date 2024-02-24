const express = require('express');
const router = express.Router();
const serviceController = require('../../controllers/managers/serviceController');
const authenticateToken = require('../../middleware/authenticateToken');
const role = require('../../middleware/role');

// Définition des routes
router.post('/service', serviceController.createService);
router.get('/service',authenticateToken,role(["manager","client"]), serviceController.getAllServices);
router.get('/service/:id',authenticateToken,role(["manager","client"]), serviceController.getServiceById);
router.put('/service/:id',authenticateToken,role(["manager"]), serviceController.updateService);
router.delete('/service/:id',authenticateToken,role(["manager"]), serviceController.deleteService);


module.exports = router;
