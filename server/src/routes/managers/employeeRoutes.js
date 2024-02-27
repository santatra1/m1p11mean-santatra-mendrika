const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/managers/employeeController');

const authenticateToken = require('../../middleware/authenticateToken');
const role = require('../../middleware/role');
router.get('/employee/service/:serviceId',authenticateToken, role(['client']), employeeController.byServiceId);
router.get('/employee',authenticateToken, role(['manager','client']), employeeController.all);
router.post('/employee/create',authenticateToken, role(['manager']), employeeController.create);
router.put('/employee/:id/update',authenticateToken, role(['manager', 'employee']), employeeController.update);
router.get('/employee/:id',authenticateToken, role(['manager','employee']), employeeController.getById);
router.get('/employee/user/:id',authenticateToken, role(['manager','employee']), employeeController.getEmployeeByUserId);

module.exports = router;
