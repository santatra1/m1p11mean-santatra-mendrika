const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/managers/employeeController');

const authenticateToken = require('../../middleware/authenticateToken');
const role = require('../../middleware/role');

router.get('/employee',authenticateToken, role('manager'), employeeController.all);
router.post('/employee/create',authenticateToken, role('manager'), employeeController.create);
router.put('/employee/:id/update',authenticateToken, role('manager'), employeeController.update);
router.get('/employee/:id',authenticateToken, role('manager'), employeeController.getById);

module.exports = router;
