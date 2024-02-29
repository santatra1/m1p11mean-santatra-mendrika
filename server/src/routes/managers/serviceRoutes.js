const express = require('express');
const router = express.Router();
const serviceController = require('../../controllers/managers/serviceController');
const authenticateToken = require('../../middleware/authenticateToken');
const role = require('../../middleware/role');

// Définition des routes
router.post('/service', serviceController.createService);
router.get('/service',authenticateToken,role(["manager","client", "employee"]), serviceController.getAllServices);
router.get('/service/:id',authenticateToken,role(["manager","client","employee"]), serviceController.getServiceById);
router.put('/service/:id',authenticateToken,role(["manager"]), serviceController.updateService);
router.delete('/service/:id',authenticateToken,role(["manager"]), serviceController.deleteService); 
router.get('/monthly-turnover', authenticateToken, role(['manager']), serviceController.getTurnOverPerMonths);
router.get('/daily-turnover', authenticateToken, role(['manager']), serviceController.getTurnOverForCurrentDay);

module.exports = router;
